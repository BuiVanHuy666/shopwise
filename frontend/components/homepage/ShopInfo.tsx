const features = [
	{
		icon: "flaticon-shipped",
		title: "Free Delivery",
		desc: "If you are going to use of Lorem, you need to be sure there anything"
	},
	{
		icon: "flaticon-money-back",
		title: "30 Day Return",
		desc: "If you are going to use of Lorem, you need to be sure there anything"
	},
	{
		icon: "flaticon-support",
		title: "27/4 Support",
		desc: "If you are going to use of Lorem, you need to be sure there anything"
	},
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