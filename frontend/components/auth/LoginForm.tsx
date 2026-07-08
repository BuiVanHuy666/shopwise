"use client";

import { useActionState, useEffect } from "react";
import { loginAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export const LoginForm = () => {
	const [state, formAction, isPending] = useActionState(loginAction, null);
	const router = useRouter();

	useEffect(() => {
		if (state?.status === "success") {
			toast.success(state.message);
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
								type="email"
								required
								className={`form-control ${state?.errors?.email ? 'is-invalid' : ''}`}
								name="email"
								placeholder="Địa chỉ Email"
								defaultValue={state?.oldValues?.email || ""}
								autoComplete="email"
						/>
						{state?.errors?.email && (
								<span className="invalid-feedback d-block">{state.errors.email[0]}</span>
						)}
					</div>

					<div className="form-group mb-3">
						<input
								className={`form-control ${state?.errors?.password ? 'is-invalid' : ''}`}
								required
								type="password"
								name="password"
								placeholder="Mật khẩu"
								defaultValue=""
								autoComplete="current-password"
						/>
						{state?.errors?.password && (
								<span className="invalid-feedback d-block">{state.errors.password[0]}</span>
						)}
					</div>

					<div className="login_footer form-group mb-3">
						<div className="chek-form">
							<div className="custome-checkbox">
								<input
										className="form-check-input"
										type="checkbox"
										name="remember"
										id="exampleCheckbox1"
										value="yes"
								/>
								<label className="form-check-label" htmlFor="exampleCheckbox1">
									<span>Ghi nhớ đăng nhập</span>
								</label>
							</div>
						</div>
						<Link href="/forgot-password">Quên mật khẩu?</Link>
					</div>

					<div className="form-group mb-3">
						<button
								type="submit"
								className="btn btn-fill-out btn-block"
								disabled={isPending}
						>
							{isPending ? "Đang xử lý..." : "Đăng nhập"}
						</button>
					</div>
				</form>
			</>
	);
};