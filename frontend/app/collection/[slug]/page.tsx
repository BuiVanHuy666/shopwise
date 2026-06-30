import Sidebar from "@/components/collection/SideBar";
import ProductList from "@/components/collection/ProductList";
import { Newsletter } from "@/components/shared/Newsletter";

export default function CollectionPage() {
	return (
			<>
				<div className="main_content">
					<div className="section">
						<div className="container">
							<div className="row">
								<div className="col-xl-9 col-lg-8">
									<ProductList/>
								</div>

								<div className="col-xl-3 col-lg-4 order-lg-first mt-4 pt-2 mt-lg-0 pt-lg-0">
									<Sidebar />
								</div>
							</div>
						</div>
					</div>

					<Newsletter/>
				</div>
			</>
	);
}