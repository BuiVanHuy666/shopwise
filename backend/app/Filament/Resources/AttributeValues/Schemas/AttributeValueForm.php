<?php

namespace App\Filament\Resources\AttributeValues\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AttributeValueForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('attribute_id')
                    ->required()
                    ->numeric(),
                TextInput::make('value')
                    ->required(),
            ]);
    }
}
