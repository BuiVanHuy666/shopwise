<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->user()->id;

        return [
            'name' => ['required', 'string', 'max:255'],
            'phone_number' => ['nullable', 'string', 'max:20', Rule::unique('users', 'phone_number')->ignore($userId)],
            'gender' => ['nullable', 'integer', 'in:0,1,2'],
            'date_of_birth' => ['nullable', 'date'],
            'height' => ['nullable', 'integer', 'min:100', 'max:250'],
            'weight' => ['nullable', 'numeric', 'min:30', 'max:150'],
        ];
    }

    public function messages(): array
    {
        return [
            'phone_number.unique' => 'Số điện thoại này đã được tài khoản khác sử dụng.',
        ];
    }
}
