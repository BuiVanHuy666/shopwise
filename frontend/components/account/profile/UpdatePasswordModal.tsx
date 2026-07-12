'use client';

import { useState } from 'react';

interface UpdatePasswordModalProps {
	onClose: () => void;
	onSuccess: () => void;
}

export const UpdatePasswordModal = ({ onClose, onSuccess }: UpdatePasswordModalProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
			<div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex={-1}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form action={'/'} noValidate>
							<div className="modal-header">
								<h5 className="modal-title">Thay đổi mật khẩu</h5>
								<button type="button" className="btn-close" onClick={onClose}></button>
							</div>

							<div className="modal-body">
								{/*{state?.status === "error" && !state.errors && (*/}
								{/*		<div className="alert alert-danger">*/}
								{/*			{state.message}*/}
								{/*		</div>*/}
								{/*)}*/}

								{/* 1. Mật khẩu hiện tại */}
								<div className="form-floating mb-3">
									<input
											type={showPassword ? "text" : "password"}
											className='form-control'
											// className={`form-control ${state?.errors?.current_password ? 'is-invalid' : ''}`}
											id="currentPassword"
											name="current_password"
											placeholder="Mật khẩu hiện tại"
											//
									/>
									<label htmlFor="currentPassword">Mật khẩu hiện tại</label>
									{/*{state?.errors?.current_password && (*/}
									{/*		<div className="invalid-feedback d-block">{state.errors.current_password[0]}</div>*/}
									{/*)}*/}
								</div>

								{/* 2. Mật khẩu mới */}
								<div className="form-floating mb-3">
									<input
											type={showPassword ? "text" : "password"}
											className='form-control'
											// className={`form-control ${state?.errors?.password ? 'is-invalid' : ''}`}
											id="newPassword"
											name="password"
											placeholder="Mật khẩu mới"
											// disabled={isPending}
									/>
									<label htmlFor="newPassword">Mật khẩu mới</label>
									{/*{state?.errors?.password && (*/}
									{/*		<div className="invalid-feedback d-block">{state.errors.password[0]}</div>*/}
									{/*)}*/}
								</div>

								{/* 3. Xác nhận mật khẩu mới */}
								<div className="form-floating mb-3">
									<input
											type={showPassword ? "text" : "password"}
											 className='form-control'
											// className={`form-control ${state?.errors?.password_confirmation ? 'is-invalid' : ''}`}
											id="confirmPassword"
											name="password_confirmation"
											placeholder="Xác nhận mật khẩu mới"
											// disabled={isPending}
									/>
									<label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
									{/*{state?.errors?.password_confirmation && (*/}
									{/*		<div className="invalid-feedback d-block">{state.errors.password_confirmation[0]}</div>*/}
									{/*)}*/}
								</div>

								{/* Nút Toggle Ẩn/Hiện mật khẩu */}
								<div className="form-check mt-2">
									<input
											className="form-check-input"
											type="checkbox"
											id="showPasswordCheck"
											checked={showPassword}
											onChange={(e) => setShowPassword(e.target.checked)}
											// disabled={isPending}
									/>
									<label className="form-check-label text-secondary" htmlFor="showPasswordCheck" style={{ cursor: 'pointer' }}>
										Hiển thị mật khẩu
									</label>
								</div>
							</div>

							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={onClose}>
									Hủy bỏ
								</button>
								<button type="submit" className="btn btn-fill-out" >
									Lwu
									{/*{isPending ? (*/}
									{/*		<>*/}
									{/*			<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>*/}
									{/*			Đang xử lý...*/}
									{/*		</>*/}
									{/*) : (*/}
									{/*		'Lưu mật khẩu'*/}
									{/*)}*/}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
	);
};