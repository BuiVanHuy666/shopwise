import { User } from "@/types/user";
import { Location } from "@/types/location";

export interface PaginationResponse<T> {
	data: T,
	links: {
		first: string;
		last: string;
		prev: string | null;
		next: string | null;
	};
	meta: {
		current_page: number;
		from: number;
		last_page: number;
		path: string;
		per_page: number;
		to: number;
		total: number;
	};
}

export interface LoginResponse {
	access_token: string,
	message: string,
	token_type: string,
	expires_in: number,
	user: User,
	errors: Record<string, unknown>[],
	oldValues: Record<string, unknown>[],
}

export interface RegisterResponse {
	message: string
	access_token: string
	token_type: string
	user: User
}

export interface ForgotPasswordResponse {
	message: string
	errors?: Record<string, string>[]
}

export interface LocationResponse {
	message: string,
	data: Location[]
}

export interface ActionState {
	status: "idle" | "success" | "error";
	message: string;
	errors?: Record<string, string[]> | null;
	oldValues?: Record<string, unknown> | null;
}