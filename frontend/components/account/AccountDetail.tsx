export default function AccountDetail() {
	return (
			<div className="card">
				<div className="card-header">
					<h3>Thông tin tài khoản</h3>
				</div>

				<div className="card-body">
					<form>
						<div className="row">
							<div className="form-group col-md-6 mb-3">
								<label>
									Họ <span className="required">*</span>
								</label>

								<input
										type="text"
										name="firstName"
										className="form-control"
										required
								/>
							</div>

							<div className="form-group col-md-6 mb-3">
								<label>
									Tên <span className="required">*</span>
								</label>

								<input
										type="text"
										name="lastName"
										className="form-control"
										required
								/>
							</div>

							<div className="form-group col-md-12 mb-3">
								<label>
									Tên hiển thị <span className="required">*</span>
								</label>

								<input
										type="text"
										name="displayName"
										className="form-control"
										required
								/>
							</div>

							<div className="form-group col-md-12 mb-3">
								<label>
									Địa chỉ email <span className="required">*</span>
								</label>

								<input
										type="email"
										name="email"
										className="form-control"
										required
								/>
							</div>

							<div className="form-group col-md-12 mb-3">
								<label>
									Mật khẩu hiện tại{" "}
									<span className="required">*</span>
								</label>

								<input
										type="password"
										name="currentPassword"
										className="form-control"
										required
								/>
							</div>

							<div className="form-group col-md-12 mb-3">
								<label>
									Mật khẩu mới <span className="required">*</span>
								</label>

								<input
										type="password"
										name="newPassword"
										className="form-control"
										required
								/>
							</div>

							<div className="form-group col-md-12 mb-3">
								<label>
									Xác nhận mật khẩu mới{" "}
									<span className="required">*</span>
								</label>

								<input
										type="password"
										name="confirmPassword"
										className="form-control"
										required
								/>
							</div>

							<div className="col-md-12">
								<button
										type="submit"
										className="btn btn-fill-out"
								>
									Lưu thay đổi
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
	);
}