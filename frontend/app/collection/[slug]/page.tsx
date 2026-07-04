import { notFound } from "next/navigation";
import ProductList from "@/components/collection/ProductList";
import { getProductsByCategorySlugService } from "@/services/product";
import { getConstantsService } from "@/services/constant";
import Sidebar from "@/components/collection/SideBar";
import { Newsletter } from "@/components/shared/Newsletter";

export default async function CollectionPage({params, searchParams}: {params: Promise<{slug: string}>, searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
	const {slug} = await params;
	const currentSearchParams = await searchParams;

	let productsResponse;
	let constantsData;

	try {
		[productsResponse, constantsData] = await Promise.all([
			getProductsByCategorySlugService(slug, currentSearchParams),
			getConstantsService()
		]);
	} catch (error) {
		console.error("Lỗi khi tải dữ liệu trang danh mục:", error);
		notFound();
	}

	const { data, category, meta } = productsResponse;

	const currentPage = meta.current_page || 1;
	const lastPage = meta.last_page || 1;
	const totalProducts = meta.total || 0;

	return (
			<>
				<div className="main_content">
					<div className="section pt-5">
						<div className="container">
							<div className="row">
								<div className="col-xl-9 col-lg-8">

									<div className="row align-items-center mb-4 pb-1">
										<div className="col-12">
											<div className="product_header d-flex justify-content-between align-items-center">
												<div className="product_header_left">
													<h2 className="font-weight-bold m-0">
														{category?.name || 'Danh sách sản phẩm'}
													</h2>
												</div>
												<div className="product_header_right">
													<div className="custom_select">
														<select className="form-control form-control-sm">
															<option value="order">Sắp xếp mặc định</option>
															<option value="popularity">Phổ biến nhất</option>
															<option value="date">Mới nhất</option>
															<option value="price">Giá: Thấp đến cao</option>
														</select>
													</div>
												</div>
											</div>
										</div>
									</div>
									<ProductList
											initialProducts={data ?? []}
											categorySlug={slug}
											initialCurrentPage={currentPage}
											lastPage={lastPage}
											totalProducts={totalProducts}
											currentSearchParams={currentSearchParams}
									/>

								</div>

								<div className="col-xl-3 col-lg-4 order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
									<Sidebar category={category} constants={constantsData} />
								</div>
							</div>
						</div>
					</div>

					<Newsletter/>
				</div>
			</>
	);
}