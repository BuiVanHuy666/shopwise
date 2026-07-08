import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface ApiError {
	status: number;
	message: string;
	errors?: Record<string, string[]>;
	oldValues?: Record<string, unknown>;
}

async function fetchApi<T>(endpoint: string, options: RequestInit): Promise<T> {
	const baseUrl = process.env.BACKEND_API_URL;
	const cookieStore = await cookies();
	const token = cookieStore.get("access_token")?.value;

	const headers = new Headers(options.headers);
	headers.set("Accept", "application/json");

	if (options.body && typeof options.body === 'string' && !headers.has("Content-Type")) {
		headers.set("Content-Type", "application/json");
	}

	if (token) {
		headers.set("Authorization", `Bearer ${token}`);
	}

	let response: Response;

	try {
		response = await fetch(`${baseUrl}${endpoint}`, {
			...options,
			headers,
		});
	} catch (error) {
		console.error(`[Network Error] ${options.method || 'GET'} ${endpoint}:`, error);
		throw {
			status: 503,
			message: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
			errors: null
		};
	}

	if (!response.ok) {
		if (response.status === 401 && !endpoint.includes('/auth/login')) {
			cookieStore.delete("access_token");
			redirect("/login");
		}

		const errorData = await response.json().catch(() => ({}));

		throw {
			status: response.status,
			message: errorData.message || "Đã xảy ra lỗi từ hệ thống.",
			errors: errorData.errors || null
		};
	}

	return (await response.json()) as T;
}

export const api = {
	get: <T>(endpoint: string, options?: RequestInit) => fetchApi<T>(endpoint, {
		...options,
		method: "GET"
	}),
	post: <T>(endpoint: string, body?: Record<string, unknown>, options?: RequestInit) => fetchApi<T>(endpoint, {
		...options,
		method: "POST",
		body: JSON.stringify(body)
	}),
	put: <T>(endpoint: string, body: Record<string, unknown>, options?: RequestInit) => <T>fetchApi(endpoint, {
		...options,
		method: "PUT",
		body: JSON.stringify(body)
	}),
	delete: <T>(endpoint: string, options?: RequestInit) => fetchApi<T>(endpoint, {
		...options,
		method: "DELETE"
	}),
};
