'use client';
import { useState } from 'react';
import { ProductCard } from "@/components/shared/ProductCard";
import { Product } from "@/types/product";
import { loadMoreProductsAction } from "@/app/actions/product";

interface ProductListProps {
	initialProducts: Product[];
	categorySlug: string;
	initialCurrentPage: number;
	lastPage: number;
	totalProducts: number; // 1. Thêm prop này để nhận tổng số sản phẩm từ API
}

export default function ProductList({
	initialProducts,
	categorySlug,
	initialCurrentPage,
	lastPage,
	totalProducts // 2. Nhận prop
}: ProductListProps) {

	const [products, setProducts] = useState<Product[]>(initialProducts);
	const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleLoadMore = async () => {
		if (isLoading || currentPage >= lastPage) return;

		setIsLoading(true);
		try {
			const nextPage = currentPage + 1;
			const response = await loadMoreProductsAction(categorySlug, nextPage);

			if (response.data) {
				setProducts(prev => [...prev, ...response.data]);
				setCurrentPage(nextPage);
			} else {
				console.warn(response.message);
				alert("Có lỗi xảy ra: " + response.message);
			}
		} catch (error) {
			console.error("Lỗi network hoặc lỗi không xác định:", error);
		} finally {
			setIsLoading(false);
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
					{products.map((product) => (
							<div key={product.id} className="col-md-4 col-6">
								<ProductCard product={product}/>
							</div>
					))}
				</div>

				{/* Khu vực phân trang */}
				<div className="row mt-4 mb-3">
					<div className="col-12 text-center">

						{/* Nút Xem thêm */}
						{currentPage < lastPage && (
								<button
										className="btn btn-fill-out"
										onClick={handleLoadMore}
										disabled={isLoading}
										style={{
											minWidth: '150px',
											borderRadius: '30px', // Bo góc giống trong hình
											backgroundColor: '#000', // Đổi màu đen
											color: '#fff'
										}}
								>
									{isLoading ? (
											<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
									) : (
											<>XEM THÊM &#8594;</> // Thêm mũi tên (→) giống hình
									)}
								</button>
						)}

						{/* Dòng chữ hiển thị tiến độ */}
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