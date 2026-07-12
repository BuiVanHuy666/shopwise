export interface User {
	id?: number | string;
	email: string;
	name: string;
	is_verified: boolean;
}

export interface UserDetail extends User {
	phone_number?: string | null;
	joined_at: string | null;
	gender: number | null;
	date_of_birth?: string | null;
	height?: number | null;
	weight?: number | null;
}