"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { resendVerificationAction } from "@/app/actions/auth";

export const ResendEmailButton = () => {
	const [isPending, setIsPending] = useState(false);

	const handleResend = async () => {
		if (isPending) return;

		setIsPending(true);

		const result = await resendVerificationAction();

		if (result.status === "success") {
			toast.success(result.message);
		} else {
			toast.error(result.message);
		}

		setIsPending(false);
	};

	return (
			<button
					onClick={handleResend}
					disabled={isPending}
					className="btn btn-link p-0 text-danger"
					style={{
						textDecoration: 'none',
						fontWeight: '500',
						opacity: isPending ? 0.6 : 1,
						cursor: isPending ? 'not-allowed' : 'pointer'
					}}
			>
				{isPending ? "Đang gửi..." : "Gửi lại ngay"}
			</button>
	);
};