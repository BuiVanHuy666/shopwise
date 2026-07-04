import Image from "next/image";

export const Banner = () => {
	return (
			<>
				<div className="banner_section slide_medium shop_banner_slider staggered-animation-wrap">
					<div id="carouselExampleControls" className="carousel slide carousel-fade light_arrow" data-bs-ride="carousel">
						<div className="carousel-inner">
							<div className="carousel-item active background_bg" style={{ backgroundImage: "url('/assets/images/banner1.jpg')" }}>
								<div className="banner_slide_content">
									<div className="container">
										<div className="row">
											<div className="col-lg-7 col-9">
												<div className="banner_content overflow-hidden">
													<h5 className="mb-3 staggered-animation font-weight-light" data-animation="slideInLeft" data-animation-delay="0.5s">Giảm giá lên đến 50% hôm nay!</h5>
													<h2 className="staggered-animation" data-animation="slideInLeft" data-animation-delay="1s">Thời Trang Nữ</h2>
													<a className="btn btn-fill-out rounded-0 staggered-animation text-uppercase" href="/shop" data-animation="slideInLeft" data-animation-delay="1.5s">Mua ngay</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="carousel-item background_bg" style={{ backgroundImage: "url('/assets/images/banner2.jpg')" }}>
								<div className="banner_slide_content">
									<div className="container">
										<div className="row">
											<div className="col-lg-6">
												<div className="banner_content overflow-hidden">
													<h5 className="mb-3 staggered-animation font-weight-light" data-animation="slideInLeft" data-animation-delay="0.5s">Giảm giá 50% cho tất cả sản phẩm</h5>
													<h2 className="staggered-animation" data-animation="slideInLeft" data-animation-delay="1s">Thời Trang Nam</h2>
													<a className="btn btn-fill-out rounded-0 staggered-animation text-uppercase" href="/shop" data-animation="slideInLeft" data-animation-delay="1.5s">Mua ngay</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="carousel-item background_bg" style={{ backgroundImage: "url('/assets/images/banner3.jpg')" }}>
								<div className="banner_slide_content">
									<div className="container">
										<div className="row">
											<div className="col-lg-6">
												<div className="banner_content overflow-hidden">
													<h5 className="mb-3 staggered-animation font-weight-light" data-animation="slideInLeft" data-animation-delay="0.5s">Trải nghiệm mua sắm đẳng cấp</h5>
													<h2 className="staggered-animation" data-animation="slideInLeft" data-animation-delay="1s">Sale Mùa Hè</h2>
													<a className="btn btn-fill-out rounded-0 staggered-animation text-uppercase" href="/shop" data-animation="slideInLeft" data-animation-delay="1.5s">Mua ngay</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev"><i className="ion-chevron-left"></i></a>
						<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next"><i className="ion-chevron-right"></i></a>
					</div>
				</div>

				<div className="section pb_20">
					<div className="container">
						<div className="row">
							<div className="col-md-6">
								<div className="single_banner">
									<Image src="/assets/images/shop_banner_img1.jpg" alt="shop_banner_img1" width={546} height={303} />
									<div className="single_banner_info">
										<h5 className="single_bn_title1">Siêu giảm giá</h5>
										<h3 className="single_bn_title">Bộ sưu tập mới</h3>
										<a href="/shop" className="single_bn_link">Mua ngay</a>
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<div className="single_banner">
									<Image src="/assets/images/shop_banner_img2.jpg" alt="shop_banner_img2" width={546} height={303} />
									<div className="single_banner_info">
										<h3 className="single_bn_title">Mùa mới</h3>
										<h4 className="single_bn_title1">Giảm giá 40%</h4>
										<a href="/shop" className="single_bn_link">Mua ngay</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
	);
};