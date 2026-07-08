"use client";

import { useActionState, useEffect } from "react";
import { forgotPasswordAction } from "@/app/actions/auth";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [state, formAction, isPending] = useActionState(forgotPasswordAction, null);

    useEffect(() => {
        if (state?.status === "success") {
            toast.success(state.message);
        } else if (state?.status === "error" && !state.errors) {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <div className="heading_s1">
                <h3>Quên mật khẩu</h3>
            </div>
            <p className="text-muted mb-4">
                Vui lòng nhập địa chỉ email của bạn. Chúng tôi sẽ gửi một liên kết để tạo mật khẩu mới.
            </p>

            <form action={formAction} noValidate>
                <div className="form-group mb-3">
                    <input
                        type="email"
                        required
                        className={`form-control ${state?.errors?.email ? 'is-invalid' : ''}`}
                        name="email"
                        placeholder="Địa chỉ Email"
                        defaultValue={state?.oldValues?.email || ""}
                    />
                    {state?.errors?.email && (
                        <span className="invalid-feedback d-block">{state.errors.email[0]}</span>
                    )}
                </div>

                <div className="form-group mb-3">
                    <button
                        type="submit"
                        className="btn btn-fill-out btn-block"
                        disabled={isPending}
                    >
                        {isPending ? "Đang gửi..." : "Gửi liên kết"}
                    </button>
                </div>
            </form>

            <div className="form-note text-center">
                Nhớ lại mật khẩu? <Link href="/login">Đăng nhập</Link>
            </div>
        </>
    );
}