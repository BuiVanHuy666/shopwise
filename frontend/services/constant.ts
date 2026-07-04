import 'server-only';
import { Constants } from "@/types/constant";

export const getConstantsService = async (
		includes: ('colors' | 'sizes')[] = ['colors', 'sizes']
): Promise<Constants> =>
	{

		const queryString = includes.join(',');

		const res = await fetch(`${process.env.BACKEND_API_URL}/options?include=${queryString}`, {
			next: {revalidate: 86400}
		});

		if (!res.ok) {
			throw new Error('Lấy dữ liệu Constants thất bại');
		}

		const result = await res.json();

		return result.data;
	};