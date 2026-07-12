'use server'

import { cookies } from "next/headers";
import { RegisterSchema } from "@/validations/auth/register.schema";
import { LoginSchema } from "@/validations/auth/login.schema";
import { redirect } from "next/navigation";
import {ForgotPasswordSchema} from "@/validations/auth/forgotPassword.schema";
import { api, ApiError } from "@/libs/api";
import { ActionState, ForgotPasswordResponse, LoginResponse, RegisterResponse } from "@/types/api";
import { handleActionError } from "@/utils/helper";
import { validateForm } from "@/utils/validate";
import { ResetPasswordSchema } from "@/validations/auth/resetPassword.schema";

export interface User {
	email: string;
	name: string;
	is_verified: boolean;
}

export const registerAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawFormData = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		password_confirmation: formData.get("password_confirmation") as string,
		accepted: formData.get("accepted"),
	};

	const oldValues = { name: rawFormData.name, email: rawFormData.email, accepted: rawFormData.accepted !== null };

	try {
		const validatedData = validateForm(RegisterSchema, rawFormData);
		const response = await api.post<RegisterResponse>("/auth/register", validatedData);

		if (response.access_token) {
			await storeAccessToken(response.access_token);
		}

		return {
			status: "success",
			message: response.message || "Đăng ký tài khoản thành công!",
		};

	} catch (error) {
		return handleActionError(error, oldValues);
	}
}

export const loginAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawFormData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		remember: formData.get("remember") === "yes",
	};

	const oldValues = { email: rawFormData.email, accepted: false };

	try {
		const validatedFields = validateForm(LoginSchema, rawFormData);
		const response = await api.post<LoginResponse>("/auth/login", validatedFields);

		if (response.access_token) {
			await storeAccessToken(response.access_token, rawFormData.remember);
		}

		return { status: "success", message: response.message || "Đăng nhập thành công!" };
	} catch (error) {
		return handleActionError(error, oldValues);
	}
}

export const logoutAction = async () => {
	const cookieStore = await cookies();
	const token = cookieStore.get("access_token")?.value;

	if (token) {
		try {
			await api.post("/auth/logout");
		} catch (error) {
			console.error("Lỗi khi gọi API logout backend:", error);
		}
	}

	cookieStore.delete("access_token");

	redirect("/login");
};

export const getCurrentUserAction = async (): Promise<User | null> => {
	const token = (await cookies()).get("access_token")?.value;

	if (!token) {
		return null;
	}

	try {
		const response = await api.get<{user: User}>("/auth/me", { cache: "no-store" });

		return response.user;
	} catch (error) {
		const apiError = error as ApiError;
		if (apiError.status !== 401) {
			console.error("Lỗi khi lấy thông tin user:", apiError.message ?? error);
		}
		return null;
	}
};

export const forgotPasswordAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawFormData = {
		email: formData.get("email") as string,
	};
	const oldValues = { name: "", email: rawFormData.email, accepted: false };

	try {
		const validatedData = validateForm(ForgotPasswordSchema, rawFormData);
		const response = await api.post<ForgotPasswordResponse>('/auth/forgot-password', validatedData);

		return {
			status: "success",
			message: response.message,
		};
	} catch (error) {
		return handleActionError(error, oldValues);
	}
}

export const resendVerificationAction = async (): Promise<ActionState> => {
	const cookieStore = await cookies();
	const token = cookieStore.get("access_token")?.value;

	if (!token) {
		return {
			status: "error",
			message: "Phiên đăng nhập đã hết hạn.",
		};
	}

	try {
		const response = await api.post<{message: string}>("/auth/email/resend");

		return {
			status: "success",
			message: response.message || "Đã gửi lại email thành công!",
		};

	} catch (error) {
		return handleActionError(error);
	}
};

export const resetPasswordAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawFormData = Object.fromEntries(formData);

	const oldValues = { email: rawFormData.email as string };

	try {
		const validatedData = validateForm(ResetPasswordSchema, rawFormData);

		const response = await api.post<{message: string}>('/auth/reset-password', validatedData);

		return {
			status: "success",
			message: response.message || "Đặt lại mật khẩu thành công!",
		};
	} catch (error) {
		return handleActionError(error, oldValues);
	}
}

export const storeAccessToken = async (token: string, remember: boolean = false) => {
	(await cookies()).set("access_token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: remember ? 60 * 60 * 24 * 14 : 60 * 60 * 24,
	});
};
