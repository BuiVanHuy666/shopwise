import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
	searchParams,
}: {
	searchParams: Promise<{ token?: string; email?: string }>;
}) {
	const { token, email } = await searchParams;

	if (!token || !email) {
		redirect("/login");
	}

	return (
			<>
				<div className="heading_s1 text-center mb-4">
					<h3>Đặt lại mật khẩu</h3>
					<p className="text-muted mt-2">
						Vui lòng nhập mật khẩu mới cho tài khoản <br/>
						<strong>{email}</strong>
					</p>
				</div>

				<ResetPasswordForm token={token} email={email} />

				<div className="form-note text-center mt-4">
					Nhớ mật khẩu? <Link href="/login">Đăng nhập ngay</Link>
				</div>
			</>
	);
}