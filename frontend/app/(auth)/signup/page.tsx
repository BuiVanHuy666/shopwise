import { SignupForm } from "@/components/auth/SignupForm";

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