export default function Toolbar() {
	return (
			<div className="row align-items-center mb-4 pb-1">
				<div className="col-12">
					<div className="product_header">
						<div className="product_header_left">
							<div className="custom_select">
								<select className="form-control form-control-sm">
									<option value="order">Sắp xếp mặc định</option>
									<option value="popularity">Phổ biến nhất</option>
									<option value="date">Mới nhất</option>
									<option value="price">Giá: Thấp đến cao</option>
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
}