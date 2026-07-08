"use client";

import { useActionState, useEffect } from "react";
import { resetPasswordAction } from "@/app/actions/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
	token: string;
	email: string;
}

export const ResetPasswordForm = ({ token, email }: ResetPasswordFormProps) => {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(resetPasswordAction, null);

	useEffect(() => {
		if (state?.status === "success") {
			toast.success(state.message);
			router.push("/login");
		} else if (state?.status === "error" && !state.errors) {
			toast.error(state.message);
		}
	}, [state, router]);

	return (
			<form action={formAction} noValidate>
				<input type="hidden" name="token" value={token} />
				<input type="hidden" name="email" value={email} />

				<div className="form-group mb-3">
					<input
							type="password"
							name="password"
							required
							placeholder="Mật khẩu mới"
							className={`form-control ${state?.errors?.password ? 'is-invalid' : ''}`}
					/>
					{state?.errors?.password && (
							<span className="invalid-feedback d-block text-danger mt-1">
                        {state.errors.password[0]}
                    </span>
					)}
				</div>

				<div className="form-group mb-3">
					<input
							type="password"
							name="password_confirmation"
							required
							placeholder="Xác nhận mật khẩu mới"
							className={`form-control ${state?.errors?.password_confirmation ? 'is-invalid' : ''}`}
					/>
					{state?.errors?.password_confirmation && (
							<span className="invalid-feedback d-block text-danger mt-1">
                        {state.errors.password_confirmation[0]}
                    </span>
					)}
				</div>

				<div className="form-group mb-3">
					<button
							type="submit"
							className="btn btn-fill-out btn-block"
							disabled={isPending}
					>
						{isPending ? "Đang xử lý..." : "Đặt lại mật khẩu"}
					</button>
				</div>
			</form>
	);
};