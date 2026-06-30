"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export const FeaturedProducts = () => {
	return (
			<div className="section">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-6">
							<div className="heading_s1 text-center">
								<h2>Featured Products</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<Swiper
									modules={[Navigation]}
									navigation
									loop
									className="product_slider carousel_slider nav_style1"
									breakpoints={{
										0:    { slidesPerView: 1 },
										481:  { slidesPerView: 2 },
										768:  { slidesPerView: 3 },
										1199: { slidesPerView: 4 },
									}}
							>
								{[1,2,3,4,5].map((i) => (
										<SwiperSlide key={i}>
											<div className="product">
												<div className="product_img">
													<a href="">
														<img src={`/assets/images/product_img${i}.jpg`} alt={`product_img${i}`}/>
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
													<h6 className="product_title"><a href="">Product Name</a></h6>
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
										</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
	);
};