export const ExclusiveProducts = () => {
	return (
			<div className="section small_pt pb_70">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<div className="heading_s1 text-center">
								<h2>Exclusive Products</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<div className="tab-style1">
								<ul className="nav nav-tabs justify-content-center" role="tablist">
									<li className="nav-item">
										<a className="nav-link active" id="arrival-tab" data-bs-toggle="tab" href="#arrival" role="tab" aria-controls="arrival" aria-selected="true">New Arrival</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="sellers-tab" data-bs-toggle="tab" href="#sellers" role="tab" aria-controls="sellers" aria-selected="false">Best Sellers</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="featured-tab" data-bs-toggle="tab" href="#featured" role="tab" aria-controls="featured" aria-selected="false">Featured</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" id="special-tab" data-bs-toggle="tab" href="#special" role="tab" aria-controls="special" aria-selected="false">Special Offer</a>
									</li>
								</ul>
							</div>
							<div className="tab-content">
								{/* New Arrival */}
								<div className="tab-pane fade show active" id="arrival" role="tabpanel" aria-labelledby="arrival-tab">
									<div className="row shop_container">
										{[1,2,3,4,5,6,7,8].map((i) => (
												<div key={i} className="col-lg-3 col-md-4 col-6">
													<div className="product">
														<div className="product_img">
															<a href="shop-product-detail.html">
																<img src={`assets/images/product_img${i}.jpg`} alt={`product_img${i}`}/>
															</a>
															<div className="product_action_box">
																<ul className="list_none pr_action_btn">
																	<li className="add-to-cart"><a href="#"><i className="icon-basket-loaded"></i> Add To Cart</a></li>
																	<li><a href="shop-compare.html" className="popup-ajax"><i className="icon-shuffle"></i></a></li>
																	<li><a href="shop-quick-view.html" className="popup-ajax"><i className="icon-magnifier-add"></i></a></li>
																	<li><a href="#"><i className="icon-heart"></i></a></li>
																</ul>
															</div>
														</div>
														<div className="product_info">
															<h6 className="product_title"><a href="shop-product-detail.html">Product Name</a></h6>
															<div className="product_price">
																<span className="price">$45.00</span>
																<del>$55.25</del>
																<div className="on_sale"><span>35% Off</span></div>
															</div>
															<div className="rating_wrap">
																<div className="rating"><div className="product_rate" style={{width: '80%'}}></div></div>
																<span className="rating_num">(21)</span>
															</div>
														</div>
													</div>
												</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};