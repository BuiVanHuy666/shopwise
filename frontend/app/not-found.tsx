import { Newsletter } from "@/components/shared/Newsletter";

export default function NotFound () {
	return (
			<>
				<div className="section">
					<div className="error_wrap">
						<div className="container">
							<div className="row align-items-center justify-content-center">
								<div className="col-lg-6 col-md-10 order-lg-first">
									<div className="text-center">
										<div className="error_txt">404</div>
										<p>Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc hiện không còn công khai. Vui lòng kiểm tra lại đường dẫn.</p>
										<a href="" className="btn btn-fill-out">Trở về trang chủ</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Newsletter/>
			</>
	);
}
