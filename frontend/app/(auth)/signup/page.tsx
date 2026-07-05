export default async function SignupPage()
	{
		return (
				<>
					<div className="heading_s1">
						<h3>Tạo tài khoản</h3>
					</div>
					<form method="post">
						<div className="form-group mb-3">
							<input
									type="text"
									required
									className="form-control"
									name="name"
									placeholder="Nhập tên của bạn"
							/>
						</div>
						<div className="form-group mb-3">
							<input
									type="text"
									required
									className="form-control"
									name="email"
									placeholder="Nhập địa chỉ Email"
							/>
						</div>
						<div className="form-group mb-3">
							<input
									className="form-control"
									required
									type="password"
									name="password"
									placeholder="Mật khẩu"
							/>
						</div>
						<div className="form-group mb-3">
							<input
									className="form-control"
									required
									type="password"
									name="password_confirmation"
									placeholder="Xác nhận mật khẩu"
							/>
						</div>
						<div className="login_footer form-group mb-3">
							<div className="chek-form">
								<div className="custome-checkbox">
									<input
											className="form-check-input"
											type="checkbox"
											name="checkbox"
											id="exampleCheckbox2"
											value=""
									/>
									<label
											className="form-check-label"
											htmlFor="exampleCheckbox2"
									>
										<span>Tôi đồng ý với các điều khoản &amp; chính sách.</span>
									</label>
								</div>
							</div>
						</div>
						<div className="form-group mb-3">
							<button
									type="submit"
									className="btn btn-fill-out btn-block"
									name="register"
							>
								Đăng ký
							</button>
						</div>
					</form>
					<div className="different_login">
						<span> hoặc</span>
					</div>
					<ul className="btn-login list_none text-center">
						<li>
							<a href="#" className="btn btn-facebook">
								<i className="ion-social-facebook"></i> Facebook
							</a>
						</li>
						<li>
							<a href="#" className="btn btn-google">
								<i className="ion-social-googleplus"></i> Google
							</a>
						</li>
					</ul>
					<div className="form-note text-center">
						Bạn đã có tài khoản?
						<a href="/login"> Đăng nhập</a>
					</div>
				</>
		);
	}