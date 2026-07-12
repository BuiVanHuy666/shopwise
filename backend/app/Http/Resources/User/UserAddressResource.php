<?php

namespace App\Http\Resources\User;

use App\Services\LocationService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserAddressResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $locationService = app(LocationService::class);

        return [
            'id' => $this->id,
            'receiver_name' => $this->receiver_name,
            'receiver_phone_number' => $this->receiver_phone_number,
            'province' => [
                'code' => $this->province_code,
                'label' => $locationService->getProvinceLabel($this->province_code),
            ],
            'ward' => [
                'code' => $this->ward_code,
                'label' => $locationService->getWardLabel($this->province_code, $this->ward_code),
            ],
            'address_detail' => $this->address_detail,
            'is_default' => $this->is_default,
        ];
    }
}
