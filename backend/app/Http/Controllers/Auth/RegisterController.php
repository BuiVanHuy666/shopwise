<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\User\AuthUserResource;
use App\Services\Auth\RegisterService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class RegisterController
{
    public function __invoke(RegisterRequest $request, RegisterService $registerService): JsonResponse
    {
        try {
            $result = $registerService($request->validated());

            return response()->json([
                'message' => 'Đăng ký thành công! Chào mừng bạn.',
                'access_token' => $result['token'],
                'token_type' => 'bearer',
                'user' => new AuthUserResource($result['user']),
            ], 201);
        } catch (Exception $e) {
            Log::channel('authentication')->error('Lỗi đăng ký tài khoản:', [
                'email' => $request->input('email'),
                'error_message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);

            return response()->json([
                'message' => 'Hệ thống đang gặp sự cố, vui lòng thử lại sau.',
            ], 500);
        }
    }
}
