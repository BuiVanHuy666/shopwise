import { notFound } from 'next/navigation';
import { getProductDetailService } from "@/services/product";
import Tabs from "@/components/product/detail/Tabs";
import { Newsletter } from "@/components/shared/Newsletter";
import { FeaturedProducts } from "@/components/homepage/FeaturedProducts";
import ProductInteractive from "@/components/product/detail/ProductInteractive";

export default async function ProductDetailPage({params}: {
	params: Promise<{
		slug: string
	}>
})
	{
		const {slug} = await params;

		const product = await getProductDetailService(slug);

		console.log(">>> checking product: ", product, " >>>")

		if (!product) {
			notFound();
		}

		return (
				<div className="main_content">
					<div className="section pt-5">
						<div className="container">
							<ProductInteractive product={product}/>
							<div className="row">
								<div className="col-12">
									<div className="large_divider clearfix"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<Tabs
											description={product.description ?? undefined}
											additionalInfo={product.additional_info ?? undefined}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<div className="small_divider"/>
									<div className="divider"/>
									<div className="medium_divider"/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<FeaturedProducts/>
								</div>
							</div>
						</div>
					</div>

					<Newsletter/>
				</div>
		);
	}