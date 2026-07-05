export default async function LoginPage()
	{
		return (

				<>
					<div className="heading_s1">
						<h3>Đăng nhập</h3>
					</div>
					<form method="post">
						<div className="form-group mb-3">
							<input
									type="text"
									required
									className="form-control"
									name="email"
									placeholder="Địa chỉ Email"
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
						<div className="login_footer form-group mb-3">
							<div className="chek-form">
								<div className="custome-checkbox">
									<input
											className="form-check-input"
											type="checkbox"
											name="checkbox"
											id="exampleCheckbox1"
											value=""
									/>
									<label
											className="form-check-label"
											htmlFor="exampleCheckbox1"
									>
										<span>Ghi nhớ đăng nhập</span>
									</label>
								</div>
							</div>
							<a href="#">Quên mật khẩu?</a>
						</div>
						<div className="form-group mb-3">
							<button
									type="submit"
									className="btn btn-fill-out btn-block"
									name="login"
							>
								Đăng nhập
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
						{"Bạn chưa có tài khoản?"}
						<a href="/signup"> Đăng ký ngay</a>
					</div>
				</>

		);
	}