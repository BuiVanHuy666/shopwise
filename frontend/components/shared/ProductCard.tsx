import { Product } from "@/types/product";
import { formatCurrency, getHiddenImageUrl } from "@/utils/helper";
import Image from "next/image";

interface ProductCardProps {
	product: Product;
}

export const ProductCard = ({product}: ProductCardProps) =>
	{
		return (
				<div className="product">
					<div className="product_img">
						<a href={`/product/${product.slug}`}>
							<Image
									src={product.thumbnail ? getHiddenImageUrl(product.thumbnail) : '/assets/images/default.jpg'}
									alt={product.name}
									width={261}
									height={348}
									className="overflow-hidden"
									style={{
										objectFit: 'cover',
										objectPosition: 'center'
									}}
							/>
						</a>
						<div className="product_action_box">
							<ul className="list_none pr_action_btn">
								<li className="add-to-cart">
									<a href="#"><i className="icon-basket-loaded"></i> Add To Cart</a>
								</li>
								<li>
									<a href="" className="popup-ajax"><i className="icon-shuffle"></i></a>
								</li>
								<li>
									<a href="" className="popup-ajax"><i className="icon-magnifier-add"></i></a>
								</li>
								<li>
									<a href="#"><i className="icon-heart"></i></a>
								</li>
							</ul>
						</div>
					</div>
					<div className="product_info">
						<h6 className="product_title">
							<a href={`/product/${product.slug}`}>{product.name}</a>
						</h6>
						<div className="product_price">
						<span className="price">
							{formatCurrency(product.price)}
						</span>
							{product.sale_price &&
								<del>
									{formatCurrency(product.sale_price)}
								</del>}
							{product.discount_percent > 0 && (
									<div className="on_sale">
										<span>{product.discount_percent}% Off</span>
									</div>
							)}
						</div>
						<div className="rating_wrap">
							<div className="rating">
								<div className="product_rate" style={{width: '80%'}}></div>
							</div>
							<span className="rating_num">(21)</span>
						</div>
					</div>
				</div>
		);
	};