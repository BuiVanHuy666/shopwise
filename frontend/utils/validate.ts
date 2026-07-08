import { z } from "zod";

export function validateForm<T>(schema: z.ZodSchema<T>, data: unknown) {
	const validated = schema.safeParse(data);

	if (!validated.success) {
		throw {
			status: 422,
			message: "Vui lòng kiểm tra lại các thông tin đã nhập.",
			errors: validated.error.flatten().fieldErrors,
		};
	}

	return validated.data;
}