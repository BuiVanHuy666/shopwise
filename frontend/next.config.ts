import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/uploads/colors/:path*',
				destination: `${process.env.BACKEND_URL}/storage/products/colors/:path*`,
			},
		]
	},
};

export default nextConfig;
