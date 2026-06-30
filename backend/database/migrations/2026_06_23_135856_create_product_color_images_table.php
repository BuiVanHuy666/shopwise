<?php

use App\Models\ProductColor;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_color_images', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(ProductColor::class)->constrained();

            $table->string('image');
            $table->tinyInteger('sort_order');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_color_images');
    }
};
