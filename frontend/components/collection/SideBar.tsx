"use client"
import { useState } from "react";
import { Category } from "@/types/category";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import { formatCurrency } from "@/utils/helper";
import { Constants } from "@/types/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Sidebar({ category, constants }: {
	category: Category,
	constants: Constants
}) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const availableSizes = constants?.sizes || [];
	const availableColors = constants?.colors || [];

	const activeColor = searchParams.get('color');
	const activeSize = searchParams.get('size');

	const initialMinPrice = Number(searchParams.get('min_price')) || 50000;
	const initialMaxPrice = Number(searchParams.get('max_price')) || 200000;
	const [priceRange, setPriceRange] = useState<number[]>([initialMinPrice, initialMaxPrice]);

	const handleFilterChange = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (params.get(key) === value) {
			params.delete(key);
		} else {
			params.set(key, value);
		}

		params.delete('page');
		router.push(`${pathname}?${params.toString()}`, { scroll: false });
	};

	const handlePriceChangeComplete = (value: number | number[]) => {
		if (Array.isArray(value)) {
			const params = new URLSearchParams(searchParams.toString());
			params.set('min_price', value[0].toString());
			params.set('max_price', value[1].toString());
			params.delete('page');

			router.push(`${pathname}?${params.toString()}`, { scroll: false });
		}
	};

	return (
			<div className="sidebar">
				{
					category?.children?.length ? (
							<div className="widget">
								<h5 className="widget_title">Danh mục</h5>
								<ul className="widget_categories">
									{category.children.map((child) => (
											<li key={child.id}>
												<a href={child.slug}>
													<span className="categories_name">{child.name}</span>
													<span className="categories_num">(9)</span>
												</a>
											</li>
									))}
								</ul>
							</div>
					) : null
				}

				<div className="widget">
					<h5 className="widget_title">Khoảng giá</h5>
					<div className="filter_price">
						<div className="mt-3 mb-4 px-2">
							<Slider
									range
									min={0}
									max={1000000}
									step={50000}
									value={priceRange}
									onChange={(value) => setPriceRange(value as number[])}
									onChangeComplete={handlePriceChangeComplete}
									trackStyle={[{ backgroundColor: '#FF324D' }]}
									handleStyle={[
										{ borderColor: '#FF324D', backgroundColor: '#fff', opacity: 1 },
										{ borderColor: '#FF324D', backgroundColor: '#fff', opacity: 1 }
									]}
							/>
						</div>

						<div className="price_range d-flex align-items-center">
                        <span>
                            Giá: <span className="font-weight-bold ml-1" style={{ color: '#FF324D' }}>
                                {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
                            </span>
                        </span>
						</div>
					</div>
				</div>

				<div className="widget">
					<h5 className="widget_title">Kích thước</h5>
					<div className="product_size_switch d-flex flex-wrap gap-2">
						{availableSizes?.map((size: string, index: number) => (
								<span
										key={index}
										className={activeSize === size ? 'active' : ''}
										style={{
											cursor: 'pointer',
											textTransform: 'uppercase',
											borderRadius: '10px',
											minWidth: '40px',
											height: '40px',
											lineHeight: '40px',
											textAlign: 'center',
											fontSize: '14px',
											padding: '0 10px',
											border: activeSize === size ? '2px solid #FF324D' : '1px solid #ddd',
										}}
										onClick={() => handleFilterChange('size', size)}
								>
                            {size}
                        </span>
						))}
					</div>
				</div>

				<div className="widget">
					<h5 className="widget_title">Màu sắc</h5>
					<div
							className="product_color_switch"
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(4, 1fr)',
								rowGap: '15px',
								columnGap: '10px'
							}}
					>
						{availableColors?.map((color, index) => (
								<div
										key={index}
										className="d-flex flex-column align-items-center"
										style={{ cursor: 'pointer' }}
										onClick={() => handleFilterChange('color', color.value)}
								>
                            <span
		                            className={activeColor === color.value ? 'active' : ''}
		                            style={{
			                            backgroundColor: color.value,
			                            width: '32px',
			                            height: '32px',
			                            display: 'inline-block',
			                            borderRadius: '100%',
			                            border: '2px solid #ccc',
			                            marginBottom: '6px'
		                            }}
                            ></span>
									<div style={{
										fontSize: '12px',
										color: activeColor === color.value ? '#FF324D' : '#687188',
										fontWeight: activeColor === color.value ? '600' : '400',
										textAlign: 'center',
										lineHeight: '1.2',
										wordBreak: 'break-word'
									}}>
										{color.label}
									</div>
								</div>
						))}
					</div>
				</div>

				<div className="widget">
					<div className="shop_banner">
						<div className="banner_img overlay_bg_20">
							<Image src="/assets/images/sidebar_banner_img.jpg" alt="Banner quảng cáo" width={255} height={350} />
						</div>
						<div className="shop_bn_content2 text_white">
							<h5 className="text-uppercase shop_subtitle">Bộ sưu tập mới</h5>
							<h3 className="text-uppercase shop_title">Giảm giá 30%</h3>
							<a href="#" className="btn btn-white rounded-0 btn-sm text-uppercase">Mua ngay</a>
						</div>
					</div>
				</div>
			</div>
	);
}