'use client';
import { useState } from 'react';
import { ProductCard } from "@/components/shared/ProductCard";
import Toolbar from "@/components/collection/ToolBar";

const mockProducts = [
	{
		id: 1,
		name: 'Blue Dress For Woman',
		price: '$45.00',
		oldPrice: '$55.25',
		discount: '35% Off',
		thumbnail: '/assets/images/product_img1.jpg',
		rating: 80,
		reviews: 21,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 2,
		name: 'Lether Gray Tuxedo',
		price: '$55.00',
		oldPrice: '$95.00',
		discount: '25% Off',
		thumbnail: '/assets/images/product_img2.jpg',
		rating: 68,
		reviews: 15,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 3,
		name: 'woman full sliv dress',
		price: '$68.00',
		oldPrice: '$99.00',
		discount: null,
		thumbnail: '/assets/images/product_img3.jpg',
		rating: 87,
		reviews: 25,
		isHot: false,
		isSale: false,
		isNew: true // Có tag New
	},
	{
		id: 4,
		name: 'light blue Shirt',
		price: '$69.00',
		oldPrice: '$89.00',
		discount: '20% Off',
		thumbnail: '/assets/images/product_img4.jpg',
		rating: 70,
		reviews: 22,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 5,
		name: 'blue dress for woman',
		price: '$45.00',
		oldPrice: '$55.25',
		discount: '35% Off',
		thumbnail: '/assets/images/product_img5.jpg',
		rating: 80,
		reviews: 21,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 6,
		name: 'Blue casual check shirt',
		price: '$55.00',
		oldPrice: '$95.00',
		discount: '25% Off',
		thumbnail: '/assets/images/product_img6.jpg',
		rating: 68,
		reviews: 15,
		isHot: true,
		isSale: false,
		isNew: false
	},
	{
		id: 7,
		name: 'white black line dress',
		price: '$68.00',
		oldPrice: '$99.00',
		discount: '20% Off',
		thumbnail: '/assets/images/product_img7.jpg',
		rating: 87,
		reviews: 25,
		isHot: false,
		isSale: true, // Có tag Sale
		isNew: false
	},
	{
		id: 8,
		name: 'Men blue jins Shirt',
		price: '$69.00',
		oldPrice: '$89.00',
		discount: '20% Off',
		thumbnail: '/assets/images/product_img8.jpg',
		rating: 70,
		reviews: 22,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 9,
		name: 'T-Shirt Form Girls',
		price: '$45.00',
		oldPrice: '$55.25',
		discount: '35% Off',
		thumbnail: '/assets/images/product_img9.jpg',
		rating: 80,
		reviews: 21,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 10,
		name: 'Red & Black check shirt',
		price: '$55.00',
		oldPrice: '$95.00',
		discount: '25% Off',
		thumbnail: '/assets/images/product_img10.jpg',
		rating: 68,
		reviews: 15,
		isHot: true, // Có tag Hot
		isSale: false,
		isNew: false
	},
	{
		id: 11,
		name: 'Black dress for woman',
		price: '$68.00',
		oldPrice: '$99.00',
		discount: '20% Off',
		thumbnail: '/assets/images/product_img11.jpg',
		rating: 87,
		reviews: 25,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 12,
		name: 'Black T-shirt for woman',
		price: '$68.00',
		oldPrice: '$99.00',
		discount: '20% Off',
		thumbnail: '/assets/images/product_img12.jpg',
		rating: 87,
		reviews: 25,
		isHot: false,
		isSale: true, // Có tag Sale
		isNew: false
	},
	{
		id: 13,
		name: 'Pink Dress For Woman',
		price: '$65.00',
		oldPrice: '$80.00',
		discount: '30% Off',
		thumbnail: '/assets/images/product_img13.jpg',
		rating: 68,
		reviews: 28,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 14,
		name: 'White shirt for man',
		price: '$55.00',
		oldPrice: '$60.00',
		discount: null,
		thumbnail: '/assets/images/product_img14.jpg',
		rating: 68,
		reviews: 15,
		isHot: false,
		isSale: false,
		isNew: false
	},
	{
		id: 15,
		name: 'Pink Dress for Baby Kids',
		price: '$55.00',
		oldPrice: '$60.00',
		discount: null,
		thumbnail: '/assets/images/product_img15.jpg',
		rating: 68,
		reviews: 15,
		isHot: false,
		isSale: false,
		isNew: false
	}
];

export default function ProductList() {
	const [visibleCount, setVisibleCount] = useState(6);

	const handleLoadMore = () => {
		setVisibleCount(prevCount => prevCount + 3);
	};

	const hasMore = visibleCount < mockProducts.length;

	return (
			<>
				<Toolbar />
				<div className="row shop_container">
					{mockProducts.slice(0, visibleCount).map((product) => (
							<div key={product.id} className="col-md-4 col-6">
								<ProductCard product={product} />
							</div>
					))}
				</div>

				{hasMore && (
						<div className="row">
							<div className="col-12 text-center mt-4">
								<button
										className="btn btn-fill-out"
										onClick={handleLoadMore}
								>
									Load More
								</button>
							</div>
						</div>
				)}
			</>
	);
}