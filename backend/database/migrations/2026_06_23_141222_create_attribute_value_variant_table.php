<?php

use App\Models\Variant;
use App\Models\AttributeValue;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attribute_value_variant', function (Blueprint $table) {
            $table->foreignIdFor(Variant::class)->constrained();
            $table->foreignIdFor(AttributeValue::class)->constrained();
            $table->timestamps();

            $table->primary(['variant_id', 'attribute_value_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attribute_value_variant');
    }
};
