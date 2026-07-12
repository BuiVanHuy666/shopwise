<?php

namespace App\Http\Resources\Category;

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
            'products_count' => $this->whenCounted('products', function () {
                return $this->products_count;
            }, function () {
                return $this->products()->active()->count();
            }),
            'children' => CategoryResource::collection($this->whenLoaded('children')),
        ];
    }
}
