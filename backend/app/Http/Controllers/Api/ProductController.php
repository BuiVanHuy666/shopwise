<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductDetailResource;
use App\Models\Product;
use App\Services\ProductService;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductService $productService,
    ) {}

    public function index(Category $category, Request $request): JsonResponse
    {
        $payload = $this->productService->getProducts($category, $request);

        return response()->json($payload);
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
