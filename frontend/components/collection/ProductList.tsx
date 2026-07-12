'use client';

import useSWRInfinite from 'swr/infinite';
import { ProductCard } from "@/components/shared/ProductCard";
import { Product } from "@/types/product";
import { fetcher } from "@/utils/helper";

interface ProductListProps {
	initialProducts: Product[];
	categorySlug: string;
	lastPage: number;
	totalProducts: number;
	currentSearchParams: { [key: string]: string | string[] | undefined };
}

export default function ProductList({
	initialProducts,
	categorySlug,
	lastPage,
	totalProducts,
	currentSearchParams
}: ProductListProps) {
	const getKey = (pageIndex: number, previousPageData: any) => {
		if (previousPageData && !previousPageData.data?.length) return null;

		const page = pageIndex + 1;
		const query = new URLSearchParams({
			...currentSearchParams as Record<string, string>,
			page: page.toString()
		}).toString();

		return `/api/categories/${categorySlug}/products?${query}`;
	};

	const { data, size, setSize, isValidating } = useSWRInfinite(
			getKey,
			fetcher,
			{
				fallbackData: [
					{
						data: initialProducts,
						meta: { current_page: 1, last_page: lastPage, total: totalProducts }
					}
				],
				revalidateFirstPage: false,
				revalidateOnFocus: false,
			}
	);

	const products = data ? data.flatMap(page => page.data) : [];
	const isReachedEnd = size >= lastPage;

	const handleLoadMore = () => {
		if (!isReachedEnd && !isValidating) {
			setSize(size + 1);
		}
	};

	if (!products || products.length === 0) {
		return (
				<div className="row justify-content-center align-items-center" style={{ minHeight: '300px' }}>
					<div className="col-12 text-center mt-5 mb-5">
						<div className="mb-3">
							<i className="ti-package text-muted" style={{ fontSize: '48px' }}></i>
						</div>
						<h5 className="text-muted font-weight-normal">Không tìm thấy sản phẩm nào!</h5>
						<p>Hiện tại danh mục này chưa có sản phẩm. Vui lòng quay lại sau.</p>
					</div>
				</div>
		);
	}

	return (
			<>
				<div className="row shop_container">
					{products.map((product: Product) => (
							<div key={product.id} className="col-md-4 col-6">
								<ProductCard product={product} />
							</div>
					))}
				</div>

				<div className="row mt-4 mb-3">
					<div className="col-12 text-center">
						{!isReachedEnd && (
								<button
										className="btn btn-fill-out"
										onClick={handleLoadMore}
										disabled={isValidating}
										style={{
											minWidth: '150px',
											borderRadius: '30px',
											backgroundColor: '#000',
											color: '#fff'
										}}
								>
									{isValidating ? (
											<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									) : (
											<>XEM THÊM &#8594;</>
									)}
								</button>
						)}
						<div className="mt-3">
                        <span className="text-muted" style={{ fontSize: '16px' }}>
                            Hiển thị {products.length} trên tổng số {totalProducts} sản phẩm
                        </span>
						</div>
					</div>
				</div>
			</>
	);
}