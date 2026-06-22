import Image from "next/image";

export const AppHeader = () =>
	{
		return (
				<header className="header_wrap fixed-top header_with_topbar">
					<div className="top-header">
						<div className="container">
							<div className="row align-items-center">
								<div className="col-md-6">
									<div className="d-flex align-items-center justify-content-center justify-content-md-start">
										<div className="lng_dropdown me-2">
											<select name="countries" className="custome_select">
												<option value='en' data-image="assets/images/eng.png" data-title="English">English</option>
												<option value='fn' data-image="assets/images/fn.png" data-title="France">France</option>
												<option value='us' data-image="assets/images/us.png" data-title="United States">United States</option>
											</select>
										</div>
										<div className="me-3">
											<select name="countries" className="custome_select">
												<option value='USD' data-title="USD">USD</option>
												<option value='EUR' data-title="EUR">EUR</option>
												<option value='GBR' data-title="GBR">GBR</option>
											</select>
										</div>
										<ul className="contact_detail text-center text-lg-start">
											<li>
												<i className="ti-mobile"></i><span>123-456-7890</span>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-md-6">
									<div className="text-center text-md-end">
										<ul className="header_list">
											<li>
												<a href="#"><i className="ti-control-shuffle"></i><span>Compare</span></a>
											</li>
											<li>
												<a href="#"><i className="ti-heart"></i><span>Wishlist</span></a>
											</li>
											<li>
												<a href="#"><i className="ti-user"></i><span>Login</span></a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bottom_header dark_skin main_menu_uppercase">
						<div className="container">
							<nav className="navbar navbar-expand-lg">
								<a className="navbar-brand" href="">
									<Image className="logo_dark" src="/assets/images/logo_dark.png" alt="logo" width={182} height={47}/>
									<Image className="logo_light" src="/assets/images/logo_light.png" alt="logo" width={182} height={47}/>
								</a>
								<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-expanded="false">
									<span className="ion-android-menu"></span>
								</button>
								<div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
									<ul className="navbar-nav">
										<li><a className="nav-link" href="#">About Us</a></li>
										<li className="dropdown dropdown-mega-menu">
											<a className="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">Nam</a>
											<div className="dropdown-menu">
												<ul className="mega-menu d-lg-flex">
													<li className="mega-menu-col col-lg-3">
														<ul>
															<li className="dropdown-header">{"Woman's"}</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Vestibulum sed</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec porttitor</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec vitae facilisis</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Curabitur tempus</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Vivamus in tortor</a>
															</li>
														</ul>
													</li>
													<li className="mega-menu-col col-lg-3">
														<ul>
															<li className="dropdown-header">{"Men's"}</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec vitae ante ante</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Etiam ac rutrum</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Quisque condimentum</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Curabitur laoreet</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Vivamus in tortor</a>
															</li>
														</ul>
													</li>
													<li className="mega-menu-col col-lg-3">
														<ul>
															<li className="dropdown-header">{"Kid's"}</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec vitae facilisis</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Quisque condimentum</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Etiam ac rutrum</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec vitae ante ante</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec porttitor</a>
															</li>
														</ul>
													</li>
													<li className="mega-menu-col col-lg-3">
														<ul>
															<li className="dropdown-header">Accessories</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec vitae facilisis</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Quisque condimentum</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Etiam ac rutrum</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec vitae ante ante</a>
															</li>
															<li>
																<a className="dropdown-item nav-link nav_item" href="">Donec porttitor</a>
															</li>
														</ul>
													</li>
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
										</li>
										<li className="dropdown">
											<a className="dropdown-toggle nav-link" href="#" data-bs-toggle="dropdown">Nữ</a>
											<div className="dropdown-menu dropdown-reverse">
												<ul>
													<li>
														<a className="dropdown-item menu-link dropdown-toggler" href="#">Grids</a>
														<div className="dropdown-menu">
															<ul>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">3 columns</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">4 columns</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">Left Sidebar</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">right Sidebar</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">Standard Left Sidebar</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">Standard right Sidebar</a>
																</li>
															</ul>
														</div>
													</li>
													<li>
														<a className="dropdown-item menu-link dropdown-toggler" href="#">Masonry</a>
														<div className="dropdown-menu">
															<ul>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">3 columns</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">4 columns</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">Left Sidebar</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">right Sidebar</a>
																</li>
															</ul>
														</div>
													</li>
													<li>
														<a className="dropdown-item menu-link dropdown-toggler" href="#">Single Post</a>
														<div className="dropdown-menu">
															<ul>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">Default</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">left sidebar</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">slider post</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">video post</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">audio post</a>
																</li>
															</ul>
														</div>
													</li>
													<li>
														<a className="dropdown-item menu-link dropdown-toggler" href="#">List</a>
														<div className="dropdown-menu">
															<ul>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">left sidebar</a>
																</li>
																<li>
																	<a className="dropdown-item nav-link nav_item" href="">right sidebar</a>
																</li>
															</ul>
														</div>
													</li>
												</ul>
											</div>
										</li>
										<li>
											<a className="nav-link nav_item" href="">Contact Us</a>
										</li>
									</ul>
								</div>
								<ul className="navbar-nav attr-nav align-items-center">
									<li>
										<a href="#" className="nav-link search_trigger"><i className="linearicons-magnifier"></i></a>
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
													<a href="#"><img src="assets/images/cart_thamb1.jpg" alt="cart_thumb1"/>Variable product 001</a>
													<span className="cart_quantity"> 1 x <span className="cart_amount"> <span className="price_symbole">$</span></span>78.00</span>
												</li>
												<li>
													<a href="#" className="item_remove"><i className="ion-close"></i></a>
													<a href="#"><img src="assets/images/cart_thamb2.jpg" alt="cart_thumb2"/>Ornare sed consequat</a>
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