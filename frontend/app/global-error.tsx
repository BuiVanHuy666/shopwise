"use client";

export default function GlobalError()
	{
		return (
				<html>
				<body>
				<div className="section">
					<div className="error_wrap">
						<div className="container">
							<div className="row align-items-center justify-content-center">
								<div className="col-lg-6 col-md-10 order-lg-first">
									<div className="text-center">
										<div className="error_txt">500</div>
										<h5 className="mb-2 mb-sm-3">Oops! Không thể tải trang!</h5>
										<p>Máy chủ đang gặp sự cố. Vui lòng thử lại sau.</p>
										<div className="pb-3 pb-md-4">
											<button onClick={() => window.location.reload()} className="btn btn-fill-out">
												Thử lại
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				</body>
				</html>
		);
	}