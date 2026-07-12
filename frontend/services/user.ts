import { api } from "@/libs/api";

const update = async (data: Record<string, unknown>): Promise<void> => {
	try {
		await api.put('/auth/profile', data);
	} catch (error) {
		throw error;
	}
};

const userService = {
	update,
};

export default userService;