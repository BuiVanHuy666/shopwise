export default function Orders() {
	return (
			<div className="card">
				<div className="card-header">
					<h3>Đơn hàng của tôi</h3>
				</div>

				<div className="card-body">
					<div className="table-responsive">
						<table className="table">
							<thead>
							<tr>
								<th>Mã đơn</th>
								<th>Ngày đặt</th>
								<th>Trạng thái</th>
								<th>Tổng tiền</th>
								<th>Thao tác</th>
							</tr>
							</thead>

							<tbody>
							<tr>
								<td>#1234</td>
								<td>15/03/2020</td>
								<td>Đang xử lý</td>
								<td>78.00 USD (1 sản phẩm)</td>
								<td>
									<button className="btn btn-fill-out btn-sm">
										Xem chi tiết
									</button>
								</td>
							</tr>

							<tr>
								<td>#2366</td>
								<td>20/06/2020</td>
								<td>Hoàn thành</td>
								<td>81.00 USD (1 sản phẩm)</td>
								<td>
									<button className="btn btn-fill-out btn-sm">
										Xem chi tiết
									</button>
								</td>
							</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
	);
}