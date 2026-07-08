type Props = {
	goOrders: () => void;
	goAddress: () => void;
	goAccount: () => void;
};

export default function Dashboard({
	goOrders,
	goAddress,
	goAccount,
}: Props) {
	return (
			<div className="card">
				<div className="card-header">
					<h3>Bảng điều khiển</h3>
				</div>

				<div className="card-body">
					<p>
						Từ bảng điều khiển tài khoản, bạn có thể dễ dàng xem{" "}
						<button
								className="btn btn-link p-0"
								onClick={goOrders}
						>
							các đơn hàng gần đây
						</button>
						, quản lý{" "}
						<button
								className="btn btn-link p-0"
								onClick={goAddress}
						>
							địa chỉ giao hàng và địa chỉ thanh toán
						</button>{" "}
						hoặc{" "}
						<button
								className="btn btn-link p-0"
								onClick={goAccount}
						>
							cập nhật thông tin và đổi mật khẩu tài khoản
						</button>
						.
					</p>
				</div>
			</div>
	);
}