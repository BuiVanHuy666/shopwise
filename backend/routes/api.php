<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ConstantController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\ResendVerificationController;
use App\Http\Controllers\Auth\VerificationController;
use Illuminate\Support\Facades\Route;

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('category.index');
    Route::get('/{slug}', [CategoryController::class, 'show'])->name('category.show');
    Route::get('/{category}/products', [ProductController::class, 'index']);
});

Route::prefix('products')->group(function () {
    Route::get('/{slug}', [ProductController::class, 'show']);
});

Route::get('/options', ConstantController::class);

Route::prefix('auth')->group(function () {
    Route::post('/register', RegisterController::class);
    Route::post('/login', LoginController::class);
    Route::post('/forgot-password', ForgotPasswordController::class);

    Route::middleware('auth:api')->group(function () {
        Route::get('/me', MeController::class);
        Route::post('/logout', LogoutController::class);
        Route::post('/email/resend', ResendVerificationController::class);
    });
});

Route::get('/email/verify/{id}/{hash}', VerificationController::class)
     ->middleware(['signed'])
     ->name('verification.verify');
