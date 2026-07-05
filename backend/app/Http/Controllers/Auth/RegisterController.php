<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\RegisterService;
use Illuminate\Support\Facades\Log;

class RegisterController
{
    public function store(RegisterRequest $request, RegisterService $registerService)
    {
        try {
            $result = $registerService($request->validated());

            return response()->json([
                'message' => 'Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.',
                'access_token' => $result['token'],
                'token_type' => 'bearer',
                'user' => $result['user'],
            ], 201);
        } catch (\Exception $e) {
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
