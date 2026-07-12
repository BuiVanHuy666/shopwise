import 'server-only';
import { Address } from "@/types/address";
import { api } from "@/libs/api";
import { CreateAddressInput } from "@/validations/address/create.schema";

export const get = async (): Promise<Address[]> => {
	try {
		const response = await api.get<{ data: Address[] }>('/auth/addresses');
		return response.data;
	} catch (error) {
		throw error;
	}
}

const destroy = async (id: number | string): Promise<void> => {
	await api.delete(`/auth/addresses/${id}`);
}

const update = async (id: number | string, data: CreateAddressInput): Promise<void> => {
	await api.put(`/auth/addresses/${id}`, data);
}

const create = async (data: CreateAddressInput): Promise<void> => {
	await api.post('/auth/addresses', data);
}

const addressService = {
	get,
	create,
	destroy,
	update
};

export default addressService;