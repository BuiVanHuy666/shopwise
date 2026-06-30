<?php

namespace Database\Seeders;

use App\Models\Attribute;
use App\Models\AttributeValue;
use Illuminate\Database\Seeder;

class AttributeSeeder extends Seeder
{
    public function run(): void
    {
        $size = Attribute::create([
            'name' => 'Kích thước'
        ]);

        AttributeValue::create([
            'value' => 'XS',
            'attribute_id' => $size->id
        ]);

        AttributeValue::create([
            'value' => 'S',
            'attribute_id' => $size->id
        ]);

        AttributeValue::create([
            'value' => 'M',
            'attribute_id' => $size->id
        ]);

        AttributeValue::create([
            'value' => 'L',
            'attribute_id' => $size->id
        ]);

        AttributeValue::create([
            'value' => 'XL',
            'attribute_id' => $size->id
        ]);

        AttributeValue::create([
            'value' => '2XL',
            'attribute_id' => $size->id
        ]);
    }
}
