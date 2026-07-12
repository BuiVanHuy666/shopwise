'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError } from "@/libs/api";
import { ActionState } from "@/types/api";
import { handleActionError } from "@/utils/helper";
import { User, UserDetail } from "@/types/user";
import authService from "@/services/auth";

export const storeAccessToken = async (token: string, remember: boolean = false) => {
	(await cookies()).set("access_token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: remember ? 60 * 60 * 24 * 14 : 60 * 60 * 24,
	});
};

export const registerAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawData = {
		name: formData.get("name") as string,
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		password_confirmation: formData.get("password_confirmation") as string,
		accepted: formData.get("accepted"),
	};

	const oldValues = { name: rawData.name, email: rawData.email, accepted: rawData.accepted !== null };

	try {
		const response = await authService.register(rawData);

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
	const rawData = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		remember: formData.get("remember") === "yes",
	};

	const oldValues = { email: rawData.email, accepted: false };

	try {
		const response = await authService.login(rawData);

		if (response.access_token) {
			await storeAccessToken(response.access_token, rawData.remember);
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
			await authService.logout();
		} catch (error) {
			console.error("Lỗi khi gọi API logout backend:", error);
		}
	}

	cookieStore.delete("access_token");

	redirect("/login");
};

export async function getCurrentUserAction(includeDetail: boolean = false): Promise<User | UserDetail | null> {
	const token = (await cookies()).get("access_token")?.value;

	if (!token) {
		return null;
	}

	try {
		return await authService.getCurrentUser(includeDetail);
	} catch (error) {
		const apiError = error as ApiError;
		if (apiError.status !== 401) {
			console.error("Lỗi khi lấy thông tin user:", apiError.message ?? error);
		}
		return null;
	}
}

export const forgotPasswordAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawData = {
		email: formData.get("email") as string,
	};
	const oldValues = { name: "", email: rawData.email, accepted: false };

	try {
		const response = await authService.forgotPassword(rawData);

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
		const response = await authService.resendVerification();

		return {
			status: "success",
			message: response.message || "Đã gửi lại email thành công!",
		};
	} catch (error) {
		return handleActionError(error);
	}
};

export const resetPasswordAction = async (_prev: ActionState | null, formData: FormData): Promise<ActionState> => {
	const rawData = Object.fromEntries(formData);
	const oldValues = { email: rawData.email as string };

	try {
		const response = await authService.resetPassword(rawData);

		return {
			status: "success",
			message: response.message || "Đặt lại mật khẩu thành công!",
		};
	} catch (error) {
		return handleActionError(error, oldValues);
	}
}