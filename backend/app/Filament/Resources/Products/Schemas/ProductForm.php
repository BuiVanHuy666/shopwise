<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Models\Attribute;
use App\Models\AttributeValue;
use App\Models\Product;
use App\Models\ProductColor;
use Filament\Actions\Action;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\KeyValue;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Schemas\Components\Actions;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Section::make('Thông tin cơ bản')
                       ->icon('heroicon-o-document-text')
                       ->columns(2)
                       ->columnSpanFull()
                       ->schema([
                           TextInput::make('name')
                                    ->label('Tên sản phẩm')
                                    ->required()
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn($state, callable $set) => $set('slug', Str::slug($state))),

                           TextInput::make('slug')
                                    ->label('Đường dẫn (Slug)')
                                    ->required()
                                    ->unique(table: 'products', column: 'slug', ignoreRecord: true),

                           Select::make('category_id')
                                 ->label('Danh mục')
                                 ->relationship('category', 'name', fn($query) => $query->whereDoesntHave('children'))
                                 ->required()
                                 ->searchable()
                                 ->preload(),

                           FileUpload::make('thumbnail')
                                     ->disk('public')
                                     ->label('Ảnh đại diện')
                                     ->image()
                                     ->directory(Product::THUMBNAIL_DIR)
                                     ->storeFileNamesIn('thumbnail')
                                     ->required(),

                           TextInput::make('headline')
                                    ->label('Tiêu đề ngắn')
                                    ->required()
                                    ->columnSpanFull(),

                           RichEditor::make('description')
                                     ->label('Mô tả chi tiết')
                                     ->toolbarButtons([
                                         ['bold', 'italic', 'underline', 'strike', 'link'],
                                         ['h2', 'h3'],
                                         ['alignStart', 'alignCenter', 'alignEnd'],
                                         ['bulletList', 'orderedList', 'blockquote'],
                                         ['undo', 'redo'],
                                     ])
                                     ->fileAttachmentsDirectory('products/attachments')
                                     ->columnSpanFull(),

                           TextInput::make('price')
                                    ->label('Giá gốc')
                                    ->required()
                                    ->numeric()
                                    ->prefix('₫'),

                           TextInput::make('sale_price')
                                    ->label('Giá khuyến mãi')
                                    ->numeric()
                                    ->prefix('₫'),

                           Toggle::make('is_active')
                                 ->label('Hiển thị sản phẩm')
                                 ->default(true)
                                 ->columnSpanFull(),
                       ]),

                Section::make('Thông số kỹ thuật')
                       ->icon('heroicon-o-list-bullet')
                       ->columnSpanFull()
                       ->schema([
                           KeyValue::make('additional_info')
                                   ->hiddenLabel()
                                   ->keyLabel('Thuộc tính')
                                   ->valueLabel('Giá trị')
                                   ->keyPlaceholder('VD: Chất liệu, Kiểu dáng...')
                                   ->valuePlaceholder('VD: Cotton, Slim fit...')
                                   ->addActionLabel('Thêm thông số')
                                   ->reorderable()
                                   ->default([
                                       'Công nghệ' => '',
                                       'Chất liệu' => '',
                                       'Kiểu dáng' => '',
                                       'Phù hợp' => '',
                                       'Tính năng' => '',
                                       'Bảo quản' => '',
                                   ]),
                       ]),

                Section::make('Màu sắc & Hình ảnh')
                       ->icon('heroicon-o-swatch')
                       ->columnSpanFull()
                       ->schema([
                           Repeater::make('colors')
                                   ->hiddenLabel()
                                   ->schema([
                                       Hidden::make('_temp_id')
                                             ->default(fn() => (string)Str::uuid()),

                                       TextInput::make('color_name')
                                                ->label('Tên màu (Hiển thị cho khách)')
                                                ->placeholder('VD: Xanh rêu, Trắng sữa...')
                                                ->required(),
                                       Select::make('color_group')
                                             ->label('Nhóm màu (Dùng để lọc)')
                                             ->options(ProductColor::COLOR_GROUPS)
                                             ->searchable()
                                             ->required(),

                                       ColorPicker::make('color_hex')
                                                  ->label('Mã màu (Mã HEX)')
                                                  ->required(),

                                       FileUpload::make('images')
                                                 ->disk('public')
                                                 ->label('Hình ảnh (bôi đen nhiều file để up cùng lúc)')
                                                 ->image()
                                                 ->multiple()
                                                 ->reorderable()
                                                 ->panelLayout('grid')
                                                 ->appendFiles()
                                                 ->directory(Product::COLOR_IMAGE_DIR)
                                                 ->storeFileNamesIn('images')
                                                 ->columnSpanFull()
                                                 ->required(),
                                   ])
                                   ->columns(3)
                                   ->addActionLabel('Thêm màu sắc')
                                   ->defaultItems(0)
                                   ->collapsible()
                                   ->itemLabel(fn(array $state): ?string => $state['color_name'] ?: null),
                       ]),

                Section::make('Phân loại thuộc tính')
                       ->icon('heroicon-o-tag')
                       ->description('Chọn các thuộc tính dùng để tạo biến thể (Size, Material...)')
                       ->columnSpanFull()
                       ->schema([
                           Repeater::make('product_attributes')
                                   ->hiddenLabel()
                                   ->schema([
                                       Select::make('attribute_id')
                                             ->label('Loại thuộc tính')
                                             ->options(Attribute::pluck('name', 'id'))
                                             ->reactive()
                                             ->required()
                                             ->createOptionForm([
                                                 TextInput::make('name')->label('Tên thuộc tính mới')->required(),
                                             ])
                                             ->createOptionUsing(fn(array $data) => Attribute::create($data)->id),

                                       Select::make('values')
                                             ->label('Giá trị')
                                             ->multiple()
                                             ->options(
                                                 fn(callable $get) => $get('attribute_id')
                                                     ? AttributeValue::where(
                                                         'attribute_id',
                                                         $get('attribute_id')
                                                     )->pluck('value', 'id')
                                                     : []
                                             )
                                             ->required()
                                             ->createOptionForm([
                                                 TextInput::make('value')->label(
                                                     'Giá trị mới (VD: XL, Cotton...)'
                                                 )->required(),
                                             ])
                                             ->createOptionUsing(function (array $data, callable $get) {
                                                 if (!$get('attribute_id')) {
                                                     return null;
                                                 }
                                                 return AttributeValue::create([
                                                     'attribute_id' => $get('attribute_id'),
                                                     'value' => $data['value'],
                                                 ])->id;
                                             }),
                                   ])
                                   ->columns(2)
                                   ->addActionLabel('Thêm phân loại')
                                   ->defaultItems(0),
                       ]),

                Section::make('Biến thể sản phẩm')
                       ->icon('heroicon-o-squares-2x2')
                       ->description('Bấm "Generate" để tạo biến thể từ màu sắc × thuộc tính đã chọn.')
                       ->columnSpanFull()
                       ->schema([
                           Actions::make([
                               Action::make('generate_variants')
                                     ->label('⚙ Generate biến thể')
                                     ->color('primary')
                                     ->requiresConfirmation()
                                     ->modalHeading('Xác nhận generate biến thể')
                                     ->modalDescription(
                                         'Tạo biến thể từ màu sắc × thuộc tính. '
                                         .'Combination cũ còn hợp lệ sẽ được GIỮ NGUYÊN SKU/giá. '
                                         .'Combination không còn tồn tại sẽ bị xóa khỏi danh sách.'
                                     )
                                     ->action(function ($livewire) {
                                         $data = $livewire->data;

                                         $colors = collect($data['colors'] ?? []);
                                         $formAttributes = collect($data['product_attributes'] ?? [])
                                             ->filter(fn($a) => !empty($a['values']));

                                         $hasColors = $colors->isNotEmpty();
                                         $hasAttributes = $formAttributes->isNotEmpty();

                                         if (!$hasColors && !$hasAttributes) {
                                             Notification::make()
                                                         ->title('Vui lòng thêm Màu sắc hoặc Thuộc tính trước!')
                                                         ->warning()
                                                         ->send();
                                             return;
                                         }

                                         $attributeArrays = $formAttributes
                                             ->map(fn($a) => array_values($a['values']))
                                             ->values()
                                             ->toArray();

                                         $combinations = [[]];
                                         foreach ($attributeArrays as $values) {
                                             $tmp = [];
                                             foreach ($combinations as $existing) {
                                                 foreach ($values as $value) {
                                                     $tmp[] = array_merge($existing, [(string)$value]);
                                                 }
                                             }
                                             $combinations = $tmp;
                                         }

                                         $oldVariantMap = [];
                                         foreach (collect($data['variants'] ?? []) as $v) {
                                             $attrKey = collect($v['_attr_key'] ?? [])->sort()->values()->implode(',');
                                             $colorKey = $v['_color_temp_id'] ?? '__no_color__';
                                             $key = "{$colorKey}|{$attrKey}";
                                             $oldVariantMap[$key] = [
                                                 'sku' => $v['sku'] ?? strtoupper(Str::random(8)),
                                                 'price' => $v['price'] ?? null,
                                                 'sale_price' => $v['sale_price'] ?? null,
                                                 'stock' => $v['stock'] ?? 0,
                                             ];
                                         }

                                         $basePrice = $data['price'] ?? null;
                                         $baseSalePrice = $data['sale_price'] ?? null;
                                         $newVariants = [];

                                         $buildVariant = function (
                                             ?string $colorTempId,
                                             ?string $colorName,
                                             ?string $colorHex,
                                             array $combination,
                                         ) use (&$oldVariantMap, &$newVariants, $basePrice, $baseSalePrice): void {
                                             $attrKey = collect($combination)->sort()->values()->implode(',');
                                             $colorKey = $colorTempId ?? '__no_color__';
                                             $key = "{$colorKey}|{$attrKey}";
                                             $old = $oldVariantMap[$key] ?? null;

                                             $newVariants[] = [
                                                 '_color_temp_id' => $colorTempId,
                                                 '_color_name' => $colorName,
                                                 '_color_hex' => $colorHex,
                                                 '_attr_key' => $combination,
                                                 'attr_value_ids' => $combination,
                                                 'sku' => $old['sku'] ?? strtoupper(Str::random(8)),
                                                 'price' => $old['price'] ?? $basePrice,
                                                 'sale_price' => $old['sale_price'] ?? $baseSalePrice,
                                                 'stock' => $old['stock'] ?? 0,
                                             ];
                                         };

                                         if ($hasColors && $hasAttributes) {
                                             foreach ($colors as $color) {
                                                 foreach ($combinations as $combination) {
                                                     $buildVariant(
                                                         $color['_temp_id'],
                                                         $color['color_name'],
                                                         $color['color_hex'],
                                                         $combination
                                                     );
                                                 }
                                             }
                                         } elseif ($hasColors) {
                                             foreach ($colors as $color) {
                                                 $buildVariant(
                                                     $color['_temp_id'],
                                                     $color['color_name'],
                                                     $color['color_hex'],
                                                     []
                                                 );
                                             }
                                         } else {
                                             foreach ($combinations as $combination) {
                                                 $buildVariant(null, null, null, $combination);
                                             }
                                         }

                                         $livewire->data['variants'] = $newVariants;

                                         Notification::make()
                                                     ->title(
                                                         'Đã generate '.count($newVariants).' biến thể (chưa lưu DB).'
                                                     )
                                                     ->success()
                                                     ->send();
                                     }),
                           ])->columnSpanFull(),

                           Repeater::make('variants')
                                   ->hiddenLabel()
                                   ->schema([
                                       Grid::make(8)->schema([
                                           Placeholder::make('_color_display')
                                                      ->label('Màu')
                                                      ->content(
                                                          function (callable $get): \Illuminate\Support\HtmlString {
                                                              $hex = $get('_color_hex');
                                                              $name = $get('_color_name');
                                                              if (!$hex && !$name) {
                                                                  return new \Illuminate\Support\HtmlString(
                                                                      '<span class="text-gray-400 text-xs italic">Mặc định</span>'
                                                                  );
                                                              }
                                                              return new \Illuminate\Support\HtmlString(
                                                                  "<div style='display:flex;align-items:center;gap:6px;padding:4px 0'>
                                                    <span style='width:16px;height:16px;border-radius:50%;background:".e(
                                                                      $hex
                                                                  ).";border:1px solid #d1d5db;flex-shrink:0;display:inline-block'></span>
                                                    <span style='font-size:13px;font-weight:500'>".e($name)."</span>
                                                </div>"
                                                              );
                                                          }
                                                      )
                                                      ->columnSpan(1),

                                           Placeholder::make('_attr_display')
                                                      ->label('Thuộc tính')
                                                      ->content(function (callable $get): string {
                                                          $ids = $get('attr_value_ids') ?? [];
                                                          if (empty($ids)) {
                                                              return '—';
                                                          }
                                                          return AttributeValue::whereIn('id', $ids)->pluck(
                                                              'value'
                                                          )->join(', ');
                                                      })
                                                      ->columnSpan(2),

                                           Hidden::make('_color_temp_id'),
                                           Hidden::make('_color_name'),
                                           Hidden::make('_color_hex'),
                                           Hidden::make('_attr_key'),
                                           Hidden::make('attr_value_ids'),

                                           TextInput::make('sku')
                                                    ->label('SKU')
                                                    ->required()
                                                    ->columnSpan(2),

                                           TextInput::make('price')
                                                    ->label('Giá')
                                                    ->numeric()
                                                    ->required()
                                                    ->prefix('₫')
                                                    ->columnSpan(1),

                                           TextInput::make('sale_price')
                                                    ->label('Giá KM')
                                                    ->numeric()
                                                    ->prefix('₫')
                                                    ->columnSpan(1),

                                           TextInput::make('stock')
                                                    ->label('Tồn kho')
                                                    ->numeric()
                                                    ->required()
                                                    ->default(0)
                                                    ->columnSpan(1),
                                       ]),
                                   ])
                                   ->columns(1)
                                   ->defaultItems(0)
                                   ->collapsible(),
                       ]),
            ]);
    }
}
