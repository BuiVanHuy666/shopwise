<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['product_id', 'color_name', 'color_hex', 'image', 'sort_order', 'product_color_id'])]
class ProductColor extends Model
{

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function images()
    {
        return $this->hasMany(ProductColorImage::class);
    }
}
