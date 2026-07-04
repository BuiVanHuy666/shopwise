<?php

namespace App\Services;

use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Product\ProductCardResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductService
{
    public function getProducts(Category $category, Request $request): array
    {
        $categoryIds = array_merge([$category->id], $category->getAllChildIds());

        if (empty($request->input('filter'))) {
            $cacheKey = 'category_' . $category->id . '_page_' . $request->input('page', 1);

            return Cache::remember($cacheKey, 3600, function () use ($category, $categoryIds, $request) {
                return $this->buildProductPayload($category, $categoryIds, $request);
            });
        }

        return $this->buildProductPayload($category, $categoryIds, $request);
    }

    private function buildProductPayload(Category $category, array $categoryIds, Request $request): array
    {
        $paginator = Product::whereIn('category_id', $categoryIds)
                            ->active()
                            ->with('colors')
                            ->paginate(9);

        return ProductCardResource::collection($paginator)
                                  ->additional(['category' => new CategoryResource($category)])
                                  ->response()
                                  ->getData(true);
    }
}
