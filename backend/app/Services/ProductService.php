<?php

namespace App\Services;

use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Product\ProductCardResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class ProductService
{
    public function getProducts(Category $category, Request $request): array
    {
        $categoryIds = array_merge([$category->id], $category->getAllChildIds());

        $hasFilters = $request->hasAny(['color', 'size', 'min_price', 'max_price']);

        if (!$hasFilters) {
            $cacheKey = 'category_' . $category->id . '_page_' . $request->input('page', 1);

            return Cache::remember($cacheKey, 3600, function () use ($category, $categoryIds, $request) {
                return $this->buildProductPayload($category, $categoryIds, $request);
            });
        }

        return $this->buildProductPayload($category, $categoryIds, $request);
    }

    private function buildProductPayload(Category $category, array $categoryIds, Request $request): array
    {
        $colors = $request->input('color') ? (array) $request->input('color') : [];

        $size = $request->input('size');
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');

        $query = Product::whereIn('category_id', $categoryIds)->active();

        if (!empty($colors)) {
            $query->color($colors[0]);
        }

        if (!empty($size)) {
            $query->size($size);
        }

        if (!empty($minPrice) || !empty($maxPrice)) {
            $query->priceRange($minPrice, $maxPrice);
        }

        $allCategories = new Collection([$category]);

        $flattenCategories = function ($categories) use (&$flattenCategories, $allCategories) {
            foreach ($categories as $cat) {
                $allCategories->push($cat);

                if ($cat->relationLoaded('children')) {
                    $flattenCategories($cat->children);
                }
            }
        };

        if ($category->relationLoaded('children')) {
            $flattenCategories($category->children);
        }

        foreach ($allCategories as $cat) {
            $cat->loadCount(['products' => function ($q) {
                $q->active();
            }]);
        }

        $paginator = $query
            ->with(['colors' => function ($q) use ($colors) {
                $q->with(['images' => fn ($q) => $q->orderBy('sort_order')])->orderBy('sort_order');

                if (!empty($colors)) {
                    $placeholders = implode(',', array_fill(0, count($colors), '?'));
                    $q->orderByRaw("FIELD(color_group, {$placeholders}) DESC", $colors);
                }
            }])
            ->paginate(9);

        return ProductCardResource::collection($paginator)
                                  ->additional([
                                      'category'      => new CategoryResource($category),
                                      'active_colors' => $colors,
                                  ])
                                  ->response()
                                  ->getData(true);
    }
}
