import 'server-only';
import { api } from "@/libs/api";
import { validateForm } from "@/utils/validate";
import { RegisterSchema } from "@/validations/auth/register.schema";
import { LoginSchema } from "@/validations/auth/login.schema";
import { ForgotPasswordSchema } from "@/validations/auth/forgotPassword.schema";
import { ResetPasswordSchema } from "@/validations/auth/resetPassword.schema";
import { RegisterResponse, LoginResponse, ForgotPasswordResponse } from "@/types/api";
import { User, UserDetail } from "@/types/user";

const register = async (data: unknown): Promise<RegisterResponse> => {
	const validatedData = validateForm(RegisterSchema, data);
	return await api.post<RegisterResponse>("/auth/register", validatedData);
};

const login = async (data: unknown): Promise<LoginResponse> => {
	const validatedFields = validateForm(LoginSchema, data);
	return await api.post<LoginResponse>("/auth/login", validatedFields);
};

const logout = async (): Promise<void> => {
	await api.post("/auth/logout");
};

const getCurrentUser = async (includeDetail: boolean = false): Promise<User | UserDetail | null> => {
	const endpoint = includeDetail ? "/auth/me?include=detail" : "/auth/me";
	const response = await api.get<{user: UserDetail}>(endpoint, { cache: "no-store" });
	return response.user;
};

const forgotPassword = async (data: unknown): Promise<ForgotPasswordResponse> => {
	const validatedData = validateForm(ForgotPasswordSchema, data);
	return await api.post<ForgotPasswordResponse>('/auth/forgot-password', validatedData);
};

const resendVerification = async (): Promise<{message: string}> => {
	return await api.post<{message: string}>("/auth/email/resend");
};

const resetPassword = async (data: unknown): Promise<{message: string}> => {
	const validatedData = validateForm(ResetPasswordSchema, data);
	return await api.post<{message: string}>('/auth/reset-password', validatedData);
};

const authService = {
	register,
	login,
	logout,
	getCurrentUser,
	forgotPassword,
	resendVerification,
	resetPassword
};

export default authService;