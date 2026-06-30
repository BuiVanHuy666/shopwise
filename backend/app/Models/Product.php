<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'category_id',
    'name',
    'slug',
    'thumbnail',
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

    const THUMBNAIL_DIR = 'products/thumbnails';
    const COLOR_IMAGE_DIR = 'products/colors';

    protected $casts = [
        'additional_info' => 'array',
        'is_active'       => 'boolean',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    // ══════════════════════════════════════════════════════════
    // URL helpers
    // ══════════════════════════════════════════════════════════
    public function getThumbnailUrl(): ?string
    {
        if (!$this->thumbnail) return null;

        return Storage::url(self::THUMBNAIL_DIR . '/' . $this->thumbnail);
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

    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }
}
