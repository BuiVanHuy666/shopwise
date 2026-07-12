'use client';

import { UserDetail } from "@/types/user";
import { useState } from "react";
import { EditProfileModal } from "@/components/account/profile/EditProfileModal";
import { UpdatePasswordModal } from "@/components/account/profile/UpdatePasswordModal";
import { getUserGender } from "@/utils/helper";
import { useRouter } from "next/navigation";

export default function AccountDetail({ user }: { user: UserDetail }) {
	const [isEditingModal, setIsEditingModal] = useState(false);
	const [isUpdatePasswordModal, setIsUpdatePasswordModal] = useState(false);

	const router = useRouter();

	const handleSuccess = () => {
		setIsEditingModal(false);
		setIsUpdatePasswordModal(false);
		router.refresh();
	};

	return (
			<>
				<div className="account-detail-wrapper">
					<div className="mb-5 pb-2">
						<h3 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>
							Thông tin tài khoản
						</h3>

						<div className="row mb-3 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Họ và tên</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6">{ user.name }</div>
						</div>

						<div className="row mb-3 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Số điện thoại</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6">{ user.phone_number ?? "Chưa cập nhật" }</div>
						</div>

						<div className="row mb-3 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Giới tính</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6">{ getUserGender(user.gender) }</div>
						</div>

						<div className="row mb-3 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Ngày sinh</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6">{ user.date_of_birth ?? "Chưa cập nhật" }</div>
						</div>

						<div className="row mb-3 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Chiều cao</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6">{ user.height ? `${user.height} cm` : "Chưa cập nhật" }</div>
						</div>

						<div className="row mb-4 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Cân nặng</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6">{ user.weight ? `${user.weight} kg` : "Chưa cập nhật" }</div>
						</div>

						<div className="row mb-4 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Ngày tham gia</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6">{ user.joined_at ? user.joined_at  : "Chưa cập nhật" }</div>
						</div>

						<button onClick={() => setIsEditingModal(true)}
						        className="btn btn-outline-dark rounded-pill px-4 py-2 mt-2 fw-semibold"
						        style={{ borderWidth: '1.5px', fontSize: '0.9rem' }}
						>
							CẬP NHẬT
						</button>
					</div>

					<div className="pt-3">
						<h3 className="fw-bold text-dark mb-4" style={{ fontSize: '1.75rem' }}>
							Thông tin đăng nhập
						</h3>

						<div className="row mb-3 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Email</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6">{ user.email }</div>
						</div>

						<div className="row mb-4 align-items-center">
							<div className="col-5 col-md-4 text-secondary fs-6">Mật khẩu</div>
							<div className="col-7 col-md-8 text-dark fw-normal fs-6" style={{ letterSpacing: '2px' }}>
								••••••••••••••
							</div>
						</div>

						<button onClick={() => setIsUpdatePasswordModal(true)}
						        className="btn btn-outline-dark rounded-pill px-4 py-2 mt-2 fw-semibold"
						        style={{ borderWidth: '1.5px', fontSize: '0.9rem' }}
						>
							CẬP NHẬT
						</button>
					</div>
				</div>

				{
						isEditingModal && (
								<EditProfileModal
										user={user}
										onClose={() => setIsEditingModal(false)}
										onSuccess={handleSuccess}
								/>
						)
				}

				{
						isUpdatePasswordModal && (
								<UpdatePasswordModal
										onClose={() => setIsUpdatePasswordModal(false)}
										onSuccess={handleSuccess}
								/>
						)
				}
			</>
	);
}