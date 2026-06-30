<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use App\Models\Product;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\Model;

class EditProduct extends EditRecord
{
    protected static string $resource = ProductResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $record = $this->record;

        if (!empty($record->thumbnail)) {
            $data['thumbnail'] = Product::THUMBNAIL_DIR . '/' . $record->thumbnail;
        }

        $colors = $record->colors()->with('images')->get();
        $data['colors'] = $colors->map(function ($color) {
            return [
                'id'         => $color->id,
                '_temp_id'   => (string) $color->id,
                'color_name' => $color->color_name,
                'color_hex'  => $color->color_hex,
                'images'     => $color->images->map(fn($img) => Product::COLOR_IMAGE_DIR . '/' . $img->image)->toArray(),
            ];
        })->toArray();

        $colorsMap = $colors->keyBy('id');
        $variants = $record->variants()->with('attributeValues')->get();

        $data['variants'] = $variants->map(function ($variant) use ($colorsMap) {
            $attrIds = $variant->attributeValues->pluck('id')->map(fn($id) => (string) $id)->toArray();
            $color   = $colorsMap->get($variant->product_color_id);

            return [
                'id'             => $variant->id,
                '_color_temp_id' => $color ? (string) $color->id : null,
                '_color_name'    => $color ? $color->color_name : null,
                '_color_hex'     => $color ? $color->color_hex : null,
                '_attr_key'      => $attrIds,
                'attr_value_ids' => $attrIds,
                'sku'            => $variant->sku,
                'price'          => $variant->price,
                'sale_price'     => $variant->sale_price,
                'stock'          => $variant->stock,
            ];
        })->toArray();

        $attributeGroups = [];
        foreach ($variants as $variant) {
            foreach ($variant->attributeValues as $attrValue) {
                $attrId = $attrValue->attribute_id;
                $attributeGroups[$attrId][$attrValue->id] = (string) $attrValue->id;
            }
        }

        $data['product_attributes'] = collect($attributeGroups)->map(function($values, $attrId) {
            return ['attribute_id' => $attrId, 'values' => array_values($values)];
        })->values()->toArray();

        return $data;
    }
    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (!empty($data['thumbnail'])) {
            $data['thumbnail'] = is_array($data['thumbnail'])
                ? reset($data['thumbnail'])
                : $data['thumbnail'];
        }

        if (isset($data['colors']) && is_array($data['colors'])) {
            foreach ($data['colors'] as $key => $color) {
                if (isset($color['images']) && is_array($color['images'])) {
                    $data['colors'][$key]['images'] = array_values($color['images']);
                }
            }
        }

        return $data;
    }

    protected function handleRecordUpdate(Model|Product $record, array $data): Model
    {
        return app(ProductService::class)->update($record, $data);
    }
}
