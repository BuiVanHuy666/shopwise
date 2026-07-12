'use server'

import addressService from "@/services/address";
import { handleActionError } from "@/utils/helper";
import { CreateAddressSchema } from "@/validations/address/create.schema";
import { ActionState } from "@/types/api";
import { validateForm } from "@/utils/validate";

export const createAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const { rawData, oldValues } = parseAddressFormData(formData);

	try {
		const validatedData = validateForm(CreateAddressSchema, rawData)
		await addressService.create(validatedData);

		return {
			status: "success",
			message: "Thêm địa chỉ thành công."
		};
	} catch (error) {
		return handleActionError(error, oldValues) as ActionState;
	}
}

export const updateAction = async (id: number | string, _prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const { rawData, oldValues } = parseAddressFormData(formData);

	try {
		const validatedData = validateForm(CreateAddressSchema, rawData);
		await addressService.update(id, validatedData);

		return {
			status: "success",
			message: "Cập nhật địa chỉ thành công."
		};
	} catch (error) {
		return handleActionError(error, oldValues) as ActionState;
	}
}

export const destroyAction = async (id: number | string): Promise<ActionState> => {
	try {
		await addressService.destroy(id);
		return {
			status: "success",
			message: "Xóa địa chỉ thành công."
		};
	} catch (error) {
		return handleActionError(error) as ActionState;
	}
}

const parseAddressFormData = (formData: FormData) => {
	const rawData = {
		receiver_name: formData.get("receiver_name"),
		receiver_phone_number: formData.get("receiver_phone_number"),
		province_code: formData.get("province_code") ? Number(formData.get("province_code")) : null,
		ward_code: formData.get("ward_code") ? Number(formData.get("ward_code")) : null,
		address_detail: formData.get("address_detail"),
		is_default: formData.get("is_default") === "true",
	};

	const oldValues = {
		...rawData,
		province_code: formData.get("province_code")?.toString() || "",
		ward_code: formData.get("ward_code")?.toString() || ""
	};

	return { rawData, oldValues };
};