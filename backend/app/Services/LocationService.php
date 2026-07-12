<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class LocationService
{
    private function getRawData(): array
    {
        $path = database_path('datas/vietnamzone.json');

        if (!file_exists($path)) {
            return [];
        }

        return json_decode(file_get_contents($path), true);
    }

    public function getProvinces(): array
    {
        return Cache::remember('api.locations.provinces', 60 * 60 * 24, function () {
            $data = collect($this->getRawData());

            return $data->map(function ($province) {
                return [
                    'code' => $province['code'],
                    'name' => $province['name'],
                    'division_type' => $province['division_type'],
                    'codename' => $province['codename'],
                    'phone_code' => $province['phone_code'] ?? null,
                ];
            })->values()->all();
        });
    }

    public function getWards(array $provinceCodes): array
    {
        if (empty($provinceCodes)) {
            return [];
        }

        sort($provinceCodes);
        $cacheKey = "api.locations.wards." . implode('_', $provinceCodes);

        return Cache::remember($cacheKey, 60 * 60 * 24, function () use ($provinceCodes) {
            $data = collect($this->getRawData());
            $intCodes = array_map('intval', $provinceCodes);

            $filteredProvinces = $data->whereIn('code', $intCodes);

            return $filteredProvinces->flatMap(function ($province) {
                return $province['wards'] ?? [];
            })->values()->all();
        });
    }

    /**
     * Tiện ích: Lấy tên (label) của một Tỉnh/Thành phố
     */
    public function getProvinceLabel(int $provinceCode): ?string
    {
        $provinces = $this->getProvinces();
        return collect($provinces)->firstWhere('code', $provinceCode)['name'] ?? null;
    }

    /**
     * Tiện ích: Lấy tên (label) của một Phường/Xã
     */
    public function getWardLabel(int $provinceCode, int $wardCode): ?string
    {
        $wards = $this->getWards([$provinceCode]);
        return collect($wards)->firstWhere('code', $wardCode)['name'] ?? null;
    }
}
