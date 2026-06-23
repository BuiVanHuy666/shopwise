import { Banner } from "@/components/homepage/Banner";
import { ExclusiveProducts } from "@/components/homepage/ExclusiveProducts";
import { SummerBanner } from "@/components/homepage/SummerBanner";
import { FeaturedProducts } from "@/components/homepage/FeaturedProducts";
import { Testimonials } from "@/components/homepage/Testimonials";
import { ShopInfo } from "@/components/homepage/ShopInfo";
import { Newsletter } from "@/components/shared/Newsletter";

export default function Home()
	{
		return (
				<div className="main_content">
					<Banner/>
					<ExclusiveProducts/>
					<SummerBanner/>
					<FeaturedProducts/>
					<Testimonials/>
					<ShopInfo/>
					<Newsletter/>
				</div>
		);
	}
