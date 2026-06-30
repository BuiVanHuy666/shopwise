<?php

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductColor;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('variants', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(ProductColor::class)->constrained();
            $table->foreignIdFor(Product::class)->constrained();

            $table->string('sku', 15)->unique();
            $table->decimal('price', 12);
            $table->decimal('sale_price', 12)->nullable();
            $table->unsignedInteger('stock');

            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('variants');
    }
};
