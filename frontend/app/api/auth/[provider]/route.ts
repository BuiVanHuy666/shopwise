import { redirect } from 'next/navigation';
import { api } from '@/libs/api';

export async function GET(request: Request, { params }: { params: Promise<{ provider: string }> }) {
	const { provider } = await params;
	let urlToRedirect = null;

	try {
		const response = await api.get<{ url: string }>(`/auth/${provider}/redirect`, {
			cache: 'no-store'
		});
		urlToRedirect = response.url;
	} catch (error) {
		console.error("Lỗi khi lấy URL Social Auth:", error);
		redirect('/login?error=social_failed');
	}

	if (urlToRedirect) {
		redirect(urlToRedirect);
	} else {
		redirect('/login?error=invalid_url');
	}
}