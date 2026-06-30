import { Category } from "@/types/category";

// 1. Interface cho trang danh sách (Product List)
export interface Product {
	id: number;
	name: string;
	slug: string;
	thumbnail: string | null;
	price: number;
	sale_price: number | null;
	discount_percent: number;
	short_description: string;
	colors: string[];
	rating_stars: number;
	reviews_count: number;
}

export interface ProductColorOption {
	id: number;
	name: string;
	hex: string;
	images: string[];
}

export interface SizeOption {
	id: number;
	value: string;
}

export interface ProductVariant {
	id: number;
	color_id: number | null;
	sku: string;
	price: number;
	sale_price: number | null;
	discount_percent: number; // Tính toán cho từng biến thể
	stock: number;
	attribute_value_ids: number[];
}

export interface ProductAttribute {
	name: string;
	values: { id: number; value: string }[];
}

// 3. Interface chính cho trang Chi tiết
export interface ProductDetail {
	id: number;
	name: string;
	slug: string;
	category: Category;
	thumbnail: string | null;
	headline: string;
	description: string | null;
	additional_info: Record<string, string> | null;
	price: number;
	sale_price: number | null;
	discount_percent: number; // Tính toán cho sản phẩm chính
	color_options: ProductColorOption[];
	size_options: SizeOption[]; // Thêm mảng size đã gom nhóm
	attributes: ProductAttribute[]; // Các thuộc tính khác nếu có
	variants: ProductVariant[];
}

// 4. Interface cho API Response
export interface ProductListResponse {
	data: Product[];
}

export interface ProductDetailResponse {
	data: ProductDetail;
}