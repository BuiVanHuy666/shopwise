import { z } from "zod";

export const ForgotPasswordSchema = z.object({
	email: z.string({message: "Vui lòng nhập địa chỉ email."})
			.min(1, {message: "Vui lòng nhập địa chỉ email."})
			.email({message: "Địa chỉ email không hợp lệ."}),
});