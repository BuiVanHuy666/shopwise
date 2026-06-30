"use client";

import React, { useState } from "react";
import { ProductColorOption, ProductVariant, SizeOption } from "@/types/product";

type Props = {
	name: string,
	price: number,
	salePrice?: number,
	discountPercent: number,
	headline: string,
	categoryName: string,
	colorOptions: ProductColorOption[],
	variants: ProductVariant[],
	sizeOptions: SizeOption[],
	selectedColorId?: number | undefined,
	onColorChange: (colorId: number) => void,
}

export default function Info({
	name,
	price,
	salePrice,
	discountPercent,
	headline,
	categoryName,
	colorOptions,
	variants,
	sizeOptions,
	selectedColorId,
	onColorChange
}: Props)
	{
		console.log(colorOptions);
		const [selectedSize, setSelectedSize] = useState<number | undefined>(sizeOptions?.[0]?.id);

		const currentColor = colorOptions?.find(c => c.id === selectedColorId);
		const currentSize = sizeOptions?.find(s => s.id === selectedSize);

		return (
				<div className="pr_detail">
					<div className="product_description">
						<h4 className="product_title">{name}</h4>
						<div className="product_price">
							<span className="price">{salePrice ?? price}</span>
							{price && price !== salePrice && (
									<del>{price}</del>
							)}
							<div className="on_sale">
								<span>{discountPercent} % OFF</span>
							</div>
						</div>
						<div className="rating_wrap">
							<div className="rating">
								<div className="product_rate" style={{width: "80%"}}/>
							</div>
							<span className="rating_num">(21)</span>
						</div>
						<div className="pr_desc">
							<p>{headline}</p>
						</div>
						<div className="product_sort_info">
							<ul>
								<li>
									<i className="linearicons-phone-bubble"/>Hotline 1900.27.27.37 hỗ trợ từ 8h30 - 22h
								</li>
								<li>
									<i className="linearicons-sync"/>60 ngày đổi trả vì bất kỳ lý do gì
								</li>
								<li>
									<i className="linearicons-bag-dollar"/>Đến tận nơi nhận hàng trả, hoàn tiền 2-3 ngày (trừ T7, CN)
								</li>
							</ul>
						</div>

						{colorOptions && colorOptions.length > 0 && (
								<div className="pr_switch_wrap" style={{marginBottom: '25px'}}>
									<div style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '12px'
									}}>
			                            <span className="switch_lable" style={{
				                            fontWeight: 600,
				                            fontSize: '16px',
				                            marginRight: '5px'
			                            }}>
			                                Màu sắc:
			                            </span>
										<span style={{
											fontSize: '16px',
											color: '#555'
										}}>
			                                {currentColor?.name}
			                            </span>
									</div>

									<div className="product_color_switch" style={{
										display: 'flex',
										gap: '10px',
										flexWrap: 'wrap'
									}}>
										{colorOptions.map((colorOption) =>
										{
											const isActive = selectedColorId === colorOption.id;
											return (
													<span
															key={colorOption.id}
															onClick={() => onColorChange(colorOption.id)}
															title={colorOption.name}
															style={{
																margin: 0,
																cursor: 'pointer',
																width: '60px',
																height: '35px',
																borderRadius: '30px',
																backgroundColor: colorOption.hex,
																border: isActive ? '2px solid #2563EB' : '2px solid #ddd',
																padding: '2px',
																backgroundClip: 'content-box',
															}}
													/>
											);
										})}
									</div>
								</div>
						)}

						{sizeOptions && sizeOptions.length > 0 && (
								<div className="pr_switch_wrap" style={{marginBottom: '25px'}}>
									<div style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: '12px'
									}}>
										<div>
                <span className="switch_lable" style={{
	                fontWeight: 600,
	                fontSize: '16px',
	                marginRight: '5px'
                }}>
						                    Kích thước:
						                </span>
											<span style={{
												fontSize: '16px',
												color: '#555'
											}}>
						                    {currentSize?.value}
						                </span>
										</div>
										<a href="#" style={{
											color: '#2563EB',
											textDecoration: 'underline',
											fontSize: '14px'
										}}>
											Hướng dẫn chọn size
										</a>
									</div>

									<div className="product_size_switch" style={{
										display: 'flex',
										gap: '10px',
										flexWrap: 'wrap'
									}}>
										{sizeOptions.map((size) =>
										{
											const variant = variants?.find(v =>
													v.color_id === selectedColorId &&
													v.attribute_value_ids.includes(size.id)
											);

											const isOutOfStock = !variant || variant.stock === 0;

											const isActive = selectedSize === size.id && !isOutOfStock;

											return (
													<span
															key={size.id}
															onClick={() =>
																{
																	if (!isOutOfStock) {
																		setSelectedSize(size.id);
																	}
																}}
															style={{
																margin: 0,
																width: 'auto',
																height: 'auto',
																lineHeight: 'normal',
																cursor: isOutOfStock ? 'not-allowed' : 'pointer',
																minWidth: '65px',
																textAlign: 'center',
																padding: '10px 15px',
																borderRadius: '8px',
																fontSize: '15px',
																fontWeight: 500,
																transition: 'all 0.2s ease',

																backgroundImage: isOutOfStock
																		? 'linear-gradient(to top left, transparent calc(50% - 1px), #d1d5db calc(50%), transparent calc(50% + 1px)), linear-gradient(to top right, transparent calc(50% - 1px), #d1d5db calc(50%), transparent calc(50% + 1px))'
																		: 'none',

																border: isOutOfStock ? '1px dashed #d1d5db' : '1px solid transparent',
																backgroundColor: isOutOfStock ? '#f9fafb' : (isActive ? '#000' : '#D1D5DB'),
																color: isOutOfStock ? '#d1d5db' : (isActive ? '#fff' : '#333'),
																opacity: isOutOfStock ? 0.5 : 1,
															}}
													>
							                        {size.value}
							                    </span>
											);
										})}
									</div>
								</div>
						)}
					</div>

					<hr/>

					<div className="cart_extra">
						<div className="cart-product-quantity">
							<div className="quantity">
								<input type="button" defaultValue="-" className="minus"/>
								<input type="text" name="quantity" defaultValue={1} title="Qty" className="qty" size={4}/>
								<input type="button" defaultValue="+" className="plus"/>
							</div>
						</div>
						<div className="cart_btn">
							<button className="btn btn-fill-out btn-addtocart" type="button">
								<i className="icon-basket-loaded"/>
								Thêm vào giỏ
							</button>
							<a className="add_compare" href="#">
								<i className="icon-shuffle"/>
							</a>
							<a className="add_wishlist" href="#">
								<i className="icon-heart"/>
							</a>
						</div>
					</div>

					<hr/>

					<ul className="product-meta">
						<li>
							Phân loại: <a href="#">{categoryName}</a>
						</li>
						<li>
							Thẻ:{" "}
							<a href="#" rel="tag">Cloth</a>,
							<a href="#" rel="tag">printed</a>
						</li>
					</ul>
					<div className="product_share">
						<span>Chia sẻ:</span>
						<ul className="social_icons">
							<li>
								<a href="#"><i className="ion-social-facebook"/></a>
							</li>
							<li>
								<a href="#"><i className="ion-social-twitter"/></a>
							</li>
							<li>
								<a href="#"><i className="ion-social-googleplus"/></a>
							</li>
							<li>
								<a href="#"><i className="ion-social-youtube-outline"/></a>
							</li>
							<li>
								<a href="#"><i className="ion-social-instagram-outline"/></a>
							</li>
						</ul>
					</div>
				</div>
		);
	}