<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\ProductColor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ConstantController extends Controller
{
    public function __invoke(Request $request)
    {
        $validated = $request->validate([
            'include' => 'required|string',
        ]);

        $includes = array_map('trim', explode(',', $validated['include']));

        $allowed = ['colors', 'sizes'];
        if (array_diff($includes, $allowed)) {
            return response()->json([
                'message' => 'Invalid parameter.'
            ], 422);
        }

        $data = [];

        if (in_array('colors', $includes)) {
            $data['colors'] = collect(ProductColor::COLOR_GROUPS)
                    ->map(function ($label, $value) {
                        return [
                            'value' => $value,
                            'label' => $label
                        ];
                    })
                    ->values()
                    ->all();
        }

        if (in_array('sizes', $includes)) {
            $data['sizes'] = Cache::remember('master_data_sizes', 86400, function () {
                return json_decode(Attribute::with('values')
                                ->where('name', 'Kích thước')
                                ->first()
                                ?->values()
                                ->pluck('value') ?? [], true);
            });
        }

        return response()->json([
            'data' => $data
        ]);
    }
}
