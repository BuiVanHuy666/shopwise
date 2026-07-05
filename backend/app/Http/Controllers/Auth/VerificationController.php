<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(Request $request, $id, $hash)
    {
        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return response()->json(['message' => 'Đường dẫn xác thực không hợp lệ.'], 403);
        }

        // Nếu đã xác thực rồi thì bỏ qua
        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email này đã được xác thực trước đó.'], 200);
        }

        // Đánh dấu xác thực thành công
        $user->markEmailAsVerified();

        return response()->json(['message' => 'Xác thực email thành công!'], 200);
    }
}
