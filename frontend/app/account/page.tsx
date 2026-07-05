"use client";

import { useState } from "react";
import Dashboard from "@/components/account/Dashboard";
import Orders from "@/components/account/Orders";
import Address from "@/components/account/Address";
import AccountDetail from "@/components/account/AccountDetail";

type Tab = "dashboard" | "orders" | "address" | "account";

export default function AccountPage() {
	const [activeTab, setActiveTab] = useState<Tab>("dashboard");

	return (
			<section className="section">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-4">
							<div className="dashboard_menu">
								<ul className="nav flex-column">
									<li className="nav-item">
										<button
												className={`nav-link ${
														activeTab === "dashboard" ? "active" : ""
												}`}
												onClick={() => setActiveTab("dashboard")}
										>
											Bảng điều khiển
										</button>
									</li>

									<li className="nav-item">
										<button
												className={`nav-link ${
														activeTab === "orders" ? "active" : ""
												}`}
												onClick={() => setActiveTab("orders")}
										>
											Đơn hàng của tôi
										</button>
									</li>

									<li className="nav-item">
										<button
												className={`nav-link ${
														activeTab === "address" ? "active" : ""
												}`}
												onClick={() => setActiveTab("address")}
										>
											Sổ địa chỉ
										</button>
									</li>

									<li className="nav-item">
										<button
												className={`nav-link ${
														activeTab === "account" ? "active" : ""
												}`}
												onClick={() => setActiveTab("account")}
										>
											Thông tin tài khoản
										</button>
									</li>
								</ul>
							</div>
						</div>

						<div className="col-lg-9 col-md-8">
							{activeTab === "dashboard" && (
									<Dashboard
											goOrders={() => setActiveTab("orders")}
											goAddress={() => setActiveTab("address")}
											goAccount={() => setActiveTab("account")}
									/>
							)}

							{activeTab === "orders" && <Orders />}

							{activeTab === "address" && <Address />}

							{activeTab === "account" && <AccountDetail />}
						</div>
					</div>
				</div>
			</section>
	);
}