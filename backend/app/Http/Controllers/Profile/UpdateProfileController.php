<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProfileRequest;
use Illuminate\Http\JsonResponse;

class UpdateProfileController extends Controller
{
    public function __invoke(UpdateProfileRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        $request->user()->update($validatedData);

        return response()->json([
            'message' => 'Cập nhật thông tin thành công.'
        ]);
    }
}
