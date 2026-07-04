import Image from "next/image";
import { Category } from "@/types/category";
import Link from "next/link";
import { getCategoriesService } from "@/services/category";

export const AppHeader = async () =>
	{
		const categories: Category[] = await getCategoriesService();
		return (
				<header className="header_wrap fixed-top header_with_topbar">
					<div className="bottom_header dark_skin main_menu_uppercase">
						<div className="container">
							<nav className="navbar navbar-expand-lg">
								<Link className="navbar-brand" href="/">
									<Image className="logo_dark" src="/assets/images/logo_dark.png" alt="logo" width={182} height={47}/>
									<Image className="logo_light" src="/assets/images/logo_light.png" alt="logo" width={182} height={47}/>
								</Link>
								<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-expanded="false">
									<span className="ion-android-menu"></span>
								</button>
								<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
									<ul className="navbar-nav">
										{categories.map((category) => (
												<li key={category.id} className="dropdown dropdown-mega-menu">
													<Link
															className={category.children && category.children.length > 0 ? 'dropdown-toggle nav-link' : 'nav-link'}
															href={`/collection/${category.slug}`}
															data-bs-toggle="dropdown"
													>
														{category.name}
													</Link>

													{category.children && category.children.length > 0 && (
															<div className="dropdown-menu">
																<ul className="mega-menu d-lg-flex flex-wrap">
																	{category.children.map((child) =>
																	{
																		const childrenCount = category.children!.length;
																		const colSize = childrenCount >= 4 ? 3 : Math.floor(12 / childrenCount);

																		return (
																				<li key={child.id} className={`mega-menu-col col-lg-${colSize} mb-4`}>
																					<ul>
																						<li className="dropdown-header"><Link href={`/collection/${child.slug}`}>{child.name}</Link></li>
																						{child.children && child.children.map((subChild) => (
																								<li key={subChild.id}>
																									<Link className="dropdown-item nav-link nav_item" href={`/collection/${subChild.slug}`}>
																										{subChild.name}
																									</Link>
																								</li>
																						))}
																					</ul>
																				</li>
																		);
																	})}
																</ul>

																<div className="d-lg-flex menu_banners row g-3 px-3">
																	<div className="col-sm-4">
																		<div className="header-banner">
																			<Image src="/assets/images/menu_banner1.jpg" alt="menu_banner1" width={351} height={190}/>
																			<div className="banne_info">
																				<h6>10% Off</h6>
																				<h4>New Arrival</h4>
																				<a href="#">Shop now</a>
																			</div>
																		</div>
																	</div>
																	<div className="col-sm-4">
																		<div className="header-banner">
																			<Image src="/assets/images/menu_banner2.jpg" alt="menu_banner2" width={351} height={190}/>
																			<div className="banne_info">
																				<h6>15% Off</h6>
																				<h4>{"Men's Fashion"}</h4>
																				<a href="#">Shop now</a>
																			</div>
																		</div>
																	</div>
																	<div className="col-sm-4">
																		<div className="header-banner">
																			<Image src="/assets/images/menu_banner3.jpg" alt="menu_banner3" width={351} height={190}/>
																			<div className="banne_info">
																				<h6>23% Off</h6>
																				<h4>Kids Fashion</h4>
																				<a href="#">Shop now</a>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
													)}
												</li>
										))}
									</ul>
								</div>
								<ul className="navbar-nav attr-nav align-items-center">
									<li>
										<a href="javascript:;" className="nav-link search_trigger"><i className="linearicons-magnifier"></i></a>
										<div className="search_wrap">
											<span className="close-search"><i className="ion-ios-close-empty"></i></span>
											<form>
												<input type="text" placeholder="Search" className="form-control" id="search_input"/>
												<button type="submit" className="search_icon">
													<i className="ion-ios-search-strong"></i>
												</button>
											</form>
										</div>
										<div className="search_overlay"></div>
									</li>
									<li className="dropdown cart_dropdown">
										<a className="nav-link cart_trigger" href="#" data-bs-toggle="dropdown"><i className="linearicons-cart"></i><span className="cart_count">2</span></a>
										<div className="cart_box dropdown-menu dropdown-menu-right">
											<ul className="cart_list">
												<li>
													<a href="#" className="item_remove"><i className="ion-close"></i></a>
													<a href="#"><img src="/assets/images/cart_thamb1.jpg" alt="cart_thumb1"/>Variable product 001</a>
													<span className="cart_quantity"> 1 x <span className="cart_amount"> <span className="price_symbole">$</span></span>78.00</span>
												</li>
												<li>
													<a href="#" className="item_remove"><i className="ion-close"></i></a>
													<a href="#"><img src="/assets/images/cart_thamb2.jpg" alt="cart_thumb2"/>Ornare sed consequat</a>
													<span className="cart_quantity"> 1 x <span className="cart_amount"> <span className="price_symbole">$</span></span>81.00</span>
												</li>
											</ul>
											<div className="cart_footer">
												<p className="cart_total">
													<strong>Subtotal:</strong>
													<span className="cart_price"> <span className="price_symbole">$</span></span>159.00
												</p>
												<p className="cart_buttons">
													<a href="#" className="btn btn-fill-line rounded-0 view-cart">View Cart</a><a href="#" className="btn btn-fill-out rounded-0 checkout">Checkout</a>
												</p>
											</div>
										</div>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				</header>
		);
	};