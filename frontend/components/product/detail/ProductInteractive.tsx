"use client";

import React, { useState } from "react";
import Gallery from "./Gallery";
import Info from "./Info";
import { ProductDetail } from "@/types/product";

type Props = {
	product: ProductDetail;
}

export default function ProductInteractive({ product }: Props) {
	const [selectedColorId, setSelectedColorId] = useState<number | undefined>(
			product.color_options?.[0]?.id
	);

	const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

	return (
			<div className="row">
				<div className="col-lg-6 col-md-6 mb-4 mb-md-0">
					<Gallery
							colorOptions={product.color_options}
							selectedColorId={selectedColorId}
							activeImageIndex={activeImageIndex}
							onImageIndexChange={setActiveImageIndex}
					/>
				</div>
				<div className="col-lg-6 col-md-6">
					<Info
							name={product.name}
							price={product.price}
							salePrice={product.sale_price ?? undefined}
							discountPercent={product.discount_percent}
							headline={product.headline}
							categoryName={product.category.name}
							colorOptions={product.color_options}
							sizeOptions={product.size_options}
							variants={product.variants}
							selectedColorId={selectedColorId}
							onColorChange={setSelectedColorId}
					/>
				</div>
			</div>
	);
}