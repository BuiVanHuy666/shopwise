<?php

namespace App\Http\Resources;

use App\Http\Resources\Product\ProductListResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'sort_order' => $this->sort_order,
            'children' => CategoryResource::collection(
                $this->whenLoaded('children')
            ),
            'products' => ProductListResource::collection($this->whenLoaded('products')),
        ];
    }
}
