<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Nam' => [
                'Áo Nam' => [
                    'Áo Tanktop',
                    'Áo Thun Nam',
                    'Áo Thể Thao',
                    'Áo Polo Nam',
                    'Áo Sơ Mi Nam'
                ],
                'Quần' => [
                    'Quần Short',
                    'Quần Jogger',
                    'Quần Thể Thao',
                    'Quần Dài Nam'
                ],
                'Quần Lót Nam' => [
                    'Brief (Tam giác)',
                    'Trunk (Boxer)',
                    'Boxer Brief (Boxer dài)',
                    'Long Leg'
                ]
            ],
            'Nữ' => [
                'Áo Nữ' => [
                    'Đồ bơi liền thân',
                    'Áo Sport Bra',
                    'Áo Croptop',
                    'Áo Polo Nữ',
                    'Áo Singlet'
                ],
                'Quần Nữ' => [
                    'Quần Legging',
                    'Quần Shorts',
                    'Quần Biker Shorts',
                    'Váy - Đầm',
                    'Quần Dài Nữ'
                ]
            ],
            'Phụ Kiện' => [
                'Phụ Kiện Nam' => [
                    'Túi nam',
                    'Mũ nón nam',
                    'Tất vớ nam',
                    'Ví / thắt lưng nam',
                    'Mặt nạ chạy bộ'
                ],
                'Phụ Kiện Nữ' => [
                    'Túi nữ',
                    'Mũ nón nữ',
                    'Tất vớ nữ'
                ]
            ]
        ];

        $this->seedCategories($categories);
    }

    private function seedCategories(array $categories, ?int $parentId = null): void
    {
        foreach ($categories as $key => $value) {
            if (is_array($value)) {
                $category = Category::create([
                    'parent_id' => $parentId,
                    'name' => $key,
                    'slug' => Str::slug($key),
                    'is_active' => true,
                    'sort_order' => 0,
                ]);

                $this->seedCategories($value, $category->id);

                continue;
            }

            Category::create([
                'parent_id' => $parentId,
                'name' => $value,
                'slug' => Str::slug($value),
                'is_active' => true,
                'sort_order' => 0,
            ]);
        }
    }
}
