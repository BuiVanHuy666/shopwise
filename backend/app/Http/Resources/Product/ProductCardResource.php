<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ProductCardResource extends JsonResource
{
    public function toArray($request): array
    {
        $activeColors = $request->input('colors', []);

        $thumbnailColor = !empty($activeColors)
            ? $this->colors->firstWhere('color_group', $activeColors[0]) ?? $this->colors->first()
            : $this->colors->first();

        return [
            'id'        => $this->id,
            'name'      => $this->name,
            'slug'      => $this->slug,
            'price'     => $this->price,
            'sale_price'=> $this->sale_price,
            'thumbnail' => $thumbnailColor?->images->first()->image,
            'colors'    => $this->colors->map(fn ($c) => [
                'color_group' => $c->color_group,
                'color_hex'   => $c->color_hex,
                'image_url'   => $c->image_url,
            ]),
            'rating_stars' => random_int(30, 50) / 10,
            'reviews_count' => random_int(10, 1000)
        ];
    }
}
