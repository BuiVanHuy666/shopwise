<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['receiver_name', 'receiver_phone_number', 'province_code', 'ward_code', 'address_detail', 'is_default'])]
class UserAddress extends Model
{
    //
}
