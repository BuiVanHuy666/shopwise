<?php

namespace App\Services\Admin;

use App\Models\Product;
use App\Services\ImageService;
use Illuminate\Support\Facades\DB;

class ProductService
{
    protected ImageService $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function create(array $data): Product
    {
        return DB::transaction(function () use ($data) {
            $product = Product::create([
                'name'            => $data['name'],
                'slug'            => $data['slug'],
                'category_id'     => $data['category_id'],
                'headline'        => $data['headline'],
                'description'     => $data['description'] ?? null,
                'price'           => $data['price'],
                'sale_price'      => $data['sale_price'] ?? null,
                'is_active'       => $data['is_active'] ?? true,
                'additional_info' => $data['additional_info'] ?? [],
            ]);

            $tempIdToDbId = [];

            foreach ($data['colors'] ?? [] as $colorData) {
                $color = $product->colors()->create([
                    'color_name' => $colorData['color_name'],
                    'color_hex'  => $colorData['color_hex'],
                ]);

                if (!empty($colorData['_temp_id'])) {
                    $tempIdToDbId[$colorData['_temp_id']] = $color->id;
                }

                foreach (array_values($colorData['images'] ?? []) as $idx => $imagePath) {
                    if (empty($imagePath)) continue;

                    $imgName = $this->imageService->processAndMove((string) $imagePath, Product::COLOR_IMAGE_DIR);

                    $color->images()->create([
                        'image'            => $imgName,
                        'product_color_id' => $color->id,
                        'sort_order'       => $idx,
                    ]);
                }
            }

            foreach ($data['variants'] ?? [] as $variantData) {
                $tempId  = $variantData['_color_temp_id'] ?? null;
                $colorId = $tempId ? ($tempIdToDbId[$tempId] ?? null) : null;

                $variant = $product->variants()->create([
                    'product_color_id' => $colorId,
                    'sku'              => $variantData['sku'],
                    'price'            => $variantData['price'],
                    'sale_price'       => $variantData['sale_price'] ?? null,
                    'stock'            => $variantData['stock'] ?? 0,
                ]);

                $attrValueIds = $variantData['attr_value_ids'] ?? [];
                if (!empty($attrValueIds)) {
                    $variant->attributeValues()->sync($attrValueIds);
                }
            }

            return $product;
        });
    }

    public function update(Product $product, array $data): Product
    {
        return DB::transaction(function () use ($product, $data) {
            $product->update([
                'name'            => $data['name'],
                'slug'            => $data['slug'],
                'category_id'     => $data['category_id'],
                'headline'        => $data['headline'],
                'description'     => $data['description'] ?? null,
                'price'           => $data['price'],
                'sale_price'      => $data['sale_price'] ?? null,
                'is_active'       => $data['is_active'] ?? true,
                'additional_info' => $data['additional_info'] ?? [],
            ]);

            $existingColors = $product->colors()->with('images')->get()->keyBy('id');
            $submittedColors = collect($data['colors'] ?? []);
            $keptColorIds = [];
            $tempIdToDbId = [];

            foreach ($submittedColors as $colorData) {
                $existingId = $colorData['id'] ?? null;

                if ($existingId && $existingColors->has($existingId)) {
                    $color = $existingColors[$existingId];
                    $color->update([
                        'color_name' => $colorData['color_name'],
                        'color_hex'  => $colorData['color_hex'],
                    ]);
                } else {
                    $color = $product->colors()->create([
                        'color_name' => $colorData['color_name'],
                        'color_hex'  => $colorData['color_hex'],
                    ]);
                }

                $keptColorIds[] = $color->id;

                if (!empty($colorData['_temp_id'])) {
                    $tempIdToDbId[$colorData['_temp_id']] = $color->id;
                }

                $existingImages  = $color->images()->get()->keyBy('id');
                $submittedImgIds = [];

                foreach (array_values($colorData['images'] ?? []) as $idx => $imagePath) {
                    if (empty($imagePath)) continue;

                    $filename = $this->imageService->processAndMove((string) $imagePath, Product::COLOR_IMAGE_DIR);

                    $existingImg = $existingImages->first(fn($img) => $img->image === $filename);

                    if ($existingImg) {
                        $existingImg->update(['sort_order' => $idx]);
                        $submittedImgIds[] = $existingImg->id;
                    } else {
                        $newImg = $color->images()->create([
                            'image'            => $filename,
                            'product_color_id' => $color->id,
                            'sort_order'       => $idx,
                        ]);
                        $submittedImgIds[] = $newImg->id;
                    }
                }

                $color->images()->whereNotIn('id', $submittedImgIds)->delete();
            }

            $product->colors()
                    ->whereNotIn('id', $keptColorIds)
                    ->each(function ($color) {
                        $color->images()->delete();
                        $color->delete();
                    });

            $existingVariants = $product->variants()->with('attributeValues')->get();
            $oldVariantMap    = [];

            foreach ($existingVariants as $v) {
                $attrIds  = $v->attributeValues->pluck('id')->sort()->values()->implode(',');
                $colorKey = $v->product_color_id ?? 0;
                $key      = "{$colorKey}|{$attrIds}";
                $oldVariantMap[$key] = $v->id;
            }

            $submittedVariants = collect($data['variants'] ?? []);
            $keptVariantIds    = [];

            foreach ($submittedVariants as $variantData) {
                $tempId  = $variantData['_color_temp_id'] ?? null;
                $colorId = $tempId ? ($tempIdToDbId[$tempId] ?? null) : null;

                if (!$colorId && $tempId) {
                    $colorId = $product
                        ->colors()
                        ->whereIn('id', $keptColorIds)
                        ->where('color_name', $variantData['_color_name'] ?? '')
                        ->value('id');
                }

                $attrValueIds    = $variantData['attr_value_ids'] ?? [];
                $attrKey         = collect($attrValueIds)->sort()->values()->implode(',');
                $colorKeyLookup  = $colorId ?? 0;
                $key             = "{$colorKeyLookup}|{$attrKey}";

                if (isset($oldVariantMap[$key])) {
                    $variant = $existingVariants->find($oldVariantMap[$key]);
                    $variant->update([
                        'sku'        => $variantData['sku'],
                        'price'      => $variantData['price'],
                        'sale_price' => $variantData['sale_price'] ?? null,
                        'stock'      => $variantData['stock'] ?? 0,
                    ]);
                } else {
                    $variant = $product->variants()->create([
                        'product_color_id' => $colorId,
                        'sku'              => $variantData['sku'],
                        'price'            => $variantData['price'],
                        'sale_price'       => $variantData['sale_price'] ?? null,
                        'stock'            => $variantData['stock'] ?? 0,
                    ]);
                }

                if (!empty($attrValueIds)) {
                    $variant->attributeValues()->sync($attrValueIds);
                }

                $keptVariantIds[] = $variant->id;
            }

            $product->variants()
                    ->whereNotIn('id', $keptVariantIds)
                    ->each(function ($v) {
                        $v->attributeValues()->detach();
                        $v->delete();
                    });

            return $product->fresh();
        });
    }
}
