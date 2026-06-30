<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['product_color_id', 'image', 'sort_order'])]
class ProductColorImage extends Model
{
    public function color(): BelongsTo
    {
        return $this->belongsTo(ProductColor::class);
    }
}
