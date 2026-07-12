import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
	const token = request.cookies.get('access_token')?.value;
	const { pathname } = request.nextUrl;

	// 1. Định nghĩa các nhóm đường dẫn (Routes)
	const authRoutes = ['/login', '/register']; // Chỉ dành cho Khách
	const protectedRoutes = ['/account', '/checkout']; // Bắt buộc phải Đăng nhập & Xác thực

	const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
	const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

	// ==========================================
	// TRƯỜNG HỢP 1: CHƯA ĐĂNG NHẬP
	// ==========================================
	if (!token || (token && isTokenExpired(token))) {
		const response = NextResponse.next()
		response.cookies.delete('access_token')

		if (isProtectedRoute) {
			return NextResponse.redirect(new URL('/login', request.url));
		}
		
		return response
	}


	// ==========================================
	// TRƯỜNG HỢP 2: ĐÃ ĐĂNG NHẬP
	// ==========================================

	// 2.1. Đã đăng nhập mà cố vào lại form Đăng nhập/Đăng ký -> Kiểm tra token hợp lệ trước
	if (isAuthRoute) {
		// Verify token with backend trước khi redirect về home
		try {
			const res = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Accept': 'application/json',
				},
			});

			// Nếu token sai hoặc hết hạn -> Xóa cookie và cho qua để vào login
			if (!res.ok) {
				const response = NextResponse.next();
				response.cookies.delete('access_token');
				return response;
			}

			// Token hợp lệ -> Redirect về trang chủ
			return NextResponse.redirect(new URL('/', request.url));
		} catch (error) {
			console.error("Lỗi Proxy Auth Route:", error);
			// Nếu có lỗi, cho qua để safe
			return NextResponse.next();
		}
	}

	// 2.2. Kiểm tra xác thực Email (Chỉ chạy khi vào trang bảo mật để tránh lag server)
	if (isProtectedRoute || pathname === '/verify-notice') {
		try {
			// Gọi API Backend ngay tại Proxy
			const res = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Accept': 'application/json',
				},
			});

			// Nếu Token sai hoặc hết hạn -> Xóa cookie và đuổi về Login
			if (!res.ok) {
				const response = NextResponse.redirect(new URL('/login', request.url));
				response.cookies.delete('access_token');
				return response;
			}

			const data = await res.json();
			// Lấy cờ is_verified
			const isVerified = data.user?.is_verified ?? data.is_verified;

			// Chưa xác thực mà cố vào /account -> Đẩy ra trang nhắc nhở
			if (!isVerified && pathname !== '/verify-notice') {
				return NextResponse.redirect(new URL('/verify-notice', request.url));
			}

			// Đã xác thực rồi mà rảnh rỗi vào trang nhắc nhở -> Đẩy vào tài khoản
			if (isVerified && pathname === '/verify-notice') {
				return NextResponse.redirect(new URL('/account', request.url));
			}

		} catch (error) {
			console.error("Lỗi Proxy:", error);
		}
	}

	// Nếu mọi thứ đều hợp lệ -> Mở cửa cho qua
	return NextResponse.next();
}

// ==========================================
// CẤU HÌNH PHẠM VI HOẠT ĐỘNG
// ==========================================
export const config = {
	matcher: [
		/*
		 * Khớp với tất cả các request, NGOẠI TRỪ:
		 * 1. Các route API nội bộ của Next.js (/api/)
		 * 2. Các file tài nguyên hệ thống (_next/static, _next/image)
		 * 3. Hình ảnh và file tĩnh (favicon.ico, .png, .jpg...)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};

function isTokenExpired(token: string): boolean {
	try {
		const payload = JSON.parse(atob(token.split('.')[1]))
		return Date.now() >= payload.exp * 1000
	} catch {
		return true
	}
}
