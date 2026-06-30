<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index'])->name('category.index');
    Route::get('/{slug}', [CategoryController::class, 'show'])->name('category.show');
});

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);      // List
    Route::get('/{slug}', [ProductController::class, 'show']); // Detail
});
