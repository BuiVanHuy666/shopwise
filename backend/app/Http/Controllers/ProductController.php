<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Resources\Product\ProductListResource;
use App\Http\Resources\Product\ProductDetailResource;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()
                           ->with(['colors'])
                           ->where('is_active', true)
                           ->latest()
                           ->paginate(12);

        return ProductListResource::collection($products);
    }

    public function show($slug)
    {
        $product = Product::query()
                          ->with([
                              'category',
                              'colors.images',
                              'variants.attributeValues'
                          ])
                          ->where('slug', $slug)
                          ->where('is_active', true)
                          ->firstOrFail();

        return new ProductDetailResource($product);
    }
}
