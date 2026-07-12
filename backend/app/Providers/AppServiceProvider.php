<?php

namespace App\Providers;

use Carbon\Carbon;
use Filament\Auth\Notifications\ResetPassword;
use Filament\Auth\Notifications\VerifyEmail;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Notifications\Messages\MailMessage;
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

        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {
            return (new MailMessage)
                ->subject('Xác nhận đăng ký tài khoản Shopwise')
                ->greeting('Xin chào ' . ($notifiable->name ?? 'bạn') . '!')
                ->line('Cảm ơn bạn đã đăng ký tài khoản tại Shopwise.')
                ->line('Vui lòng nhấn vào nút bên dưới để hoàn tất việc xác nhận email.')
                ->action('Xác Nhận Email Ngay', $url)
                ->line('Nếu bạn không thực hiện việc đăng ký này, hãy phớt lờ email này nhé.')
                ->salutation('Thân mến, Đội ngũ Shopwise');
        });

        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . '/reset-password?token=' . $token . '&email=' . urlencode($notifiable->getEmailForPasswordReset());
        });

        ResetPassword::toMailUsing(function (object $notifiable, string $token) {
            $frontendUrl = config('app.frontend_url') . '/reset-password?token=' . $token . '&email=' . urlencode($notifiable->getEmailForPasswordReset());
            $expireMinutes = config('auth.passwords.' . config('auth.defaults.passwords') . '.expire');

            return (new MailMessage)
                ->subject('Yêu cầu đặt lại mật khẩu Shopwise')
                ->greeting('Xin chào ' . ($notifiable->name ?? 'bạn') . '!')
                ->line('Bạn nhận được email này vì chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.')
                ->action('Đặt Lại Mật Khẩu', $frontendUrl)
                ->line('Đường dẫn đặt lại mật khẩu này sẽ hết hạn sau ' . $expireMinutes . ' phút.')
                ->line('Nếu bạn không gửi yêu cầu này, vui lòng bỏ qua email và không cần làm gì thêm.')
                ->salutation('Thân mến, Đội ngũ Shopwise');
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
