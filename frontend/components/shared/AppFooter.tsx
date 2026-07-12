import Image from "next/image";
import categoryService from "@/services/category";

export const AppFooter = async () => {
	const categories = await categoryService.index();

	return (
			<footer className="footer_dark">
				<div className="footer_top">
					<div className="container">
						<div className="row">
							<div className="col-lg-3 col-md-6 col-sm-12">
								<div className="widget">
									<div className="footer_logo">
										<a href="#">
											<Image src="/assets/images/logo_light.png" alt="logo" width={182} height={47} loading="eager"/>
										</a>
									</div>
									<p>Cửa hàng thời trang cao cấp cung cấp các mẫu thiết kế mới nhất với chất lượng tốt nhất.</p>
								</div>
								<div className="widget">
									<ul className="social_icons social_white">
										<li><a href="#"><i className="ion-social-facebook"></i></a></li>
										<li><a href="#"><i className="ion-social-twitter"></i></a></li>
										<li><a href="#"><i className="ion-social-googleplus"></i></a></li>
										<li><a href="#"><i className="ion-social-youtube-outline"></i></a></li>
										<li><a href="#"><i className="ion-social-instagram-outline"></i></a></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6">
								<div className="widget">
									<h6 className="widget_title">Liên kết hữu ích</h6>
									<ul className="widget_links">
										<li><a href="#">Về chúng tôi</a></li>
										<li><a href="#">Câu hỏi thường gặp</a></li>
										<li><a href="#">Địa chỉ</a></li>
										<li><a href="#">Đối tác</a></li>
										<li><a href="#">Liên hệ</a></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6">
								<div className="widget">
									<h6 className="widget_title">Danh mục</h6>
									<ul className="widget_links">
										{categories.map((cat) => (
												<li key={cat.id}>
													<a href={`/category/${cat.slug}`}>{cat.name}</a>
												</li>
										))}
									</ul>
								</div>
							</div>
							<div className="col-lg-2 col-md-6 col-sm-6">
								<div className="widget">
									<h6 className="widget_title">Tài khoản</h6>
									<ul className="widget_links">
										<li><a href="#">Tài khoản của tôi</a></li>
										<li><a href="#">Mã giảm giá</a></li>
										<li><a href="#">Chính sách đổi trả</a></li>
										<li><a href="#">Lịch sử đơn hàng</a></li>
										<li><a href="#">Theo dõi đơn hàng</a></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-3 col-md-4 col-sm-6">
								<div className="widget">
									<h6 className="widget_title">Thông tin liên hệ</h6>
									<ul className="contact_info contact_info_light">
										<li>
											<i className="ti-location-pin"></i>
											<p>123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh, Việt Nam</p>
										</li>
										<li>
											<i className="ti-email"></i>
											<a href="mailto:info@shopwise.com">info@shopwise.com</a>
										</li>
										<li>
											<i className="ti-mobile"></i>
											<p>+ 0909 123 456</p>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bottom_footer border-top-tran">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<p className="mb-md-0 text-center text-md-start">© 2026 Bản quyền thuộc về Shopwise</p>
							</div>
							<div className="col-md-6">
								<ul className="footer_payment text-center text-lg-end">
									<li><Image src="/assets/images/visa.png" alt='visa' width={49} height={32}/></li>
									<li><Image src="/assets/images/discover.png" alt='discover' width={49} height={32}/></li>
									<li><Image src="/assets/images/master_card.png" alt='master_card' width={49} height={32}/></li>
									<li><Image src="/assets/images/paypal.png" alt='paypal' width={49} height={32}/></li>
									<li><Image src="/assets/images/amarican_express.png" alt='amarican_express' width={49} height={32}/></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>
	);
};