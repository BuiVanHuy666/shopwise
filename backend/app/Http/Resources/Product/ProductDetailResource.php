<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ProductDetailResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $sizes = [];
        foreach ($this->variants as $variant) {
            foreach ($variant->attributeValues as $val) {
                $sizes[$val->id] = [
                    'id' => $val->id,
                    'value' => $val->value
                ];
            }
        }
        ksort($sizes);

        $mainDiscount = 0;
        if ($this->sale_price && $this->price > 0 && $this->sale_price < $this->price) {
            $mainDiscount = round((($this->price - $this->sale_price) / $this->price) * 100);
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'headline' => $this->headline,
            'price' => number_format((float)$this->price) . 'đ',
            'sale_price' => $this->sale_price ? number_format((float)$this->sale_price) . 'đ' : null,
            'discount_percent' => $mainDiscount,
            'description' => $this->description,
            'additional_info' => $this->additional_info,

            'category' => [
                'id' => $this->category->id ?? null,
                'name' => $this->category->name ?? null,
                'slug' => $this->category->slug ?? null,
            ],

            'color_options' => $this->colors->map(function ($color) {
                return [
                    'id' => $color->id,
                    'name' => $color->color_name,
                    'hex' => $color->color_hex,
                    'images' => $color->images->map(function ($img) {
                        return $img->image;
                    })->toArray(),
                ];
            }),

            'size_options' => array_values($sizes),

            'variants' => $this->variants->map(function ($variant) {
                $vDiscount = 0;
                if ($variant->sale_price && $variant->price > 0 && $variant->sale_price < $variant->price) {
                    $vDiscount = round((($variant->price - $variant->sale_price) / $variant->price) * 100);
                }

                return [
                    'id' => $variant->id,
                    'color_id' => $variant->product_color_id,
                    'sku' => $variant->sku,
                    'price' => (float)$variant->price,
                    'sale_price' => $variant->sale_price ? (float)$variant->sale_price : null,
                    'discount_percent' => $vDiscount,
                    'stock' => $variant->stock,
                    'attribute_value_ids' => $variant->attributeValues->pluck('id')->toArray(),
                ];
            }),
        ];
    }
}
