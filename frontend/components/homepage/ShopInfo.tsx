const features = [
	{ icon: "flaticon-shipped", title: "Giao hàng miễn phí", desc: "Miễn phí vận chuyển cho mọi đơn hàng" },
	{ icon: "flaticon-money-back", title: "Đổi trả 30 ngày", desc: "Hỗ trợ đổi trả trong vòng 30 ngày" },
	{ icon: "flaticon-support", title: "Hỗ trợ 24/7", desc: "Tổng đài hỗ trợ khách hàng mọi lúc" },
];

export const ShopInfo = () =>
	{
		return (
				<div className="section pb_70">
					<div className="container">
						<div className="row g-0">
							{features.map((f) => (
									<div key={f.title} className="col-lg-4">
										<div className="icon_box icon_box_style1">
											<div className="icon">
												<i className={f.icon}></i>
											</div>
											<div className="icon_box_content">
												<h5>{f.title}</h5>
												<p>{f.desc}</p>
											</div>
										</div>
									</div>
							))}
						</div>
					</div>
				</div>
		);
	};