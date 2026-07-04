import { Category } from "@/types/category";

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
	discount_percent: number;
	stock: number;
	attribute_value_ids: number[];
}

export interface ProductAttribute {
	name: string;
	values: { id: number; value: string }[];
}

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
	discount_percent: number;
	color_options: ProductColorOption[];
	size_options: SizeOption[];
	attributes: ProductAttribute[];
	variants: ProductVariant[];
}

export interface ProductListResponse {
	data: Product[];
}

export interface ProductDetailResponse {
	data: ProductDetail;
}

export type UploadType = 'thumbnails' | 'colors';