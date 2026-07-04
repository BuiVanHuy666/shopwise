import 'server-only';
import { Category, CategoryResponse } from "@/types/category";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function getCategoriesService(): Promise<Category[]> {
	const res = await fetch(`${BACKEND_API_URL}/categories?include=children`, {
		next: { revalidate: 3600 }
	});

	if (!res.ok) throw new Error('Lấy danh mục thất bại');

	const result: CategoryResponse = await res.json();
	return result.data;
}