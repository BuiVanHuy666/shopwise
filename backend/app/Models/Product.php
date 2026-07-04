<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Query\Builder as QueryBuilder;

#[Fillable([
    'category_id',
    'name',
    'slug',
    'headline',
    'description',
    'additional_info',
    'price',
    'sale_price',
    'is_active',
])]
class Product extends Model
{
    use SoftDeletes;

    const string COLOR_IMAGE_DIR = 'products/colors';

    protected $casts = [
        'additional_info' => 'array',
        'is_active'       => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    // ══════════════════════════════════════════════════════════
    // Relations
    // ══════════════════════════════════════════════════════════
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }

    public function colors(): HasMany
    {
        return $this->hasMany(ProductColor::class);
    }

    public function scopeActive(Builder $query): Builder|QueryBuilder
    {
        return $query->where('is_active', 1);
    }

    public function scopeName(Builder $query, string $name): Builder|QueryBuilder
    {
        return $query->where('name', 'LIKE', '%' . $name . '%');
    }

    public function scopePriceRange(Builder $query, ?float $from = null, ?float $to = null): Builder|QueryBuilder
    {
        if ($from && !$to) {
            return $query->where('price', '>=', $from);
        }
        if (!$from && $to) {
            return $query->where('price', '<=', $to);
        }

        return $query->whereBetween('price', [$from, $to]);
    }

    public function scopeColor(Builder $query, string $color): Builder|QueryBuilder
    {
        return $query->whereHas('colors', function (Builder $query) use ($color) {
            $query->where('color_group', $color);
        });
    }

    public function scopeSize(Builder $query, string $size): Builder|QueryBuilder
    {
        return $query->whereHas('variants.attributeValues', function (Builder $query) use ($size) {
            $query->where('value', $size);
        });
    }
}
