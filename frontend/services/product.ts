import 'server-only';
import { ProductDetail } from "@/types/product";
import { api } from "@/libs/api";

const indexByCategory = async (slug: string, searchParams?: { [key: string]: string | string[] | undefined }) => {
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

async function show(slug: string): Promise<ProductDetail | null> {
	const response = await api.get<{ data: ProductDetail }>(`/products/${slug}`, {
		next: { revalidate: 60 }
	});

	return response.data as ProductDetail;
}

const productService = {
	show,
	indexByCategory
}

export default productService;