import { SignupForm } from "@/components/auth/SignupForm";
import { SocialAuth } from "@/components/auth/SocialAuth";

export default function SignupPage() {

	return (
			<>
				<div className="heading_s1">
					<h3>Tạo tài khoản</h3>
				</div>

				<SignupForm/>

				<div className="different_login">
					<span> hoặc</span>
				</div>
				<SocialAuth/>
				<div className="form-note text-center">
					Bạn đã có tài khoản?
					<a href="/login"> Đăng nhập</a>
				</div>
			</>
	);
}