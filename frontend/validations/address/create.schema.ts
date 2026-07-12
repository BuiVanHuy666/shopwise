import { z } from "zod";

export const CreateAddressSchema = z.object({
	receiver_name: z
			.string()
			.trim()
			.min(1, { message: "Vui lòng nhập tên người nhận." })
			.max(100, { message: "Tên người nhận không được vượt quá 100 ký tự." }),

	receiver_phone_number: z
			.string()
			.trim()
			.min(1, { message: "Vui lòng nhập số điện thoại." })
			.regex(
					/^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
					{ message: "Số điện thoại không hợp lệ." }
			),

	province_code: z
			.number({message: "Vui lòng chọn tỉnh/thành phố." })
			.int()
			.positive({ message: "Vui lòng chọn tỉnh/thành phố." }),

	ward_code: z
			.number({message: "Vui lòng chọn phường/xã."})
			.int()
			.positive({ message: "Vui lòng chọn phường/xã." }),
	address_detail: z
			.string()
			.trim()
			.min(1, { message: "Vui lòng nhập địa chỉ cụ thể." })
			.max(255, { message: "Địa chỉ không được vượt quá 255 ký tự." }),

	is_default: z.boolean().optional().default(false),
});

export type CreateAddressInput = z.infer<typeof CreateAddressSchema>;