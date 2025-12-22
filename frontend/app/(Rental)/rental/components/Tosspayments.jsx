"use client";

import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useRentalStore } from '@/store/useRentalStore';

// 토스 개발자센터에서 제공받은 개발용 토큰
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "xrW6L3-kxhaOIBX6B_jBV";

export function CheckoutPage({ onClose }) {


  // 로그인한 회원의 계정 정보
  // const orderId = useSelector((state) => state.auth.userId)
  const orderId = "test111"
  // 선택한 스테이션의 정보
  const rentalSelectData = useRentalStore((s) => s.selectedStation);
  // 선택한 가격과 이용 시간  
  const { rentalTime, calculatedPrice } = useRentalStore((s) => s.paymentDetails);

  const [amount, setAmount] = useState({
    // 원화 단위를 사용
    currency: "KRW",
    // 유저가 입력한 시간에 대한 금액 반영
    value: calculatedPrice,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // 주문의 결제 금액 설정
      await widgets.setAmount(amount);

      await Promise.all([
        // 결제 UI 렌더링
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        // 이용약관 UI 렌더링
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount(amount);
  }, [widgets, amount]);


  return (
    <div className="wrapper">
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />

        {/* 이용약관 UI */}
        <div id="agreement" />

        {/* 결제하기 버튼 */}
        <div className="tossButtonBox">
          <button
            className="otherpay1"
            disabled={!ready}
            onClick={async () => {
              try {
                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                await widgets.requestPayment({
                  orderId: orderId,
                  orderName: `위치: ${rentalSelectData.name} / 대여 시간: ${rentalTime}분`,
                  successUrl: window.location.origin + "/success",
                  failUrl: window.location.origin + "/fail",
                });
              } catch (error) {
                // 에러 처리하기
                console.error(error);
              }
            }}
          >
            결제하기
          </button>
          <button
            className="otherpay2"
            type="button"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}