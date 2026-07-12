import addressService from "@/services/address";

export async function GET() {
	try {
		const address = await addressService.get();
		return Response.json(address);
	} catch (error: any) {
		throw new Error(error.message);
	}
}