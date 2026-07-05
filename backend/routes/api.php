<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ConstantController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Auth\RegisterController;
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
    Route::post('/register', [RegisterController::class, 'store']);
});

Route::get('/email/verify/{id}/{hash}', [VerificationController::class, 'verify'])
     ->middleware(['signed'])
     ->name('verification.verify');
