"use client";

import { useState } from "react";
import Dashboard from "@/components/account/Dashboard";
import Orders from "@/components/account/Orders";
import Address from "@/components/account/Address/Address";
import AccountDetail from "@/components/account/AccountDetail";
import { User } from "@/types/user";

type TabId = "dashboard" | "orders" | "address" | "account";

interface TabConfig {
	id: TabId;
	label: string;
	icon: string;
}

const TABS: TabConfig[] = [
	{ id: "dashboard", label: "Bảng điều khiển", icon: "ti-layout-grid2" },
	{ id: "orders", label: "Đơn hàng của tôi", icon: "ti-shopping-cart-full" },
	{ id: "address", label: "Sổ địa chỉ", icon: "ti-location-pin" },
	{ id: "account", label: "Thông tin tài khoản", icon: "ti-user" },
];

interface AccountClientProps {
	initialUser: User;
}

export function Index({ initialUser }: AccountClientProps) {
	const [activeTab, setActiveTab] = useState<TabId>("dashboard");

	const renderContent = () => {
		switch (activeTab) {
			case "dashboard":
				return (
						<Dashboard
								goOrders={() => setActiveTab("orders")}
								goAddress={() => setActiveTab("address")}
								goAccount={() => setActiveTab("account")}
						/>
				);
			case "orders":
				return <Orders />;
			case "address":
				return <Address />;
			case "account":
				return <AccountDetail />;
			default:
				return null;
		}
	};

	return (
			<section className="section py-5 bg-light">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-4 mb-4 mb-md-0">
							<div className="card border-0 shadow-sm rounded overflow-hidden">
								<div className="card-header bg-white border-bottom py-4 text-center">
									<div className="mb-3 d-flex justify-content-center">
										<div
												className="d-flex align-items-center justify-content-center bg-danger text-white rounded-circle shadow-sm"
												style={{ width: "64px", height: "64px", fontSize: "28px", fontWeight: "bold" }}
										>
											{initialUser.name.charAt(0)}
										</div>
									</div>
									<span className="text-muted small">Xin chào,</span>
									<h5 className="mb-0 mt-1 font-weight-bold text-dark">
										{initialUser.name}
									</h5>
								</div>

								<div className="dashboard_menu">
									<ul className="nav flex-column" role="tablist">
										{TABS.map((tab) => (
												<li className="nav-item" key={tab.id}>
													<button
															className={`nav-link w-100 text-start d-flex align-items-center py-3 px-4 border-bottom m-0 ${
																	activeTab === tab.id
																			? "active bg-danger text-white"
																			: "text-dark bg-white"
															}`}
															style={{ transition: "all 0.3s ease", border: "none", borderRadius: "0" }}
															onClick={() => setActiveTab(tab.id)}
													>
														<i className={`${tab.icon} me-3`} style={{ fontSize: "1.2rem" }}></i>
														<span className="font-weight-medium">{tab.label}</span>
													</button>
												</li>
										))}
									</ul>
								</div>
							</div>
						</div>

						<div className="col-lg-9 col-md-8">
							<div className="card border-0 shadow-sm rounded h-100">
								<div className="card-body p-4 p-lg-5">
									{renderContent()}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
	);
}