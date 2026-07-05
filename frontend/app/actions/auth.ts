'use server'

import { cookies } from "next/headers";
import { RegisterSchema } from "@/validations/register.schema";

export interface ActionState {
	status: "idle" | "success" | "error";
	message: string;
	errors?: Record<string, string[]> | null;
	oldValues?: { name: string; email: string; accepted: boolean };
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

	const validatedFields = RegisterSchema.safeParse(rawFormData);

	if (!validatedFields.success) {
		return {
			status: "error",
			message: "Vui lòng kiểm tra lại các thông tin đã nhập.",
			errors: validatedFields.error.flatten().fieldErrors,
			oldValues,
		};
	}

	try {
		const response = await fetch(`${process.env.BACKEND_API_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({
				name: validatedFields.data.name,
				email: validatedFields.data.email,
				password: validatedFields.data.password,
				password_confirmation: validatedFields.data.password_confirmation,
			})
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				status: "error",
				message: data.message || "Đăng ký thất bại",
				errors: data.errors || null,
				oldValues
			};
		}

		if (data.access_token) {
			(await cookies()).set("access_token", data.access_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				path: "/",
				maxAge: 60 * 60 * 24 * 7,
			});
		}

		return {
			status: "success",
			message: data.message || "Đăng ký tài khoản thành công!",
		};

	} catch (error) {
		console.error("Error during registration:", error);
		return {
			status: "error",
			message: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
			oldValues
		};
	}
}