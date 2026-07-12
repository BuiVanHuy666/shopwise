<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\Builder;
use Illuminate\Support\Facades\Cache;

#[Fillable(['parent_id', 'name', 'slug', 'description', 'is_active', 'sort_order'])]
class Category extends Model
{
    use SoftDeletes;

    protected static function booted(): void
    {
        static::saved(function ($category) {
            self::clearCategoryCache();
        });

        static::deleted(function ($category) {
            self::clearCategoryCache();
        });

        static::restored(function ($category) {
            self::clearCategoryCache();
        });
    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function resolveRouteBinding($value, $field = null): ?Model
    {
        $category = parent::resolveRouteBinding($value, $field);

        if ($category && !$category->is_active) {
            throw new ModelNotFoundException();
        }

        return $category;
    }

    private static function clearCategoryCache(): void
    {
        Cache::forget('categories_tree_all');
        Cache::forget('categories_top_only');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id')
                    ->where('is_active', 1)
                    ->with('children');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', 1);
    }

    public function getAllChildIds(): array
    {
        $ids = [];

        foreach ($this->children as $child) {
            $ids[] = $child->id;
            $ids = array_merge($ids, $child->getAllChildIds());
        }

        return $ids;
    }
}
