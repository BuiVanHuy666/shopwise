<?php

namespace App\Services;

use App\Http\Resources\Category\CategoryDetailResource;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class CategoryService {
    public function getCategoryList(?string $include): array
    {
        $cacheKey = $include === 'children' ? 'categories_tree_all' : 'categories_top_only';

        $cacheTTL = 86400; //1 day

        return Cache::remember($cacheKey, $cacheTTL, function () use ($include) {
            $query = Category::whereNull('parent_id')->where('is_active', 1);

            if ($include === 'children') {
                $query->with('children');
            }

            $data = $query->get();

            $resourceArray = json_decode(CategoryDetailResource::collection($data)->toJson(), true);
            return $resourceArray ?? [];
        });
    }

    public function getCategoryWithProducts(string $slug): array
    {
        $cacheKey = 'category_with_products_' . $slug;

        return Cache::remember($cacheKey, 3600, function () use ($slug) {
            $category = Category::with('children')
                                ->active()
                                ->where('slug', $slug)
                                ->firstOrFail();

            $categoryIds = array_merge([$category->id], $category->getAllChildIds());

            $products = Product::whereIn('category_id', $categoryIds)->active()->get();

            $category->setRelation('products', $products);

            $resource = new CategoryResource($category);
            return json_decode($resource->toJson(), true);
        });
    }
}
