'use client';

import { useActionState, useEffect, useState } from 'react';
import { UserDetail } from "@/types/user";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { updateProfileAction } from "@/app/actions/user";
import { toast } from "react-toastify";

interface EditProfileModalProps {
	user: UserDetail;
	onClose: () => void;
	onSuccess: () => void;
}

const getDaysInMonth = (month: string, year: string) => {
	if (!month) return 31;
	const y = year ? parseInt(year) : new Date().getFullYear();
	const m = parseInt(month);
	return new Date(y, m, 0).getDate();
};

export const EditProfileModal = ({
	user,
	onClose,
	onSuccess
}: EditProfileModalProps) => {
	const [state, formAction, isPending] = useActionState(updateProfileAction, null);

	const [name, setName] = useState(user.name || '');
	const [phone, setPhone] = useState(user.phone_number || '');

	const [dob, setDob] = useState(() => {
		if (!user.date_of_birth) return { day: '', month: '', year: '' };

		const [day, month, year] = user.date_of_birth.split('/');

		return {
			day: Number(day).toString(),
			month: Number(month).toString(),
			year: year
		};
	});

	const [gender, setGender] = useState<number | null>(user.gender ?? null);

	const [height, setHeight] = useState<number>(user.height ?? 170);
	const [weight, setWeight] = useState<number>(user.weight ?? 60);

	const maxDays = getDaysInMonth(dob.month, dob.year);

	useEffect(() => {
		if (dob.day && parseInt(dob.day) > maxDays) {
			setDob(prev => ({
				...prev,
				day: maxDays.toString()
			}));
		}
	}, [maxDays, dob.day]);

	useEffect(() => {
		if (state?.oldValues && state.status === "error") {
			if (state.oldValues.day || state.oldValues.month || state.oldValues.year) {
				setDob({
					day: state.oldValues.day as string || '',
					month: state.oldValues.month as string || '',
					year: state.oldValues.year as string || ''
				});
			}
		}
	}, [state]);

	useEffect(() => {
		if (state?.status === "success") {
			toast.success(state.message);
			onSuccess();
		} else if (state?.status === "error" && !state.errors) {
			toast.error(state.message || "Cập nhật thất bại.");
		}
	}, [state, onSuccess]);

	return (
			<div className="modal d-block" style={{
				backgroundColor: 'rgba(0,0,0,0.5)',
				zIndex: 1050
			}} tabIndex={-1}>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<form action={formAction} noValidate>
							<div className="modal-header">
								<h5 className="modal-title">Chỉnh sửa thông tin tài khoản</h5>
								<button type="button" className="btn-close" onClick={onClose} disabled={isPending}></button>
							</div>

							<div className="modal-body">
								{state?.status === "error" && !state.errors && (
										<div className="alert alert-danger">{state.message}</div>
								)}

								<div className="form-floating mb-3">
									<input type="text" className={`form-control ${state?.errors?.name ? 'is-invalid' : ''}`} id="nameInput" name="name" placeholder="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} disabled={isPending}/>
									<label htmlFor="nameInput">Họ và tên</label>
									{state?.errors?.name &&
										<div className="invalid-feedback">{state.errors.name[0]}</div>}
								</div>

								{/* DOB */}
								<div className="row mb-3">
									<div className="col-4">
										<div className="form-floating">
											<select className="form-select" name="day" value={dob.day} onChange={(e) => setDob({
												...dob,
												day: e.target.value
											})} disabled={isPending}>
												<option value="">--</option>
												{Array.from({length: maxDays}, (_, i) =>
														<option key={i + 1} value={(i + 1).toString()}>{i + 1}</option>)}
											</select>
											<label>Ngày</label>
										</div>
									</div>
									<div className="col-4">
										<div className="form-floating">
											<select className="form-select" name="month" value={dob.month} onChange={(e) => setDob({
												...dob,
												month: e.target.value
											})} disabled={isPending}>
												<option value="">--</option>
												{Array.from({length: 12}, (_, i) =>
														<option key={i + 1} value={(i + 1).toString()}>{i + 1}</option>)}
											</select>
											<label>Tháng</label>
										</div>
									</div>
									<div className="col-4">
										<div className="form-floating">
											<select className="form-select" name="year" value={dob.year} onChange={(e) => setDob({
												...dob,
												year: e.target.value
											})} disabled={isPending}>
												<option value="">--</option>
												{Array.from({length: 100}, (_, i) =>
														<option key={i} value={(2026 - i).toString()}>{2026 - i}</option>)}
											</select>
											<label>Năm</label>
										</div>
									</div>
								</div>

								<div className="mb-4 d-flex gap-4">
									{[{
										id: 1,
										label: 'Nam'
									}, {
										id: 0,
										label: 'Nữ'
									}, {
										id: 2,
										label: 'Khác'
									}].map(g => (
											<div className="form-check" key={g.id}>
												<input className="form-check-input" type="radio" name="gender" id={`g${g.id}`} value={g.id} checked={gender === g.id} onChange={() => setGender(g.id)} disabled={isPending}/>
												<label className="form-check-label" htmlFor={`g${g.id}`}>{g.label}</label>
											</div>
									))}
								</div>

								<div className="form-floating mb-4">
									<input type="tel" className={`form-control ${state?.errors?.phone_number ? 'is-invalid' : ''}`} id="phoneInput" name="phone_number" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isPending}/>
									<label htmlFor="phoneInput">Số điện thoại</label>
									{state?.errors?.phone_number &&
										<div className="invalid-feedback">{state.errors.phone_number[0]}</div>}
								</div>

								<div className="form-group mb-4">
									<div className="d-flex justify-content-between mb-1">
										<label>Chiều cao</label><span>{height} cm</span>
									</div>
									<Slider min={100} max={250} value={height} onChange={(val) => setHeight(val as number)} disabled={isPending}/>
									<input type="hidden" name="height" value={height}/>
								</div>

								<div className="form-group mb-3">
									<div className="d-flex justify-content-between mb-1">
										<label>Cân nặng</label><span>{weight} kg</span>
									</div>
									<Slider min={30} max={150} value={weight} onChange={(val) => setWeight(val as number)} disabled={isPending}/>
									<input type="hidden" name="weight" value={weight}/>
								</div>
							</div>

							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={onClose} disabled={isPending}>Hủy bỏ</button>
								<button type="submit" className="btn btn-fill-out" disabled={isPending}>
									{isPending ? 'Đang lưu...' : 'Cập nhật'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
	);
};