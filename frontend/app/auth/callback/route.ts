import { NextResponse } from 'next/server';
import { storeAccessToken } from "@/app/actions/auth";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const token = searchParams.get('token');

	if (token) {
		await storeAccessToken(token, true)

		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.redirect(new URL('/login', request.url));
}