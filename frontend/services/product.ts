import 'server-only';
import { ProductDetail } from "@/types/product";

const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

export const getProductsByCategorySlugService = async (slug: string, searchParams?: { [key: string]: string | string[] | undefined }) => {
	const query = new URLSearchParams();
	if (searchParams) {
		Object.entries(searchParams).forEach(([key, value]) => {
			if (value) query.append(key, String(value));
		});
	}

	const queryString = query.toString();
	const apiUrl = `${process.env.BACKEND_API_URL}/categories/${slug}/products${queryString ? `?${queryString}` : ''}`;

	const res = await fetch(apiUrl, {
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