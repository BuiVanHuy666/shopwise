<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidAddressCode implements ValidationRule
{
    protected $provinceCode;

    public function __construct($provinceCode)
    {
        $this->provinceCode = $provinceCode;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $path = database_path('datas/vietnamzone.json');

        if (!file_exists($path)) {
            $fail('Hệ thống chưa cấu hình dữ liệu hành chính.');
            return;
        }

        $data = json_decode(file_get_contents($path), true);

        $province = collect($data)->firstWhere('code', $this->provinceCode);

        if (!$province) {
            $fail('Mã tỉnh/thành phố (province_code) không tồn tại.');
            return;
        }

        $wardExists = collect($province['wards'])->contains('code', $value);

        if (!$wardExists) {
            $fail('Mã phường/xã (ward_code) không hợp lệ hoặc không thuộc tỉnh/thành phố đã chọn.');
        }
    }
}
