<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class ProductListResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $discountPercent = 0;
        if ($this->sale_price && $this->price > 0 && $this->sale_price < $this->price) {
            $discountPercent = round((($this->price - $this->sale_price) / $this->price) * 100);
        }

        return [
            'id'               => $this->id,
            'name'             => $this->name,
            'slug'             => $this->slug,
            'thumbnail'        => $this->thumbnail,

            'price'            => (float) $this->price,
            'sale_price'       => $this->sale_price ? (float) $this->sale_price : null,
            'discount_percent' => $discountPercent,

            'short_description'=> $this->headline ?? Str::limit(strip_tags($this->description), 100),

            'colors'           => $this->colors->pluck('color_hex')->unique()->values(),

            'rating_stars'     => 4.5,
            'reviews_count'    => rand(10, 50),
        ];
    }
}
