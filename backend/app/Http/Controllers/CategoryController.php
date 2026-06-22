<?php

namespace App\Http\Controllers;

use App\services\CategoryService;
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
}
