<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\AuthUserResource;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ], [
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.string' => 'Mật khẩu phải là một chuỗi.',
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
        ]);

        try {
            if (!$token = auth('api')->attempt($credentials)) {
                return response()->json([
                    'message' => 'Email hoặc mật khẩu không chính xác.',
                    'errors' => [
                        'email' => ['Email hoặc mật khẩu không chính xác.']
                    ]
                ], 401);
            }

            $user = auth('api')->user();
            if (!$user->hasVerifiedEmail()) {
                auth('api')->logout();

                return response()->json([
                    'message' => 'Vui lòng kiểm tra hộp thư và xác thực email trước khi đăng nhập.',
                    'errors' => [
                        'email' => ['Email chưa được xác thực.']
                    ]
                ], 403);
            }

            return response()->json([
                'message' => 'Đăng nhập thành công!',
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60,
                'user' => new AuthUserResource($user),
            ]);

        } catch (Exception $e) {
            Log::channel('authentication')->error('Lỗi đăng nhập:', [
                'email' => $request->input('email'),
                'error_message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Hệ thống đang gặp sự cố, vui lòng thử lại sau.'
            ], 500);
        }
    }
}
