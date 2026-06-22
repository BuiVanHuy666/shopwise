<?php

namespace App\services;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
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

            $resourceArray = json_decode(CategoryResource::collection($data)->toJson(), true);
            return $resourceArray ?? [];
        });
    }
}
