"use client"

import React, {useEffect, useRef} from 'react';
import '@/styles/cart/cartshipping.css'
import DaumPost from "@/components/commons/DaumPost";
import Swal from "sweetalert2";
import '@/styles/cart/cart.css';
import {useRouter} from 'next/navigation';
import useCartStore from "@/store/useCartStore";

export default function CartShippingInfo() {
    const router = useRouter();
    const isInitialized = useRef(false);
    const {cartList,totalPrice,orderInfo,receiverInfo,toggleSameOrderer,
        setOrderInfo, setReceiverInfo
        } = useCartStore();
    useEffect(() => {
        if (cartList && cartList.length > 0 && !isInitialized.current) {
            if (!receiverInfo.isSame) {
                toggleSameOrderer(true);
            }
            isInitialized.current = true;
        }
    }, [cartList, receiverInfo.isSame, toggleSameOrderer]);

    const handleOrderChange = (e) => {
        const {name, value} = e.target;
        setOrderInfo(name, value);
    };

    const handleReceiverChange = (e) => {
        const {name, value} = e.target;
        setReceiverInfo(name, value);
    }

    const handleSameCheck = (isSame) => {
        toggleSameOrderer(isSame);
    }
    const handleAddressComplete = (data) => {
        setReceiverInfo('postcode',data.postcode);
        setReceiverInfo('address', data.address);
    }
    const goToCheckout = () => {
        if(totalPrice <= 0){
            Swal.fire({
                icon: "warning",
                text: "주문 상품이 없습니다!",
            });
            return;
        }
        const validateForm = () => {
            if (!orderInfo.name || !orderInfo.mobile || !orderInfo.email) {
                return "주문자 정보를 모두 입력해주세요.";
            }
            if (!receiverInfo.name || !receiverInfo.mobile || !receiverInfo.postcode || !receiverInfo.address) {
                return "배송지(수령인) 정보를 모두 입력해주세요.";
            }

            return null;
        };

        const errorMessage = validateForm();

        if (errorMessage) {
            Swal.fire({
                icon: "warning",
                title: "필수정보누락",
                text: errorMessage,
            });
            return;
        }

        router.push("/checkout");
    }
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
                                    onChange={handleOrderChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="orderer-mobile" style={{marginLeft: '10px'}}>휴대폰번호 <span
                                className="required">*</span></label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="orderer-mobile"
                                    name="mobile"
                                    value={orderInfo.mobile}
                                    onChange={handleOrderChange}
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
                                    onChange={handleOrderChange}
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
                            <div className="radio-group">
                                <input
                                    type="radio"
                                    id="same-as-orderer"
                                    name="recipient-type"
                                    checked={receiverInfo.isSame}
                                    onChange={() => handleSameCheck(true)}
                                />
                                <label htmlFor="same-as-orderer">주문자와 동일</label>
                                <input
                                    type="radio"
                                    id="new-address"
                                    name="recipient-type"
                                    checked={!receiverInfo.isSame}
                                    onChange={() => handleSameCheck(false)}
                                />
                                <label htmlFor="new-address">새로운주소</label>
                            </div>
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
                                    onChange={handleReceiverChange}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipient-contact">연락처</label>
                            <div className="input-wrapper">
                                <input type="text" id="recipient-contact" placeholder="-없이 숫자만 입력"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="recipient-mobile" style={{marginLeft: '10px'}}>휴대폰번호 <span
                                className="required">*</span></label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="recipient-mobile"
                                    name="mobile"
                                    value={receiverInfo.mobile}
                                    onChange={handleReceiverChange}
                                />
                            </div>
                        </div>
                        <div className="form-group form-group-address">
                            <label htmlFor="recipient-zipcode">주소 <span className="required">*</span></label>
                            <div className="address-group">
                                <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                    <input
                                        type="text"
                                        name="postcode"
                                        value={receiverInfo.postcode}
                                        placeholder="우편번호"
                                        readOnly
                                        style={{width: '100px', marginRight: '10px'}}
                                    />
                                    <DaumPost onComplete={handleAddressComplete}/>
                                </div>
                                <input
                                    type="text"
                                    id="recipient-address1"
                                    name="address"
                                    value={receiverInfo.address}
                                    onChange={handleReceiverChange}
                                    className="input-address"
                                    placeholder="기본 주소 검색 후 상세 주소를 입력해주세요"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="cart-footer-buttons">
                        <button className="btn-primary" onClick={goToCheckout}>제품 주문하기</button>
                    </div>
                </div>
            </div>
        );
    }
