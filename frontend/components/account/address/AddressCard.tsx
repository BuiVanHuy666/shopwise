import { Address } from "@/types/address";

interface AddressCardProps {
	address: Address;
	onEdit: (address: Address) => void;
	onDelete: (id: number | string) => void;
}

export const AddressCard = ({ address, onEdit, onDelete }: AddressCardProps) => {
	return (
			<div className="card mb-4">
				<div className="card-header d-flex justify-content-between align-items-center">
					<h3>{address.is_default ? '📍 Địa chỉ mặc định' : 'Địa chỉ giao hàng'}</h3>
				</div>

				<div className="card-body">
					<address>
						<strong>{address.receiver_name}</strong>
						<br />
						Điện thoại: {address.receiver_phone_number}
						<br />
						<br />
						{address.address_detail}
						<br />
						{address.ward.label}
						<br />
						{address.province.label}
					</address>

					<p>Việt Nam</p>

					<div className="d-flex gap-2">
						<button
								className="btn btn-fill-out btn-sm"
								onClick={() => onEdit(address)}
						>
							Chỉnh sửa
						</button>
						<button
								className="btn btn-danger btn-sm"
								onClick={() => onDelete(address.id)}
						>
							Xóa
						</button>
					</div>
				</div>
			</div>
	);
};