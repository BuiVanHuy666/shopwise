import 'server-only';
import { Constants } from "@/types/constant";
import { LocationResponse } from "@/types/api";
import { api } from "@/libs/api";
import { handleActionError } from "@/utils/helper";

export const getConstantsService = async (includes: ('colors' | 'sizes')[] = ['colors', 'sizes']): Promise<Constants> => {
	const queryString = includes.join(',');

	const res = await api.get<{
		data: Constants
	}>(`/options?include=${queryString}`, {
		next: {revalidate: 86400}
	})

	return res.data;
};

export const getLocations = (provinceCodes?: string): Promise<LocationResponse> => {
	try {
		const endpoint = provinceCodes
				? `/locations?province_code=${provinceCodes}`
				: '/locations';

		return api.get<LocationResponse>(endpoint);
	} catch (error) {
		handleActionError(error);
		throw error;
	}
}