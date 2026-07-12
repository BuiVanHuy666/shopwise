import { z } from "zod";

export const UpdateProfileSchema = z.object({
	name: z
			.string()
			.trim()
			.min(1, { message: "Vui lòng nhập họ và tên." })
			.max(255, { message: "Họ và tên không được vượt quá 255 ký tự." }),

	phone_number: z
			.string()
			.trim()
			.min(1, { message: "Vui lòng nhập số điện thoại." })
			.regex(
					/^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
					{ message: "Số điện thoại không hợp lệ." }
			)
			.nullable(),

	gender: z
			.number({ message: "Vui lòng chọn giới tính." })
			.int()
			.min(0, { message: "Giới tính không hợp lệ." })
			.max(2, { message: "Giới tính không hợp lệ." })
			.nullable(),

	date_of_birth: z
			.string()
			.nullable()
			.refine((val) => !val || !isNaN(Date.parse(val)), {
				message: "Ngày sinh không hợp lệ.",
			}),

	height: z
			.number({ message: "Chiều cao phải là số." })
			.min(100, { message: "Chiều cao tối thiểu là 100 cm." })
			.max(250, { message: "Chiều cao tối đa là 250 cm." })
			.nullable(),

	weight: z
			.number({ message: "Cân nặng phải là số." })
			.min(30, { message: "Cân nặng tối thiểu là 30 kg." })
			.max(150, { message: "Cân nặng tối đa là 150 kg." })
			.nullable(),
});

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;