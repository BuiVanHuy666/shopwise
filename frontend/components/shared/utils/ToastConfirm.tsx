import { toast } from 'react-toastify';

export const toastConfirm = (message: string): Promise<boolean> => {
	return new Promise((resolve) => {
		toast(
				({ closeToast }) => (
						<div>
							<h6 className="mb-2 text-dark fw-bold">Xác nhận</h6>
							<p className="mb-3 text-dark">{message}</p>
							<div className="d-flex justify-content-end gap-2">
								<button
										className="btn btn-secondary btn-sm"
										onClick={() => {
											resolve(false);
											if (closeToast) closeToast();
										}}
								>
									Hủy bỏ
								</button>
								<button
										className="btn btn-danger btn-sm"
										onClick={() => {
											resolve(true);
											if (closeToast) closeToast();
										}}
								>
									Đồng ý
								</button>
							</div>
						</div>
				),
				{
					position: "top-center",
					autoClose: false,
					closeOnClick: false,
					draggable: false,
					closeButton: false,
					onClose: () => resolve(false),
				}
		);
	});
};