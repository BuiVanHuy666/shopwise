import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.BACKEND_API_URL}/storage/products/colors/:path*`,
			},
		]
	},
};

export default nextConfig;
