<?php

namespace App\Http\Requests;

use App\Rules\ValidAddressCode;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AddressRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $addressId = $this->route('address');

        return [
            'receiver_name' => ['required', 'string', 'max:100'],
            'receiver_phone_number' => [
                'required',
                'string',
                'max:20',
                'regex:/^(0|\+84)[3|5|7|8|9][0-9]{8}$/',
                Rule::unique('users', 'phone_number')->ignore($addressId)
            ],
            'province_code' => ['required', 'integer'],
            'ward_code' => [
                'required',
                'integer',
                new ValidAddressCode($this->input('province_code'))
            ],
            'address_detail' => ['required', 'string', 'max:255'],
            'is_default' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'receiver_name.required' => 'Vui lòng nhập tên người nhận.',
            'receiver_name.max' => 'Tên người nhận không được vượt quá 100 ký tự.',

            'receiver_phone_number.required' => 'Vui lòng nhập số điện thoại.',
            'receiver_phone_number.regex' => 'Số điện thoại không đúng định dạng (ví dụ: 09xxxx hoặc +84xxxx).',
            'receiver_phone_number.unique' => 'Số điện thoại này đã được đăng ký cho tài khoản khác.',
            'receiver_phone_number.max' => 'Số điện thoại không được vượt quá 20 ký tự.',

            'province_code.required' => 'Vui lòng chọn Tỉnh/Thành phố.',
            'province_code.integer' => 'Mã Tỉnh/Thành phố không hợp lệ.',

            'ward_code.required' => 'Vui lòng chọn Phường/Xã.',
            'ward_code.integer' => 'Mã Phường/Xã không hợp lệ.',

            'address_detail.required' => 'Vui lòng nhập địa chỉ cụ thể.',
            'address_detail.max' => 'Địa chỉ không được vượt quá 255 ký tự.',

            'is_default.boolean' => 'Giá trị mặc định không hợp lệ.',

            'ward_code.valid_address_code' => 'Phường/Xã bạn chọn không thuộc Tỉnh/Thành phố này. Vui lòng kiểm tra lại.',
        ];
    }
}
