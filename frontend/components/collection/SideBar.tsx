"use client"
import { useState } from "react";

const colors = ['#87554B', '#333333', '#DA323F', '#2F366C', '#B5B6BB'];
const sizes = ['xs', 's', 'm', 'l', 'xl'];

export default function Sidebar() {
	const [activeColor, setActiveColor] = useState(colors[0]);
	const [activeSize, setActiveSize] = useState(sizes[0]);
	return (
			<div className="sidebar">
				<div className="widget">
					<h5 className="widget_title">Categories</h5>
					<ul className="widget_categories">
						<li>
							<a href="#"><span className="categories_name">Women</span><span className="categories_num">(9)</span></a>
						</li>
						<li>
							<a href="#"><span className="categories_name">Top</span><span className="categories_num">(6)</span></a>
						</li>
						<li>
							<a href="#"><span className="categories_name">T-Shirts</span><span className="categories_num">(4)</span></a>
						</li>
						<li>
							<a href="#"><span className="categories_name">Men</span><span className="categories_num">(7)</span></a>
						</li>
						<li>
							<a href="#"><span className="categories_name">Shoes</span><span className="categories_num">(12)</span></a>
						</li>
					</ul>
				</div>
				<div className="widget">
					<h5 className="widget_title">Filter</h5>
					<div className="filter_price">
						<div id="price_filter" data-min="0" data-max="500" data-min-value="50" data-max-value="300" data-price-sign="$"></div>
						<div className="price_range">
							<span>Price: <span id="flt_price"></span></span>
							<input type="hidden" id="price_first"/>
							<input type="hidden" id="price_second"/>
						</div>
					</div>
				</div>
				<div className="widget">
					<h5 className="widget_title">Brand</h5>
					<ul className="list_brand">
						<li>
							<div className="custome-checkbox">
								<input className="form-check-input" type="checkbox" name="checkbox" id="Arrivals" value=""/>
								<label className="form-check-label" htmlFor="Arrivals"><span>New Arrivals</span></label>
							</div>
						</li>
						<li>
							<div className="custome-checkbox">
								<input className="form-check-input" type="checkbox" name="checkbox" id="Lighting" value=""/>
								<label className="form-check-label" htmlFor="Lighting"><span>Lighting</span></label>
							</div>
						</li>
						<li>
							<div className="custome-checkbox">
								<input className="form-check-input" type="checkbox" name="checkbox" id="Tables" value=""/>
								<label className="form-check-label" htmlFor="Tables"><span>Tables</span></label>
							</div>
						</li>
						<li>
							<div className="custome-checkbox">
								<input className="form-check-input" type="checkbox" name="checkbox" id="Chairs" value=""/>
								<label className="form-check-label" htmlFor="Chairs"><span>Chairs</span></label>
							</div>
						</li>
						<li>
							<div className="custome-checkbox">
								<input className="form-check-input" type="checkbox" name="checkbox" id="Accessories" value=""/>
								<label className="form-check-label" htmlFor="Accessories"><span>Accessories</span></label>
							</div>
						</li>
					</ul>
				</div>
				<div className="widget">
					<h5 className="widget_title">Size</h5>
					{/* Thêm d-flex flex-wrap gap-2 để tạo khoảng cách giữa các size */}
					<div className="product_size_switch d-flex flex-wrap gap-2">
						{sizes.map((size, index) => (
								<span
										key={index}
										className={activeSize === size ? 'active' : ''}
										style={{ cursor: 'pointer', textTransform: 'uppercase' }}
										onClick={() => setActiveSize(size)}
								>
                            {size}
                        </span>
						))}
					</div>
				</div>
				<div className="widget">
					<h5 className="widget_title">Color</h5>
					<div className="product_color_switch d-flex gap-2">
						{colors.map((color, index) => (
								<span
										key={index}
										className={activeColor === color ? 'active' : ''}
										style={{
											backgroundColor: color,
											cursor: 'pointer',
											width: '20px',
											height: '20px',
											display: 'inline-block',
											borderRadius: '100%' // Bo tròn nếu template yêu cầu
										}}
										onClick={() => setActiveColor(color)}
								></span>
						))}
					</div>
				</div>
				<div className="widget">
					<div className="shop_banner">
						<div className="banner_img overlay_bg_20">
							<img src="/assets/images/sidebar_banner_img.jpg" alt="sidebar_banner_img"/>
						</div>
						<div className="shop_bn_content2 text_white">
							<h5 className="text-uppercase shop_subtitle">New Collection</h5>
							<h3 className="text-uppercase shop_title">Sale 30% Off</h3>
							<a href="#" className="btn btn-white rounded-0 btn-sm text-uppercase">Shop Now</a>
						</div>
					</div>
				</div>
			</div>
	);
}