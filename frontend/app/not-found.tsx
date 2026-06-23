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

				<div className="section bg_default small_pt small_pb">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-md-6">
								<div className="heading_s1 mb-md-0 heading_light">
									<h3>Đăng ký nhận khuyển mãi</h3>
								</div>
							</div>
							<div className="col-md-6">
								<div className="newsletter_form">
									<form>
										<input type="text" required className="form-control rounded-0" placeholder="Nhập địa chỉ Email"/>
										<button type="submit" className="btn btn-dark rounded-0" name="submit" value="Submit">Đăng ký</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
	);
}
