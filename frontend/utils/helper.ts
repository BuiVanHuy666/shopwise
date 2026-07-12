import { UploadType } from "@/types/product";
import { ApiError } from "@/libs/api";
import { ActionState } from "@/types/api";

export const getHiddenImageUrl = (filename: string, type: UploadType = 'colors') =>
		`/uploads/${type}/${filename}`;

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(amount);
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

export const getUserGender = (gender: number | null): string => {
	const genderMap: Record<number, string> = {
		0: "Nữ",
		1: "Nam",
		2: "Khác"
	};

	return gender !== null && gender !== undefined && genderMap[gender]
			? genderMap[gender]
			: "Chưa cập nhật";
};
export const fetcher = (url: string) => fetch(url).then(res => res.json());