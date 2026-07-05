import React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
			<div className="login_register_wrap section pt-5">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-6 col-md-10">
							<div className="login_wrap">
								<div className="padding_eight_all bg-white">
									{children}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
}