import { PaginationResponse } from "@/types/api";
import { Product } from "@/types/product";

export interface Category {
	id: number;
	name: string;
	slug: string;
	children?: Category[];

	description?: string | null;
	status?: number;
}

export interface CategoryResponse {
	data: Category[];
}

export interface CategoryWithProductResponse extends PaginationResponse<Product[]> {
	category: Category;
}