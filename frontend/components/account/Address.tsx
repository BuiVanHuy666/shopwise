export default function Address() {
	return (
			<div className="row">
				<div className="col-lg-6">
					<div className="card mb-3">
						<div className="card-header">
							<h3>Địa chỉ thanh toán</h3>
						</div>

						<div className="card-body">
							<address>
								Số 15
								<br />
								Đường số 1
								<br />
								Khu C
								<br />
								Phường ABC
								<br />
								Quận XYZ
								<br />
								TP. Hồ Chí Minh
							</address>

							<p>Việt Nam</p>

							<button className="btn btn-fill-out">
								Chỉnh sửa
							</button>
						</div>
					</div>
				</div>

				<div className="col-lg-6">
					<div className="card">
						<div className="card-header">
							<h3>Địa chỉ giao hàng</h3>
						</div>

						<div className="card-body">
							<address>
								Số 15
								<br />
								Đường số 1
								<br />
								Khu C
								<br />
								Phường ABC
								<br />
								Quận XYZ
								<br />
								TP. Hồ Chí Minh
							</address>

							<p>Việt Nam</p>

							<button className="btn btn-fill-out">
								Chỉnh sửa
							</button>
						</div>
					</div>
				</div>
			</div>
	);
}