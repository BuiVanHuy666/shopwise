import type { Metadata } from "next";
import { Roboto, Poppins } from 'next/font/google';
import Script from 'next/script';
import "./globals.css";
import '../styles/bootstrap/css/bootstrap.min.css';
import '../styles/css/animate.css';
import '../styles/css/all.min.css';
import '../styles/css/ionicons.min.css';
import '../styles/css/themify-icons.css';
import '../styles/css/linearicons.css';
import '../styles/css/flaticon.css';
import '../styles/css/simple-line-icons.css';
import '../styles/css/style.css';
import '../styles/css/responsive.css';
import React, { Suspense } from "react";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import Loading from "@/app/loading";

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin'],
	variable: '--font-roboto'
});

const poppins = Poppins({
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: '--font-poppins'
});

export const metadata: Metadata = {
	title: "Shopwise - Thương hiệu thời trang chất đến từ Việt Nam",
	description: "Trải nghiệm mua sắm thời trang nam và nữ trực tuyến tại Shopwise. Đa dạng sản phẩm: quần áo, đồ lót, tất, phụ kiện thể thao... Mua sắm tiện lợi, chất lượng tốt, giao hàng nhanh, đổi trả 60 ngày.",
	keywords: "thời trang nam, quần áo nam, áo phông nam, đồ lót nam",
	icons: {
		icon: '/favicon.png',
	}
};

export default async function RootLayout({children}: Readonly<{
	children: React.ReactNode;
}>)
	{
		return (
				<html lang="vi" className={`${roboto.className} ${poppins.className} h-full antialiased`}>
				<body className="min-h-full flex flex-col">

				<Suspense fallback={<Loading/>}>
					<AppHeader/>
				</Suspense>
				{children}
				<Suspense fallback={<Loading/>}>
					<AppFooter/>
				</Suspense>

				<Script src="/assets/js/jquery-3.7.1.min.js" strategy="beforeInteractive"/>
				<Script src="/assets/js/popper.min.js" strategy="lazyOnload"/>
				<Script src="/assets/js/bootstrap.min.js" strategy="lazyOnload"/>
				<Script src="/assets/owlcarousel/js/owl.carousel.min.js" strategy="lazyOnload"/>
				<Script src="/assets/js/magnific-popup.min.js" strategy="lazyOnload"/>
				<Script src="/assets/js/waypoints.min.js" strategy="lazyOnload"/>
				<Script src="/assets/js/parallax.js" strategy="lazyOnload"/>
				<Script src="/assets/js/jquery.countdown.min.js" strategy="lazyOnload"/>
				<Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="lazyOnload"/>
				<Script src="/assets/js/isotope.min.js" strategy="lazyOnload"/>
				</body>
				</html>
		);
	}