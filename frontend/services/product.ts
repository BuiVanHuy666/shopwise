import 'server-only';
import { ProductDetail } from "@/types/product";
import { CategoryWithProductResponse } from "@/types/category";

const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function getProductsByCategorySlugService(
		categorySlug: string,
		searchParams?: Record<string, string | number | undefined>
): Promise<CategoryWithProductResponse> {
	const query = searchParams
			? '?' + new URLSearchParams(
			Object.entries(searchParams)
					.filter(([, value]) => value !== undefined)
					.map(([key, value]) => [key, String(value)])
	).toString()
			: '';

	const res = await fetch(`${BACKEND_API_URL}/categories/${categorySlug}/products${query}`, {
		next: { revalidate: 3600 }
	});

	if (!res.ok) {
		if (res.status === 404) {
			throw new Error('Không tìm thấy danh mục sản phẩm');
		}
		throw new Error('Lấy danh sách sản phẩm theo danh mục thất bại');
	}

	return res.json();
}

export async function getProductDetailService(slug: string): Promise<ProductDetail | null> {
	const res = await fetch(`${BACKEND_API_URL}/products/${slug}`, {
		next: { revalidate: 60 }
	});

	if (!res.ok) {
		return null;
	}

	const result = await res.json();
	return result.data;
}

export async function loadMoreProductsAction(categorySlug: string, page: number) {
	try {
		return await getProductsByCategorySlugService(categorySlug, {page});
	} catch (error) {
		console.error("Lỗi khi load thêm sản phẩm:", error);
		return null;
	}
}