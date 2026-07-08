import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";

export default async function LoginPage()
	{
		return (

				<>
					<div className="heading_s1">
						<h3>Đăng nhập</h3>
					</div>
					<LoginForm/>
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
						<Link href="/signup"> Đăng ký ngay</Link>
					</div>
				</>

		);
	}