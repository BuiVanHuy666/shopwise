<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'email' => $this->email,
            'name' => $this->name,
            'is_verified' => $this->email_verified_at !== null,
        ];

        if ($request->query('include') === 'detail') {
            $data['phone_number'] = $this->phone_number;
            $data['joined_at'] = $this->created_at?->diffForHumans();
            $data['gender'] = $this->gender;
            $data['date_of_birth'] = $this->date_of_birth?->format('d/m/Y');
            $data['height'] = $this->height ? $this->height : null;
            $data['weight'] = $this->weight ? $this->weight : null;
        }

        return $data;
    }
}
