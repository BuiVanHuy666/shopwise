<?php

namespace App\Filament\Resources\Categories\Schemas;

use App\Models\Category;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class CategoryInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('parent.name')
                    ->label('Danh mục cha')
                    ->placeholder('-'),
                TextEntry::make('name')->label('Tên danh mục'),
                TextEntry::make('slug'),
                TextEntry::make('description')->label('Mô tả')
                    ->placeholder('-')
                    ->columnSpanFull(),
                IconEntry::make('is_active')->label('Trạng thái')
                    ->boolean(),
                TextEntry::make('sort_order')->label('Thứ tự')
                    ->numeric(),
                TextEntry::make('deleted_at')
                    ->dateTime()
                    ->visible(fn (Category $record): bool => $record->trashed()),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
