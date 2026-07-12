import { NextResponse } from 'next/server';
import productService from "@/services/product";

export async function GET(
		request: Request,
		{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;

	const { searchParams } = new URL(request.url);
	const queryParams = Object.fromEntries(searchParams.entries());

	try {
		const response = await productService.indexByCategory(slug, queryParams);

		return NextResponse.json(response);
	} catch (error) {
		console.error(`[API Error] Load more failed for ${slug}:`, error);
		return NextResponse.json(
				{ message: "Không thể tải thêm sản phẩm lúc này." },
				{ status: 500 }
		);
	}
}