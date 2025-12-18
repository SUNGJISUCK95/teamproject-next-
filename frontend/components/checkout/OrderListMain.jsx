"use client"

import { useEffect } from "react";
import "@/styles/orderList.css";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";


export function OrderListMain({orderList}) {
    const router = useRouter();
    // const orderList = useSelector((state) => state.payment.orderList);
    // const isLogin = useSelector((state) => state.auth.isLogin);

    useEffect(() => {
        const isLogin = "test111";
        if (!isLogin) {
            Swal.fire({
                icon: "warning",
                title: "로그인 필요",
                text: "로그인이 필요합니다.",
            });
            router.push("/login");
        }
    }, [router]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}`;
    };

    return (
        <div className="order-container" style={{paddingTop:'35px'}}>
            <h2 className="page-title">주문 내역</h2>

            {(!orderList || orderList.length === 0) ? (
                <div className="empty-list">
                    <p>아직 주문한 내역이 없습니다.</p>
                </div>
            ) : (
                <div className="order-list-wrapper">
                    {orderList.map((item) => (
                        <div key={item.orderId} className="order-card">
                            <div className="card-header">
                                <span className="order-date">{formatDate(item.odate)} 주문</span>
                                <span className="order-id">NO. {item.orderId}</span>
                            </div>

                            <div className="card-body">
                                <div className="product-info">
                                    <h3>{item.orderName}</h3>
                                </div>
                                <div className="price-info">
                                    <span className="price-label">총 결제금액   </span>
                                    <span className="total-price">
                                        {item.totalPrice ? item.totalPrice.toLocaleString() : 0}원
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}