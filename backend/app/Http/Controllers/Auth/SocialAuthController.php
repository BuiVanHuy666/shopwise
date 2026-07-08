<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Socialite;
use League\Csv\Exception;

class SocialAuthController
{
    protected array $allowedProviders = ['google', 'facebook'];

    public function redirect($provider)
    {
        if (!in_array($provider, $this->allowedProviders)) {
            return response()->json(['message' => 'Nền tảng không được hỗ trợ.'], 400);
        }

        $url = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();

        return response()->json([
            'url' => $url
        ]);
    }

    public function callback($provider)
    {
        if (!in_array($provider, $this->allowedProviders)) {
            return redirect()->to(config('app.frontend_url') . '/login?error=invalid_provider');
        }

        try {
            $socialUser = Socialite::driver($provider)->stateless()->user();

            $user = User::where('email', $socialUser->getEmail())->first();

            if (!$user) {
                $user = User::create([
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'password' => bcrypt(Str::random(24)),
                    'email_verified_at' => now(),
                    'provider_name' => $provider,
                    'provider_id' => $socialUser->getId(),
                ]);
            } else {
                $user->update([
                    'provider_name' => $provider,
                    'provider_id' => $socialUser->getId(),
                    'email_verified_at' => $user->email_verified_at ?? now(),
                ]);
            }

            auth('api')->factory()->setTTL(20160);

            $token = auth('api')->login($user);

            $frontendCallbackUrl = config('app.frontend_url') . '/auth/callback?token=' . $token;

            return redirect()->to($frontendCallbackUrl);

        } catch (Exception $e) {
            Log::channel('authentication')->error("Lỗi đăng nhập {$provider}:", [
                'error_message' => $e->getMessage(),
            ]);

            return redirect()->to(config('app.frontend_url') . '/login?error=social_auth_failed');
        }
    }
}
