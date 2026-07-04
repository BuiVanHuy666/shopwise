"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Gallery as PhotoSwipeGallery, Item } from 'react-photoswipe-gallery';
import type { Swiper as SwiperType } from 'swiper';
import 'photoswipe/dist/photoswipe.css';
import { ProductColorOption } from "@/types/product";
import Image from "next/image";
import { getHiddenImageUrl } from "@/utils/helper";

type Props = {
	colorOptions: ProductColorOption[];
	selectedColorId?: number;
	activeImageIndex: number;
	onImageIndexChange: (index: number) => void;
}

export default function Gallery({ colorOptions, selectedColorId, activeImageIndex, onImageIndexChange }: Props) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

	const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);

	const currentColorOption = colorOptions?.find(c => c.id === selectedColorId) || colorOptions?.[0];
	const displayImages = currentColorOption?.images || [];

	const safeIndex = Math.min(activeImageIndex, Math.max(0, displayImages.length - 1));

	useEffect(() => {
		if (mainSwiper && !mainSwiper.destroyed) {
			mainSwiper.slideTo(safeIndex, 0);
		}
	}, [selectedColorId, safeIndex, mainSwiper]);

	return (
			<div className="product-image">
				<PhotoSwipeGallery>
					<div className="product_img_box mb-3">
						<Swiper
								onSwiper={setMainSwiper}
								onSlideChange={(swiper) => onImageIndexChange(swiper.activeIndex)}
								spaceBetween={10}
								thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
								modules={[FreeMode, Thumbs]}
								observer={true}
								observeParents={true}
								className="mySwiper2 border rounded overflow-hidden"
						>
							{displayImages.map((src, index) => (
									<SwiperSlide key={`${selectedColorId}-main-${index}`}>
										<Item
												original={getHiddenImageUrl(src, 'colors')}
												thumbnail={getHiddenImageUrl(src, 'colors')}
												width="1200"
												height="1600"
										>
											{({ ref, open }) => (
													<div
															style={{ paddingTop: '133.33%' }}
															className="relative w-full overflow-hidden cursor-pointer bg-white"
															onClick={open}
													>
														<Image
																ref={ref as any}
																src={getHiddenImageUrl(src, 'colors')}
																alt={`product-main-${index}`}
																fill
																className="object-cover"
																sizes="(max-width: 768px) 100vw, 50vw"
														/>
													</div>
											)}
										</Item>
									</SwiperSlide>
							))}
						</Swiper>
					</div>
				</PhotoSwipeGallery>

				<Swiper
						style={{
							"--swiper-navigation-color": "#ff324d",
							"--swiper-pagination-color": "#ff324d",
						} as React.CSSProperties}
						onSwiper={setThumbsSwiper}
						spaceBetween={10}
						slidesPerView={4}
						freeMode={true}
						navigation={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						observer={true}
						observeParents={true}
						className="mySwiper product_gallery_item"
				>
					{displayImages.map((src, index) => (
							<SwiperSlide key={`${selectedColorId}-thumb-${index}`}>
								<div
										style={{ paddingTop: '100%' }}
										className="relative w-full border rounded overflow-hidden cursor-pointer hover:border-red-500 transition-colors bg-gray-50"
								>
									<Image
											src={getHiddenImageUrl(src, 'colors')}
											alt={`product-thumb-${index}`}
											fill
											className="object-cover"
											sizes="25vw"
									/>
								</div>
							</SwiperSlide>
					))}
				</Swiper>
			</div>
	);
}