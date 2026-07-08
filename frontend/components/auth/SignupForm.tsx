"use client";

import { useActionState, useEffect } from "react";
import { registerAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const SignupForm = () =>
	{
		const [state, formAction, isPending] = useActionState(registerAction, null);
		const router = useRouter();

		useEffect(() => {
			if (state?.status === "success") {
				toast.success(state.message);
				router.push("/");
			}
		}, [state, router]);

		return (
				<>
					{state?.status === "error" && !state.errors && (
							<div className="alert alert-danger">
								{state.message}
							</div>
					)}
					<form action={formAction} noValidate>
						<div className="form-group mb-3">
							<input
									type="text"
									className={`form-control ${state?.errors?.name ? 'is-invalid' : ''}`}
									name="name"
									placeholder="Nhập tên của bạn"
									autoComplete="name"
									defaultValue={state?.oldValues?.name || ""}
							/>
							{state?.errors?.name && (
									<span className="invalid-feedback d-block">{state.errors.name[0]}</span>
							)}
						</div>
						<div className="form-group mb-3">
							<input
									type="text"
									className={`form-control ${state?.errors?.email ? 'is-invalid' : ''}`}
									name="email"
									placeholder="Nhập địa chỉ Email"
									autoComplete="email"
									defaultValue={state?.oldValues?.email || ""}
							/>
							{state?.errors?.email && (
									<span className="invalid-feedback d-block">{state.errors.email[0]}</span>
							)}
						</div>
						<div className="form-group mb-3">
							<input
									type="password"
									className={`form-control ${state?.errors?.password ? 'is-invalid' : ''}`}
									name="password"
									placeholder="Mật khẩu"
									autoComplete="new-password"
							/>
							{state?.errors?.password && (
									<span className="invalid-feedback d-block">{state.errors.password[0]}</span>
							)}
						</div>
						<div className="form-group mb-3">
							<input
									className="form-control"
									type="password"
									name="password_confirmation"
									placeholder="Xác nhận mật khẩu"
									autoComplete="new-password"
							/>
						</div>
						<div className="login_footer form-group mb-3">
							<div className="chek-form">
								<div className="custome-checkbox">
									<input
											className="form-check-input"
											type="checkbox"
											name="accepted"
											id="exampleCheckbox2"
											value="accepted"
											defaultChecked={state?.oldValues?.accepted}
									/>
									<label
											className="form-check-label"
											htmlFor="exampleCheckbox2"
									>
										<span>Tôi đồng ý với các điều khoản &amp; chính sách.</span>
									</label>
								</div>
								{state?.errors?.accepted && (
										<span className="invalid-feedback d-block mt-2">{state.errors.accepted[0]}</span>
								)}
							</div>
						</div>
						<div className="form-group mb-3">
							<button
									type="submit"
									className="btn btn-fill-out btn-block"
									disabled={isPending}
							>
								{isPending ? "Đang xử lý..." : "Đăng ký"}
							</button>
						</div>
					</form>
				</>
		);
	};