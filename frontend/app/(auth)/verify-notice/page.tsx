import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/app/actions/auth";
import { ResendEmailButton } from "@/components/auth/ResendEmailButton";

export default async function VerifyNoticePage() {
    const user = await getCurrentUserAction();

    if (!user) {
        redirect("/login");
    }

    if (user.is_verified) {
        redirect("/account");
    }

    return (
        <div className="text-center">
            <div className="heading_s1 mb-4">
                <h3>Xác thực tài khoản</h3>
            </div>

            <div className="mb-4">
                <i className="linearicons-envelope-open text-danger" style={{ fontSize: "60px" }}></i>
            </div>

            <h5 className="mb-3">Kiểm tra hộp thư của bạn!</h5>

            <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                Chúng tôi đã gửi một đường dẫn xác thực đến địa chỉ email <br/>
                <strong className="text-dark">{user.email}</strong>. <br/>
                Vui lòng nhấp vào đường dẫn trong email để kích hoạt toàn bộ tính năng.
            </p>

            <div className="form-group mb-3">
                <Link href="/" className="btn btn-fill-out btn-block">
                    Trở lại trang chủ
                </Link>
            </div>

            <div className="form-note text-center mt-4">
                Không nhận được email?{" "}
                <ResendEmailButton/>
            </div>
        </div>
    );
}