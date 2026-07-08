<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ResendVerificationController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $user = $request->user();

            if ($user->hasVerifiedEmail()) {
                return response()->json([
                    'message' => 'Tài khoản của bạn đã được xác thực trước đó.'
                ], 400);
            }

            $user->sendEmailVerificationNotification();

            return response()->json([
                'message' => 'Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư!'
            ]);

        } catch (Exception $e) {
            Log::channel('authentication')->error('Lỗi gửi lại email xác thực:', [
                'user_id' => $request->user()->id,
                'error_message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Hệ thống đang gặp sự cố, không thể gửi email lúc này.'
            ], 500);
        }
    }
}
