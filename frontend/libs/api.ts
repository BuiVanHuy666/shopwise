import "server-only"

import { cookies } from "next/headers";

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
		const errorData = await response.json().catch(() => ({}));

		const isServerError = response.status >= 500;

		let safeMessage = "Đã xảy ra lỗi từ hệ thống.";

		if (isServerError) {
			safeMessage = "Oops, đã có lỗi xảy ra ở máy chủ. Vui lòng thử lại sau!";
		} else if (errorData.message) {
			safeMessage = errorData.message;
		}

		throw {
			status: response.status,
			message: safeMessage,
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
	put: <T>(endpoint: string, body: Record<string, unknown>, options?: RequestInit) => fetchApi<T>(endpoint, {
		...options,
		method: "PUT",
		body: JSON.stringify(body)
	}),
	delete: <T>(endpoint: string, options?: RequestInit) => fetchApi<T>(endpoint, {
		...options,
		method: "DELETE"
	}),
};
