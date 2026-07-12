import { getLocations } from "@/services/constant";

export async function GET(resquest: Request): Promise<Response> {
	const {searchParams} = new URL(resquest.url);
	const provinceCode = searchParams.get('province_code');
	try {
		const res = await getLocations(provinceCode || undefined);
		return Response.json(res.data);
	} catch (error: any) {
		throw new Error(error.message);
	}
}