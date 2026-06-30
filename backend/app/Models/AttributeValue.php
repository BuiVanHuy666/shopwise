<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['attribute_id', 'value'])]
class AttributeValue extends Model
{
    public function variants(): BelongsToMany
    {
        return $this->belongsToMany(
            Variant::class,
            'attribute_value_variant',
            'attribute_value_id',
            'variant_id'
        );
    }
}
