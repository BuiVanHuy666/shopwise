<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['product_id', 'color_name', 'color_hex', 'image', 'sort_order', 'product_color_id', 'color_group'])]
class ProductColor extends Model
{
    const array COLOR_GROUPS = [
        'black'  => 'Đen',
        'white'  => 'Trắng',
        'gray'   => 'Xám',
        'red'    => 'Đỏ',
        'green'  => 'Xanh lá',
        'blue'   => 'Xanh dương',
        'yellow' => 'Vàng',
        'brown'  => 'Nâu',
        'pink'   => 'Hồng',
        'purple' => 'Tím',
        'orange' => 'Cam',
        'beige'  => 'Be',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductColorImage::class);
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->images->first()?->image,
        );
    }
}
