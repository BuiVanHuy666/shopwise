"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const testimonials = [
	{
		id: 1,
		name: "Lissa Castro",
		role: "Designer",
		img: "user_img1.jpg",
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem."
	},
	{
		id: 2,
		name: "Alden Smith",
		role: "Designer",
		img: "user_img2.jpg",
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem."
	},
	{
		id: 3,
		name: "Daisy Lana",
		role: "Designer",
		img: "user_img3.jpg",
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem."
	},
	{
		id: 4,
		name: "John Becker",
		role: "Designer",
		img: "user_img4.jpg",
		text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam amet animi blanditiis consequatur debitis dicta distinctio, enim error eum iste libero modi nam natus perferendis possimus quasi sint sit tempora voluptatem."
	},
];

export const Testimonials = () =>
	{
		return (
				<div className="section bg_redon">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-6">
								<div className="heading_s1 text-center">
									<h2>Our Client Say!</h2>
								</div>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-lg-9">
								<Swiper
										modules={[Navigation]}
										navigation
										loop
										className="testimonial_wrap testimonial_style1 carousel_slider nav_style2"
								>
									{testimonials.map((t) => (
											<SwiperSlide key={t.id} className="testimonial_box">
												<div className="testimonial_desc">
													<p>{t.text}</p>
												</div>
												<div className="author_wrap">
													<div className="author_img">
														<img src={`assets/images/${t.img}`} alt={t.img}/>
													</div>
													<div className="author_name">
														<h6>{t.name}</h6>
														<span>{t.role}</span>
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