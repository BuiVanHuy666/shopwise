import { Product } from "@/types/product";

interface ProductCardProps {
	product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
	return (
			<div className="product">
				<div className="product_img">
					<a href={`/product/${product.slug}`}>
						<img src={product.thumbnail || '/placeholder.jpg'} alt={product.name} />
					</a>
					<div className="product_action_box">
						<ul className="list_none pr_action_btn">
							<li className="add-to-cart"><a href="#"><i className="icon-basket-loaded"></i> Add To Cart</a></li>
							<li><a href="" className="popup-ajax"><i className="icon-shuffle"></i></a></li>
							<li><a href="" className="popup-ajax"><i className="icon-magnifier-add"></i></a></li>
							<li><a href="#"><i className="icon-heart"></i></a></li>
						</ul>
					</div>
				</div>
				<div className="product_info">
					<h6 className="product_title">
						<a href={`/product/${product.slug}`}>{product.name}</a>
					</h6>
					<div className="product_price">
						<span className="price">{product.price}</span>
						{product.sale_price && <del>{product.sale_price}</del>}
						{product.discount_percent > 0 && (
								<div className="on_sale"><span>{product.discount_percent}% Off</span></div>
						)}
					</div>
					<div className="rating_wrap">
						<div className="rating"><div className="product_rate" style={{width: '80%'}}></div></div>
						<span className="rating_num">(21)</span>
					</div>
				</div>
			</div>
	);
};