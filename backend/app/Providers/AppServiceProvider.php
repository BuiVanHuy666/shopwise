<?php

namespace App\Providers;

use Carbon\Carbon;
use Filament\Auth\Notifications\ResetPassword;
use Filament\Auth\Notifications\VerifyEmail;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        VerifyEmail::createUrlUsing(function ($notifiable) {
            $verifyApiUrl = URL::temporarySignedRoute(
                'verification.verify',
                Carbon::now()->addMinutes(config('auth.verification.expire', 60)),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );

            return config('app.frontend_url') . '/verify-email?verify_url=' . urlencode($verifyApiUrl);
        });

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . '/reset-password?token=' . $token . '&email=' . $notifiable->getEmailForPasswordReset();
        });

        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->input('email');
            $ip = $request->ip();

            return [
                Limit::perMinute(7)->by($ip)
                     ->response(function (Request $request, array $headers) {
                         return response()->json([
                             'message' => 'Phát hiện lưu lượng truy cập bất thường từ IP của bạn. Vui lòng thử lại sau.'
                         ], 429, $headers);
                     }),

                Limit::perMinute(5)->by($email . $ip)
                     ->response(function (Request $request, array $headers) {
                         return response()->json([
                             'message' => 'Bạn đã đăng nhập sai quá nhiều lần. Vui lòng thử lại sau 1 phút.'
                         ], 429, $headers);
                     }),
            ];
        });
        RateLimiter::for('auth-spam', function (Request $request) {
            return Limit::perHour(3)->by($request->ip())
                        ->response(function (Request $request, array $headers) {
                            return response()->json([
                                'message' => 'Bạn đã thao tác quá nhiều lần. Vui lòng thử lại sau 1 giờ.'
                            ], 429, $headers);
                        });
        });
    }
}
