<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Http\Resources\User\UserAddressResource;
use App\Models\UserAddress;
use Illuminate\Http\JsonResponse;

class UserAddressController extends Controller
{
    public function index()
    {
        $addresses = auth()->user()->addresses()->orderByDesc('is_default')->latest()->get();

        return UserAddressResource::collection($addresses);
    }

    public function store(AddressRequest $request): JsonResponse
    {
        $user = auth()->user();

        if ($user->addresses()->count() >= 10) {
            return response()->json([
                'status' => 'error',
                'message' => 'Bạn chỉ được phép tạo tối đa 10 địa chỉ giao hàng.'
            ], 403);
        }

        $data = $request->validated();

        if ($request->is_default) {
            $user->addresses()->update(['is_default' => false]);
        }
        elseif ($user->addresses()->count() === 0) {
            $data['is_default'] = true;
        }

        $address = $user->addresses()->create($data);

        return response()->json([
            'message' => 'Thêm địa chỉ thành công',
            'data' => new UserAddressResource($address)
        ], 201);
    }

    public function show(UserAddress $address)
    {
        $this->authorizeAddress($address);

        return new UserAddressResource($address);
    }

    public function update(AddressRequest $request, UserAddress $address): JsonResponse
    {
        $this->authorizeAddress($address);
        $data = $request->validated();

        if ($request->is_default && !$address->is_default) {
            auth()->user()->addresses()
                  ->where('id', '!=', $address->id)
                  ->update(['is_default' => false]);
        }

        $address->update($data);

        return response()->json([
            'message' => 'Cập nhật địa chỉ thành công',
            'data' => new UserAddressResource($address)
        ]);
    }

    public function destroy(UserAddress $address): JsonResponse
    {
        $this->authorizeAddress($address);

        $address->delete();

        if ($address->is_default) {
            $newDefault = auth()->user()->addresses()->latest()->first();
            if ($newDefault) {
                $newDefault->update(['is_default' => true]);
            }
        }

        return response()->json(['message' => 'Xóa địa chỉ thành công']);
    }

    private function authorizeAddress(UserAddress $address): void
    {
        if ($address->user_id !== auth()->id()) {
            abort(403, 'Bạn không có quyền truy cập địa chỉ này.');
        }
    }
}
