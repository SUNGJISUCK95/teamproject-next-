"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';

export default function TossSuccess() {
  const searchParams = useSearchParams();
  const calledRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    async function confirmPayment() {
      try {
        const res = await fetch("http://3.35.3.78:9000/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        const json = await res.json();

        if (!res.ok) {
          console.error("결제 검증 실패", json);
        }
      } catch (e) {
        console.error("confirm API 에러", e);
      }
    }

    confirmPayment();
  }, []);

  return (
    <div className="toss_success result wrapper">
      <h2>결제 완료</h2>
      <p>주문번호: <span>{searchParams.get("orderId")}</span></p>
      <p>결제 금액: <span>{Number(searchParams.get("amount")).toLocaleString()}원</span></p>
      <button onClick={() => {
        router.push("/rental");
      }}>자전거 대여 페이지로 이동</button>
    </div>
  );
}