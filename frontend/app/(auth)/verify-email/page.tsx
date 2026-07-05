"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const verifyUrl = searchParams.get("verify_url");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Đang xử lý xác thực email của bạn...");

	useEffect(() => {
		if (!verifyUrl) {
			setStatus("error");
			setMessage("Đường dẫn xác thực không hợp lệ hoặc bị thiếu.");
			return;
		}

		fetch(verifyUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		})
				.then(async (response) => {
					// Chuyển đổi response thành JSON
					const data = await response.json();

					// fetch không tự nhảy vào catch nếu lỗi 4xx, 5xx, nên ta phải tự check
					if (!response.ok) {
						throw new Error(data.message || "Xác thực thất bại.");
					}

					// Thành công (Status 200-299)
					setStatus("success");
					setMessage(data.message || "Xác thực email thành công!");
				})
				.catch((error) => {
					// Thất bại
					setStatus("error");
					// Vì ta đã throw new Error ở trên, ta có thể lấy error.message
					setMessage(
							error.message ||
							"Xác thực thất bại. Đường dẫn có thể đã hết hạn hoặc đã bị lỗi mạng."
					);
				});
	}, [verifyUrl]);
    return (
        <>
            <div className="heading_s1 text-center mb-4">
                <h3>Xác thực Email</h3>
            </div>

            <div className="form-group mb-4 text-center">
                {status === "loading" && (
                    <div className="d-flex flex-column align-items-center">
                        <div className="spinner-border text-danger mb-3" role="status"></div>
                        <p>{message}</p>
                    </div>
                )}

                {status === "success" && (
                    <div className="alert alert-success" role="alert">
                        {message}
                    </div>
                )}

                {status === "error" && (
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                )}
            </div>

            {status !== "loading" && (
                <div className="form-group mb-3 text-center">
                    <Link href="/login" className="btn btn-fill-out btn-block">
                        Đi đến trang Đăng nhập
                    </Link>
                </div>
            )}
        </>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div className="text-center py-5">Đang tải dữ liệu...</div>}>
            <VerifyEmailContent />
        </Suspense>
    );
}