'use server';

import { getProductsByCategorySlugService } from "@/services/product";

export async function loadMoreProductsAction(categorySlug: string, page: number) {
	try {
		const response = await getProductsByCategorySlugService(categorySlug, {page: page});

		return {
			data: response.data || [],
			meta: response.meta || null,
		};

	} catch (error) {
		console.error(`[Action Error] loadMoreProductsAction failed for ${categorySlug}:`, error);

		return {
			data: [],
			message: "Không thể tải thêm sản phẩm lúc này. Vui lòng thử lại sau."
		};
	}
}