<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LocationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    protected LocationService $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $provinceCodes = $request->query('province_code');

        if (empty($provinceCodes)) {
            return response()->json([
                'message' => 'Lấy danh sách Tỉnh/Thành phố thành công',
                'data' => $this->locationService->getProvinces()
            ]);
        }

        $codesArray = explode(',', $provinceCodes);
        $wards = $this->locationService->getWards($codesArray);

        if (empty($wards)) {
            return response()->json([
                'message' => 'Không tìm thấy dữ liệu cho (các) mã Tỉnh/Thành phố này.'
            ], 404);
        }

        return response()->json([
            'message' => 'Lấy danh sách Phường/Xã thành công',
            'data' => $wards
        ]);
    }
}
