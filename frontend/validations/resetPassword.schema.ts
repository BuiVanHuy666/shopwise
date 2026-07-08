import { z } from "zod";

export const ResetPasswordSchema = z.object({
	token: z.string(),
	email: z.string().email(),
	password: z.string().min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự." }),
	password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
	message: "Mật khẩu xác nhận không khớp.",
	path: ["password_confirmation"],
});