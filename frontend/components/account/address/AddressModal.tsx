'use client';

import { useState, useEffect, useActionState } from 'react';
import { toast } from "react-toastify";
import { createAction, updateAction } from "@/app/actions/address";
import { Location } from "@/types/location";
import { Address } from "@/types/address";
import useSWR from "swr";
import { fetcher } from "@/utils/helper";

interface AddressModalProps {
	address?: Address | null;
	onClose: () => void;
	onSuccess: () => void;
}

export const AddressModal = ({ address, onClose, onSuccess }: AddressModalProps) => {
	const [selectedProvince, setSelectedProvince] = useState<string>(address?.province?.code?.toString() || '');

	const { data: provinces, isLoading: isProvincesLoading } = useSWR<Location[]>('/api/locations', fetcher, {
		// 1. Không gọi lại API khi Component được mount lại (chuyển tab) nếu đã có cache
		revalidateIfStale: false,

		// 2. Không gọi lại API khi người dùng click chuột sang tab trình duyệt khác rồi quay lại
		revalidateOnFocus: false,
	});

	const { data: wards, isLoading: isWardsLoading } = useSWR<Location[]>(
			selectedProvince ? `/api/locations?province_code=${selectedProvince}` : null, fetcher
	);

	const actionToUse = address ? updateAction.bind(null, address.id) : createAction;
	const [state, formAction, isPending] = useActionState(actionToUse, null);

	useEffect(() => {
		if (state?.status === "success") {
			toast.success(state.message);
			onSuccess();
		}
	}, [state, onSuccess]);

	return (
			<div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex={-1}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form action={formAction} noValidate>
							<div className="modal-header">
								<h5 className="modal-title">{address ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h5>
								<button type="button" className="btn-close" onClick={onClose} disabled={isPending}></button>
							</div>

							<div className="modal-body">
								{state?.status === "error" && !state.errors && (
										<div className="alert alert-danger">
											{state.message}
										</div>
								)}

								<div className="form-group mb-3">
									<label>Họ và tên người nhận</label>
									<input
											type="text"
											className={`form-control ${state?.errors?.receiver_name ? 'is-invalid' : ''}`}
											name="receiver_name"
											disabled={isPending}
											defaultValue={state?.oldValues?.receiver_name as string ?? address?.receiver_name ?? ""}
									/>
									{state?.errors?.receiver_name && (
											<div className="invalid-feedback d-block">{state.errors.receiver_name[0]}</div>
									)}
								</div>

								<div className="form-group mb-3">
									<label>Số điện thoại</label>
									<input
											type="text"
											className={`form-control ${state?.errors?.receiver_phone_number ? 'is-invalid' : ''}`}
											name="receiver_phone_number"
											disabled={isPending}
											defaultValue={state?.oldValues?.receiver_phone_number as string ?? address?.receiver_phone_number ?? ""}
									/>
									{state?.errors?.receiver_phone_number && (
											<div className="invalid-feedback d-block">{state.errors.receiver_phone_number[0]}</div>
									)}
								</div>

								<div className="row">
									<div className="col-md-6 form-group mb-3">
										<label>Tỉnh/Thành phố</label>
										<select
												key={`province-${state?.oldValues?.province_code ?? address?.province?.code ?? 'empty'}-${provinces?.length || 0}`}
												className={`form-control ${state?.errors?.province_code ? 'is-invalid' : ''}`}
												name="province_code"
												disabled={isProvincesLoading || isPending}
												defaultValue={state?.oldValues?.province_code as string ?? address?.province?.code ?? ""}
												onChange={(e) => setSelectedProvince(e.target.value)}
										>
											<option value="">{isProvincesLoading ? 'Đang tải dữ liệu...' : 'Chọn Tỉnh/Thành phố'}</option>
											{provinces?.map(p => (
													<option key={p.code} value={p.code}>{p.name}</option>
											))}
										</select>
										{state?.errors?.province_code && (
												<div className="invalid-feedback d-block">{state.errors.province_code[0]}</div>
										)}
									</div>

									<div className="col-md-6 form-group mb-3">
										<label>Phường/Xã</label>
										<select
												key={`ward-${state?.oldValues?.ward_code ?? address?.ward?.code ?? 'empty'}-${wards?.length || 0}`}
												className={`form-control ${state?.errors?.ward_code ? 'is-invalid' : ''}`}
												name="ward_code"
												disabled={!selectedProvince || isWardsLoading || isPending}
												defaultValue={state?.oldValues?.ward_code as string ?? address?.ward?.code ?? ""}
										>
											<option value="">{isWardsLoading ? 'Đang tải dữ liệu...' : 'Chọn Phường/Xã'}</option>
											{wards?.map(w => (
													<option key={w.code} value={w.code}>{w.name}</option>
											))}
										</select>
										{state?.errors?.ward_code && (
												<div className="invalid-feedback d-block">{state.errors.ward_code[0]}</div>
										)}
									</div>
								</div>

								<div className="form-group mb-3">
									<label>Địa chỉ cụ thể (Số nhà, tên đường...)</label>
									<input
											type="text"
											className={`form-control ${state?.errors?.address_detail ? 'is-invalid' : ''}`}
											name="address_detail"
											disabled={isPending}
											defaultValue={state?.oldValues?.address_detail as string ?? address?.address_detail ?? ""}
									/>
									{state?.errors?.address_detail && (
											<div className="invalid-feedback d-block">{state.errors.address_detail[0]}</div>
									)}
								</div>

								<div className="form-check mt-3">
									<input
											className="form-check-input"
											type="checkbox"
											id="is_default"
											name="is_default"
											value="true"
											disabled={isPending}
											defaultChecked={state?.oldValues?.is_default as boolean ?? address?.is_default ?? false}
									/>
									<label className="form-check-label" htmlFor="is_default">
										Đặt làm địa chỉ mặc định
									</label>
								</div>
							</div>

							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={onClose} disabled={isPending}>
									Hủy bỏ
								</button>
								<button type="submit" className="btn btn-fill-out" disabled={isPending}>
									{isPending ? (
											<>
												<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
												Đang lưu...
											</>
									) : (
											address ? 'Cập nhật' : 'Lưu địa chỉ'
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
	);
};