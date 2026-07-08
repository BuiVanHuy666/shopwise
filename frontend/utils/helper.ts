import { UploadType } from "@/types/product";
import { cookies } from "next/headers";
import { ActionState } from "@/app/actions/auth";
import { ApiError } from "@/libs/api";

export const getHiddenImageUrl = (filename: string, type: UploadType = 'colors') =>
		`/uploads/${type}/${filename}`;

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(amount);
};

export const storeAccessToken = async (token: string) => {
	(await cookies()).set("access_token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60 * 24 * 7,
	});
};

export const handleActionError = (error: unknown, oldValues?: Record<string, unknown>): ActionState => {
	if (process.env.NODE_ENV !== 'production') {
		console.error("[Action Error]:", error);
	}

	const apiError = error as ApiError;

	return {
		status: "error",
		message: apiError.message || "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
		errors: apiError.errors || null,
		oldValues
	};
};