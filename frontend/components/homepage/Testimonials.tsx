"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";

const testimonials = [
	{
		id: 1,
		name: "Lê Minh Thư",
		role: "Nhà thiết kế",
		img: "user_img1.jpg",
		text: "Sản phẩm thực sự tuyệt vời! Chất liệu vải rất tốt và kiểu dáng đúng như mô tả. Tôi rất hài lòng với trải nghiệm mua sắm tại cửa hàng."
	},
	{
		id: 2,
		name: "Nguyễn Văn Anh",
		role: "Kiến trúc sư",
		img: "user_img2.jpg",
		text: "Dịch vụ khách hàng quá xuất sắc. Mình đặt hàng buổi sáng mà chiều đã nhận được. Hàng đóng gói cẩn thận, chỉn chu. Sẽ ủng hộ shop dài dài."
	},
	{
		id: 3,
		name: "Trần Lan Chi",
		role: "Người mẫu",
		img: "user_img3.jpg",
		text: "Mình đã mua nhiều shop nhưng ở đây là ưng nhất. Form áo chuẩn, tôn dáng cực kỳ. Giá cả lại rất phải chăng so với chất lượng."
	},
	{
		id: 4,
		name: "Phạm Hoàng Nam",
		role: "Doanh nhân",
		img: "user_img4.jpg",
		text: "Giao hàng nhanh, tư vấn nhiệt tình. Cửa hàng luôn cập nhật những xu hướng thời trang mới nhất. Mình rất tin tưởng khi đặt mua đồ tại đây."
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
									<h2>Khách hàng nói về chúng tôi!</h2>
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
														<Image src={`/assets/images/${t.img}`} alt={t.img} width={60} height={60}/>
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