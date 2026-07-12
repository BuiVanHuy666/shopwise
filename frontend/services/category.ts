import 'server-only';
import { Category } from "@/types/category";
import { api } from "@/libs/api";

export async function index(): Promise<Category[]> {
	const response = await api.get<{ data: Category[] }>('/categories?include=children', {
		next: { revalidate: 3600 }
	});

	return response.data;
}

const categoryService = {
	index
};

export default categoryService;