<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(
        public CategoryService $categoryService
    ) {}

    public function index(Request $request)
    {
        $categories = $this->categoryService->getCategoryList($request->query('include'));

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function show(string $slug)
    {
        $category = $this->categoryService->getCategoryWithProducts($slug);

        return response()->json([
            'success' => true,
            'data' => $category
        ]);
    }
}
