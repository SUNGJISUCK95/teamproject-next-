"use client"
import {useEffect, useRef} from "react";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import {requestTossPay} from "@/utils/payment/PaymentAPI.js";
import Swal from "sweetalert2";
import useCartStore from "@/store/useCartStore";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

export function CheckoutPayment({ totalPrice, cartList }) {
    const { receiverInfo, showCart } = useCartStore();
    const widgetRef = useRef(null);
    useEffect(() => {
        if (!cartList || cartList.length === 0) {
            showCart();
        }
    }, [cartList, showCart]);
    useEffect(() => {
        let isCancelled = false;

        const initializeWidget = async () => {
            try {
                const tossPayments = await loadTossPayments(clientKey);
                if (isCancelled) return;

                const widgets = tossPayments.widgets({
                    customerKey: ANONYMOUS,
                });

                await widgets.setAmount({
                    currency: "KRW",
                    value: totalPrice,
                });

                if (isCancelled) return;

                widgetRef.current = widgets;

                const methodContainer = document.getElementById("payment-methods");
                if (methodContainer && methodContainer.innerHTML === "") {
                    await widgets.renderPaymentMethods({
                        selector: "#payment-methods",
                        variantKey: "DEFAULT",
                    });
                }

                const agreementContainer = document.getElementById("payment-agreement");
                if (agreementContainer && agreementContainer.innerHTML === "") {
                    await widgets.renderAgreement({
                        selector: "#payment-agreement",
                        variantKey: "DEFAULT",
                    });
                }

            } catch (error) {
                console.error("Error initializing widgets:", error);
            }
        };

        initializeWidget();
        return () => {
            isCancelled = true;
            const paymentMethods = document.getElementById("payment-methods");
            if (paymentMethods) paymentMethods.innerHTML = "";

            const agreement = document.getElementById("payment-agreement");
            if (agreement) agreement.innerHTML = "";
        };
    }, [totalPrice]);

    const handlePayment = async () => {
        const widgets = widgetRef.current;
        if(totalPrice <= 0 ){
            await Swal.fire({
                icon: "warning",
                title: "",
                text: "결제 위젯이 준비되지 않았거나 결제 금액이 올바르지 않습니다.",
            });
            return;
        } await requestTossPay(widgets,cartList,totalPrice,receiverInfo);
    };

    return (
        <div className="payment-summary-box">
            <h3>최종 결제 금액</h3>
            <div className="payment-summary-details">
                <div className="payment-row">
                    <span className="label">총 판매금액</span>
                    <span className="value">{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="payment-row">
                    <span className="label">총 할인금액</span>
                    <span className="value">-0원</span>
                </div>
                <div className="payment-row">
                    <span className="label">총 배송비</span>
                    <span className="value">+0원</span>
                </div>
                <div className="final-price-row">
                    <span className="label">최종 결제 금액</span>
                    <span className="value">{totalPrice.toLocaleString()}원</span>
                </div>
            </div>

            <div id="payment-methods" />
            <div id="payment-agreement" />
            <div className="payment-button-section">
                <button
                    className="payment-button"
                    onClick={handlePayment} // 12번 함수 연결
                    disabled={totalPrice <= 0}
                >
                    {totalPrice > 0 ? `${totalPrice.toLocaleString()}원 결제하기` : "결제할 금액이 없습니다"}
                </button>
            </div>
        </div>
    );
}