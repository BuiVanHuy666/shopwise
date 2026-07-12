'use server'

import userService from "@/services/user";
import { handleActionError } from "@/utils/helper";
import { validateForm } from "@/utils/validate";
import { ActionState } from "@/types/api";
import { UpdateProfileSchema } from "@/validations/user/update-profile.schema";

export const updateProfileAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const day = formData.get("day") as string;
	const month = formData.get("month") as string;
	const year = formData.get("year") as string;

	let date_of_birth = null;
	if (day && month && year) {
		date_of_birth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
	}

	const rawData = {
		name: formData.get("name"),
		phone_number: formData.get("phone_number") || null,
		gender: formData.get("gender") !== null ? Number(formData.get("gender")) : null,
		date_of_birth,
		height: formData.get("height") ? Number(formData.get("height")) : null,
		weight: formData.get("weight") ? Number(formData.get("weight")) : null,
	};

	const oldValues = { ...rawData };

	try {
		const validated = validateForm(UpdateProfileSchema, rawData);

		await userService.update(validated);

		return {
			status: "success",
			message: "Cập nhật hồ sơ thành công!"
		};
	} catch (error) {
		return handleActionError(error, oldValues) as ActionState;
	}
}