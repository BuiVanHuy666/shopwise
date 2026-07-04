<?php

namespace App\Http\Resources\Category;

use App\Http\Resources\Product\ProductCardResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'sort_order' => $this->sort_order,
            'children' => CategoryDetailResource::collection(
                $this->whenLoaded('children')
            ),
            'products' => ProductCardResource::collection($this->whenLoaded('products')),
        ];
    }
}
