"use client"
import {useEffect, useState} from "react";
import {confirmPayment} from "@/utils/payment/PaymentAPI.js";
import '@/styles/successpage.css';
import {useRouter, useSearchParams} from "next/navigation";


export default function SuccessPage() {
    const router = useRouter();
    const searchParams= useSearchParams();
    const [isConfirm, setIsConfirm] = useState(false);
    const [orderName, setOrderName] = useState("");

    useEffect(() => {
        const orderId =  searchParams.get("orderId");
        const amount = searchParams.get("amount");
        const paymentKey =  searchParams.get("paymentKey");
        if (!paymentKey || !orderId || !amount) {
            router.push(`/fail?message=결제 정보가 올바르지 않습니다.&code=INVALID_PARAMS`);
            return;
        }
        const handleConfirm = async () => {
            try {
                const response = await confirmPayment(paymentKey,orderId,amount);
                if (response && response.orderName) {
                    setOrderName(response.orderName);
                }
                setIsConfirm(true);
            } catch (error) {
                router.push(`/fail?message=결제 정보가 올바르지 않습니다.&code=INVALID_PARAMS`);
            }
        }
        handleConfirm();
    }, [router, searchParams]);

    if (!isConfirm) {
        return (
            <div className="policy-page">
                <div className="policy-container" style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>결제 승인 중입니다...</h2>
                    <p>잠시만 기다려주세요.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="policy-page">
            <div className="policy-container">
                <div className="success-icon">✓</div>
                <h1>
                    결제 성공
                </h1>
                <p className="success-message">결제가 성공적으로 완료되었습니다.</p>
                <div className="payment-details-box">
                    <p>
                        <span>주문 상품:</span>
                        <span style={{ fontWeight: 'bold' }}>{orderName}</span>
                    </p>
                    <p>
                        <span>주문번호:</span>
                        <span>{searchParams.get("orderId")}</span>
                    </p>
                    <p>
                        <span>결제 금액:</span>
                        <span className="final-amount">
                            {Number(searchParams.get("amount")).toLocaleString()}원
                        </span>
                    </p>
                    {/*<p>*/}
                    {/*    <span>paymentKey:</span>*/}
                    {/*    <span className="payment-key">{searchParams.get("paymentKey")}</span>*/}
                    {/*</p>*/}
                </div>
            </div>
        </div>
    );
}