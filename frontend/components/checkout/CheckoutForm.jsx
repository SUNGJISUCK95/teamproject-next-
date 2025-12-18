"use client"
import React, {useEffect} from 'react';
import '@/styles/cart/cartshipping.css'
import useCartStore from "@/store/useCartStore";

export function CheckoutForm({cartList}) {
    const {orderInfo, receiverInfo, toggleSameOrderer, userOrderInfo} = useCartStore();
    useEffect(() => {
        if (cartList && cartList.length > 0) {
            userOrderInfo(cartList[0]);
            toggleSameOrderer(true);
        }
    }, [cartList, toggleSameOrderer, userOrderInfo]);


    return (
        <div className="checkout-info-container">
            <div className="form-section">
                <h2 className="form-section-title">주문자 정보</h2>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="orderer-name">주문자명 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="orderer-name"
                                name="name"
                                value={orderInfo.name}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="orderer-mobile" style={{marginLeft:'10px'}}>휴대폰번호 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="orderer-mobile"
                                name="mobile"
                                value={orderInfo.mobile}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="orderer-email">이메일 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="orderer-email"
                                name="email"
                                value={orderInfo.email}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. 수령인 정보 섹션 */}
            <div className="form-section">
                <div className="form-section-header">
                    <h2 className="form-section-title">수령인 정보</h2>
                    <div className="recipient-actions">
                    </div>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="recipient-name">수령자명 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="recipient-name"
                                name="name"
                                value={receiverInfo.name}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group">
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipient-contact">연락처</label>
                        <div className="input-wrapper">
                            <input type="text" id="recipient-contact" placeholder="-없이 숫자만 입력" readOnly/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="recipient-mobile" style={{marginLeft:'10px'}}>휴대폰번호 <span className="required">*</span></label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="recipient-mobile"
                                name="mobile"
                                value={receiverInfo.mobile}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="form-group form-group-address">
                        <label htmlFor="recipient-zipcode">주소 <span className="required">*</span></label>
                        <div style={{display:'flex', alignItems:'center', marginBottom:'8px'}}>
                            <input
                                type="text"
                                name="postcode"
                                value={receiverInfo.postcode}
                                placeholder="우편번호"
                                readOnly
                                className="input-address-postcode"
                            />
                        </div>
                        <div className="address-group">
                            <input
                                type="text"
                                id="recipient-address1"
                                name="address"
                                value={receiverInfo.address}
                                className="input-address"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
