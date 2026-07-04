import { UploadType } from "@/types/product";

export const getHiddenImageUrl = (filename: string, type: UploadType = 'thumbnails') =>
		`/uploads/${type}/${filename}`;

export const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(amount);
};