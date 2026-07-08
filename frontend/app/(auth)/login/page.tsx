import { LoginForm } from "@/components/auth/LoginForm";
import Link from "next/link";
import { SocialAuth } from "@/components/auth/SocialAuth";

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
					<SocialAuth/>
					<div className="form-note text-center">
						{"Bạn chưa có tài khoản?"}
						<Link href="/signup"> Đăng ký ngay</Link>
					</div>
				</>

		);
	}