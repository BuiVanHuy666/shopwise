import { z } from "zod";

export const RegisterSchema = z.object({
	name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
	email: z.string({message: "Vui lòng nhập địa chỉ email."})
			.min(1, {message: "Vui lòng nhập địa chỉ email."})
			.email({message: "Địa chỉ email không hợp lệ."}),
	password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự." }),
	password_confirmation: z.string(),
	accepted: z.any().refine((val) => val === "accepted", {
		message: "Bạn phải đồng ý với các điều khoản & chính sách.",
	}),
}).refine((data) => data.password === data.password_confirmation, {
	message: "Mật khẩu xác nhận không khớp.",
	path: ["password_confirmation"],
});