import { z } from "zod";

export const UpdateProfileSchema = z.object({
	name: z.string().min(1, "Vui lòng nhập họ và tên."),
	phone_number: z.string().nullable().optional(),
	gender: z.number().nullable().optional(),
	date_of_birth: z.string().nullable().optional(),
	height: z.number().nullable().optional(),
	weight: z.number().nullable().optional(),
});