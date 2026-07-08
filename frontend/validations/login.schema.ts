import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string({message: "Vui lòng nhập địa chỉ email."})
			.min(1, {message: "Vui lòng nhập địa chỉ email."})
			.email({message: "Địa chỉ email không hợp lệ."}),
	password: z.string().min(8, {message: "Mật khẩu phải có ít nhất 8 ký tự."})
})