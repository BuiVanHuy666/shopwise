<?php
namespace App\Http\Requests;


use App\Rules\ValidAddressCode;
use Illuminate\Foundation\Http\FormRequest;

class AddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'receiver_name' => ['required', 'string', 'max:255'],
            'receiver_phone_number' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^[0-9\+\-\(\)\s]+$/',
                Rule::unique('users', 'phone_number')->ignore($userId)
            ],
            'province_code' => ['required', 'integer'],
            'ward_code' => [
                'required',
                'integer',
                new ValidAddressCode($this->input('province_code'))
            ],
            'address_detail' => ['required', 'string', 'max:255'],
            'is_default' => ['sometimes', 'boolean'],
        ];
    }
}
