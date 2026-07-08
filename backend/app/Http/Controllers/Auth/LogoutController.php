<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogoutController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        try {
            auth()->logout();

            return response()->json([
                'message' => 'Đăng xuất thành công.'
            ]);

        } catch (Exception $e) {
            Log::channel('authentication')->error('Lỗi đăng xuất:', [
                'error_message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Hệ thống đang gặp sự cố, không thể đăng xuất lúc này.'
            ], 500);
        }
    }
}
