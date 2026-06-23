export interface Category {
	id: number;
	name: string;
	slug: string;
	children: Category[];

	description?: string | null;
	status?: number;
}