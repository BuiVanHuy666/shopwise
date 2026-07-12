'use server'

import addressService from "@/services/address";
import { handleActionError } from "@/utils/helper";
import { CreateAddressSchema } from "@/validations/address/create.schema";
import { validateForm } from "@/utils/validate";
import { ActionState } from "@/types/api";


export const createAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawData = {
		receiver_name: formData.get("receiver_name"),
		receiver_phone_number: formData.get("receiver_phone_number"),
		province_code: Number(formData.get("province_code")),
		ward_code: Number(formData.get("ward_code")),
		address_detail: formData.get("address_detail"),
		is_default: formData.get("is_default") === "true",
	};

	const oldValues = { ...rawData, province_code: formData.get("province_code")?.toString(), ward_code: formData.get("ward_code")?.toString() };

	try {
		const validated = validateForm(CreateAddressSchema, rawData);

		await addressService.create(validated);

		return {
			status: "success",
			message: "Thêm địa chỉ thành công."
		};
	} catch (error) {
		console.log(handleActionError(error, oldValues) as ActionState);
		return handleActionError(error, oldValues) as ActionState;
	}

}

export const updateAction = async (id: number | string, _prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawData = {
		receiver_name: formData.get("receiver_name"),
		receiver_phone_number: formData.get("receiver_phone_number"),
		province_code: Number(formData.get("province_code")),
		ward_code: Number(formData.get("ward_code")),
		address_detail: formData.get("address_detail"),
		is_default: formData.get("is_default") === "true",
	};

	console.log(">>> check raw data: ", rawData);

	const oldValues = { ...rawData, province_code: formData.get("province_code")?.toString(), ward_code: formData.get("ward_code")?.toString() };

	try {
		const validated = validateForm(CreateAddressSchema, rawData);

		await addressService.update(id, validated);

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