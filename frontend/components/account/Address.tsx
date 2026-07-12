'use client';

import { useState } from 'react';
import { Address } from "@/types/address";
import { AddressCard } from "@/components/account/address/AddressCard";
import { AddressModal } from "@/components/account/address/AddressModal";
import { toast } from "react-toastify";
import { destroyAction } from "@/app/actions/address";
import { toastConfirm } from "@/components/shared/utils/ToastConfirm";
import useSWR from "swr";
import { fetcher } from "@/utils/helper";

export default function AddressList() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingAddress, setEditingAddress] = useState<Address | null>(null);
	const { data: addresses, isLoading, mutate } = useSWR<Address[]>('/api/addresses', fetcher);

	if (isLoading) return <div>Đang tải dữ liệu...</div>;


	const handleOpenCreateModal = () => {
		if (addresses && addresses.length >= 10) {
			toast.error("Bạn chỉ được tạo tối đa 10 địa chỉ giao hàng.");
			return;
		}
		setEditingAddress(null);
		setIsModalOpen(true);
	};

	const handleOpenEditModal = (address: Address) => {
		setEditingAddress(address);
		setIsModalOpen(true);
	};

	const handleDelete = async (id: number | string) => {
		const isConfirmed = await toastConfirm("Bạn có chắc chắn muốn xóa địa chỉ này không?");

		if (isConfirmed) {
			try {
				const res = await destroyAction(id);
				if (res?.status === "success") {
					toast.success(res.message);
					await mutate();
				} else {
					toast.error(res?.message || "Xóa thất bại!");
				}
			} catch {
				toast.error("Đã xảy ra lỗi khi xóa.");
			}
		}
	};

	return (
			<>
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h4>Danh sách địa chỉ</h4>
					<button className="btn btn-fill-out btn-sm" onClick={handleOpenCreateModal}>
						+ Thêm địa chỉ mới
					</button>
				</div>

				{(!addresses || addresses.length === 0) && !isLoading ? (
						<div className="alert alert-warning">
							Bạn chưa có địa chỉ giao hàng nào. Vui lòng thêm mới!
						</div>
				) : (
						<div className="row">
							{addresses && addresses.map((addressItem) => (
									<div className="col-lg-6" key={addressItem.id}>
										<AddressCard
												address={addressItem}
												onEdit={handleOpenEditModal}
												onDelete={handleDelete}
										/>
									</div>
							))}
						</div>
				)}

				{isModalOpen && (
						<AddressModal
								address={editingAddress}
								onClose={() => setIsModalOpen(false)}
								onSuccess={() => {setIsModalOpen(false);}}
						/>
				)}
			</>
	);
}