import Image from "next/image";

export const SummerBanner = () => {
	return (
			<div className="section bg_light_blue2 pb-0 pt-md-0">
				<div className="container">
					<div className="row align-items-center flex-row-reverse">
						<div className="col-md-6 offset-md-1">
							<div className="medium_divider d-none d-md-block clearfix"></div>
							<div className="trand_banner_text text-center text-md-start">
								<div className="heading_s1 mb-3">
									<span className="sub_heading">Xu hướng mùa mới!</span>
									<h2>Bộ sưu tập mùa hè</h2>
								</div>
								<h5 className="mb-4">Giảm giá lên đến 50%</h5>
								<a href="" className="btn btn-fill-out rounded-0">Mua ngay</a>
							</div>
							<div className="medium_divider clearfix"></div>
						</div>
						<div className="col-md-5">
							<div className="text-center trading_img">
								<Image src="/assets/images/tranding_img.png" alt="tranding_img" width={400} height={400}/>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};