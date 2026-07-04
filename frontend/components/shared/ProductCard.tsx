"use client";

import { Product, ProductCardColor } from "@/types/product";
import { formatCurrency, getHiddenImageUrl } from "@/utils/helper";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
	product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
	const defaultImage = product.thumbnail ?? product.colors?.[0]?.image_url ?? null;

	const [activeImage, setActiveImage] = useState<string | null>(defaultImage);
	const [activeColor, setActiveColor] = useState<string | null>(
		product.colors?.[0]?.color_group ?? null
	);

	const handleColorSelect = (colorGroup: string, imageUrl: string) => {
		setActiveColor(colorGroup);
		setActiveImage(imageUrl);
	};

	const imageSrc = activeImage
		? getHiddenImageUrl(activeImage)
		: "/assets/images/default.jpg";

	return (
		<div className="product">
			<div className="product_img">
				<a href={`/product/${product.slug}`}>
					<Image
						src={imageSrc}
						alt={product.name}
						width={261}
						height={348}
						className="overflow-hidden"
						style={{
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
				</a>
				<div className="product_action_box">
					<ul className="list_none pr_action_btn">
						<li className="add-to-cart">
							<a href="#">
								<i className="icon-basket-loaded"></i> Add To Cart
							</a>
						</li>
						<li>
							<a href="" className="popup-ajax">
								<i className="icon-shuffle"></i>
							</a>
						</li>
						<li>
							<a href="" className="popup-ajax">
								<i className="icon-magnifier-add"></i>
							</a>
						</li>
						<li>
							<a href="#">
								<i className="icon-heart"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div className="product_info">
				<h6 className="product_title">
					<a href={`/product/${product.slug}`}>{product.name}</a>
				</h6>

				<div className="product_price">
					<span className="price">{formatCurrency(product.price)}</span>
					{product.sale_price && <del>{formatCurrency(product.sale_price)}</del>}
					{product.discount_percent > 0 && (
						<div className="on_sale">
							<span>{product.discount_percent}% Off</span>
						</div>
					)}
				</div>

				{/* FIX: Bọc các thẻ <li> vào <ul> và thêm Flexbox để hiển thị ngang */}
				<ul
					className="list_none d-flex align-items-center"
					style={{ gap: "8px", padding: 0, margin: "10px 0" }}
				>
					{product.colors?.map((color: ProductCardColor) => (
						<li key={color.color_group} style={{ display: "inline-block" }}>
							<button
								type="button"
								aria-label={color.color_group}
								onClick={() => handleColorSelect(color.color_group, color.image_url)}
								style={{
									width: 20,
									height: 20,
									borderRadius: "50%",
									backgroundColor: color.color_hex,
									border:
										activeColor === color.color_group
											? "2px solid #000"
											: "1px solid #ddd",
									padding: 0,
									cursor: "pointer",
									display: "block"
								}}
							/>
						</li>
					))}
				</ul>

				<div className="rating_wrap">
					<div className="rating">
						<div
							className="product_rate"
							style={{ width: `${(product.rating_stars ?? 0) * 20}%` }}
						></div>
					</div>
					<span className="rating_num">({product.reviews_count ?? 0})</span>
				</div>
			</div>
		</div>
	);
};