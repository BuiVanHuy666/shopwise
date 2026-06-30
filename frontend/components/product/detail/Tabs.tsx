"use client";

import React, { useState, useRef, useEffect } from 'react';

type Props = {
	description?: string;
	additionalInfo?: {
		[key: string]: string;
	};
}

export default function Tabs({ description, additionalInfo }: Props) {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const [needsCollapse, setNeedsCollapse] = useState<boolean>(false);

	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			if (contentRef.current.scrollHeight > 300) {
				setNeedsCollapse(true);
			}
		}
	}, [description]);

	return (
			<div className="tab-style3">
				<ul className="nav nav-tabs" role="tablist">
					<li className="nav-item">
						<a
								className="nav-link active"
								id="Description-tab"
								data-bs-toggle="tab"
								href="#Description"
								role="tab"
								aria-controls="Description"
								aria-selected="true"
						>
							Mô tả sản phẩm
						</a>
					</li>

					<li className="nav-item">
						<a
								className="nav-link"
								id="Additional-info-tab"
								data-bs-toggle="tab"
								href="#Additional-info"
								role="tab"
								aria-controls="Additional-info"
								aria-selected="false"
						>
							Đặc điểm nổi bật
						</a>
					</li>

					<li className="nav-item">
						<a
								className="nav-link"
								id="Reviews-tab"
								data-bs-toggle="tab"
								href="#Reviews"
								role="tab"
								aria-controls="Reviews"
								aria-selected="false"
						>
							Đánh giá (2)
						</a>
					</li>
				</ul>
				<div className="tab-content shop_info_tab">

					<div className="tab-pane fade show active" id="Description" role="tabpanel" aria-labelledby="Description-tab">
						{description && (
								<div className="relative">
									<div
											ref={contentRef}
											className={`description-content ${needsCollapse && !isExpanded ? 'overflow-hidden' : ''}`}
											style={{
												maxHeight: needsCollapse && !isExpanded ? '400px' : 'none',
											}}
									>
										<div dangerouslySetInnerHTML={{ __html: description }} />
									</div>

									{needsCollapse && !isExpanded && (
											<div
													className="absolute bottom-0 left-0 w-full pointer-events-none"
													style={{
														background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))'
													}}
											/>
									)}

									{needsCollapse && (
											<div className="text-center mt-4">
												<button
														onClick={() => setIsExpanded(!isExpanded)}
														className="px-6 py-2 bg-white border border-gray-300 rounded-md font-medium text-gray-700 hover:text-[#ff324d] hover:border-[#ff324d] transition-colors relative z-10"
												>
													{isExpanded ? 'Thu gọn' : 'Xem thêm'}
												</button>
											</div>
									)}
								</div>
						)}
					</div>

					<div
							className="tab-pane fade"
							id="Additional-info"
							role="tabpanel"
							aria-labelledby="Additional-info-tab"
					>
						<table className="table table-bordered">
							<tbody>
							{
									additionalInfo && Object.entries(additionalInfo).map(([key, value], index: number) => (
											<tr key={`${key}-${index}`}>
												<td>{key}</td>
												<td>{value}</td>
											</tr>
									))
							}
							</tbody>
						</table>
					</div>

					<div
							className="tab-pane fade"
							id="Reviews"
							role="tabpanel"
							aria-labelledby="Reviews-tab"
					>
						<div className="comments">
							<h5 className="product_tab_title">
								2 Review For
								<span>Blue Dress For Woman</span>
							</h5>
							<ul className="list_none comment_list mt-4">
								<li>
									<div className="comment_img">
										<img src="/assets/images/user1.jpg" alt="user1" />
									</div>
									<div className="comment_block">
										<div className="rating_wrap">
											<div className="rating">
												<div
														className="product_rate"
														style={{ width: "80%" }}
												/>
											</div>
										</div>
										<p className="customer_meta">
											<span className="review_author">Alea Brooks</span>
											<span className="comment-date">March 5, 2018</span>
										</p>
										<div className="description">
											<p>
												Lorem Ipsumin gravida nibh vel velit auctor
												aliquet. Aenean sollicitudin, lorem quis bibendum
												auctor, nisi elit consequat ipsum, nec sagittis
												sem nibh id elit. Duis sed odio sit amet nibh
												vulputate
											</p>
										</div>
									</div>
								</li>
								<li>
									<div className="comment_img">
										<img src="/assets/images/user2.jpg" alt="user2" />
									</div>
									<div className="comment_block">
										<div className="rating_wrap">
											<div className="rating">
												<div
														className="product_rate"
														style={{ width: "60%" }}
												/>
											</div>
										</div>
										<p className="customer_meta">
											<span className="review_author">Grace Wong</span>
											<span className="comment-date">June 17, 2018</span>
										</p>
										<div className="description">
											<p>
												It is a long established fact that a reader will
												be distracted by the readable content of a page
												when looking at its layout. The point of using
												Lorem Ipsum is that it has a more-or-less normal
												distribution of letters
											</p>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div className="review_form field_form">
							<h5>Add a review</h5>
							<form className="row mt-3">
								<div className="form-group col-12 mb-3">
									<div className="star_rating">
                          <span data-value={1}>
                            <i className="far fa-star" />
                          </span>
										<span data-value={2}>
                            <i className="far fa-star" />
                          </span>
										<span data-value={3}>
                            <i className="far fa-star" />
                          </span>
										<span data-value={4}>
                            <i className="far fa-star" />
                          </span>
										<span data-value={5}>
                            <i className="far fa-star" />
                          </span>
									</div>
								</div>
								<div className="form-group col-12 mb-3">
                        <textarea
		                        required
		                        placeholder="Your review *"
		                        className="form-control"
		                        name="message"
		                        rows={4}
		                        defaultValue={""}
                        />
								</div>
								<div className="form-group col-md-6 mb-3">
									<input
											required
											placeholder="Enter Name *"
											className="form-control"
											name="name"
											type="text"
									/>
								</div>
								<div className="form-group col-md-6 mb-3">
									<input
											required
											placeholder="Enter Email *"
											className="form-control"
											name="email"
											type="email"
									/>
								</div>
								<div className="form-group col-12 mb-3">
									<button
											type="submit"
											className="btn btn-fill-out"
											name="submit"
											value="Submit"
									>
										Submit Review
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
	);
}