import 'server-only';
import { Product, ProductDetail, ProductListResponse } from "@/types/product";

const BACKEND_API_URL = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function getProductsService(): Promise<Product[]> {
	const res = await fetch(`${BACKEND_API_URL}/products`, {
		next: { revalidate: 3600 }
	});

	if (!res.ok) {
		throw new Error('Lấy danh sách sản phẩm thất bại');
	}

	const result: ProductListResponse = await res.json();
	return result.data || [];
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