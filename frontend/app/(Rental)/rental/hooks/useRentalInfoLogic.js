"use client"

import React, { useEffect, useState } from 'react'
import { useRentalStore } from '@/store/useRentalStore';
import { axiosData } from '@/utils/dataFetch';
import { getRentalPayment } from '@/utils/rental_util/rentalMarkerAPI.js';

const useRentalInfoLogic = () => {

// 렌탈 시간 상태관리 함수
    const [rentalTime, setRentalTime] = useState(0);

    // 결제 방법 선택 상태 함수
    const [selectedPayment, setSelectdPayment] = useState('');
    
    // 결제 금액 전달 상태 함수
    const [paymentJsonData, setPaymentJsonData] = useState([]);
    
    // 다른 결제수단 컴포넌트 상태 함수
    const [otherPayment, setOtherPayment] = useState(false);

    const setPaymentDetails = useRentalStore((s)=> s.setPaymentDetails);
    
    // 시작 금액
    const pricePerHour = 500;
    // 기본 대여시작 시간인 30분 단위를 고정
    const timeUnit = 30;
    // 렌탈 금액 초기 값
    let calculatedPrice = 0;

    // 1. rentalTime에 따라 금액을 계산
    if (rentalTime >= 300) {
        // 2. 300분(종일권) 이상 선택 시 5,000원으로 고정
        calculatedPrice = 5000;
    } else {
        // 3.30분 단위 증가에 맞춰 500원씩 증가
        calculatedPrice = (rentalTime / timeUnit) * pricePerHour;
    }
    
    // 버튼 클릭 시 시간이 1시간 단위인30분씩 더해지는 클릭 이벤트 함수
    function handleTimeIncrease() {
        // 최대 270분 (4.5시간)까지 증가 허용 (300분 종일권은 별도)
        if (rentalTime < 270) {
            //클릭시 30분씩 ( + )
            setRentalTime(rentalTime + 30)
        }
    }

    // 버튼 클릭 시 시간이 1시간 단위인30분씩 빠지는 클릭 이벤트 함수
    function handleTimeDecrease() {
        // 0이하로 내려가지 않는게 설정
        if (rentalTime > 0) {
            // 클릭 시 값이 30분씩 ( - ) 
            setRentalTime(rentalTime - 30)
        }
    }

    // 종일권을 위한 사람을 위해서 클릭시 최고 값을 부여 (5시간)
    function handleTimeAllDay() {
        //클릭 시 최고 시간인 300분(5시간을 부여)
        setRentalTime(300)
    }

    // 결제 수단 선택 버튼 클릭 함수
    const handlePaymentChange = (event) => {
        // 매개변수를 이용하여 타겟시 발생된 값을 새로운 변수에 할당
        const newPaymentMethod = event.target.value;

        // 선택된 결제 수단 상태 업데이트
        setSelectdPayment(event.target.value); 
        
        // 변수에 담긴 타겟 값을 활용하여 유저에게 확인용 메시지를 alert을 이용해 고지
        if (newPaymentMethod === 'kakaopay'){
            alert("카카오 페이를 선택하셨습니다.")

        } else if (newPaymentMethod === 'otmerpayment'){
            alert("다른 결제 수단을 선택하셨습니다.")

        }

    }
    

    // 결제 버튼 클릭 시 결제 정보를 API 파일로 전송
    // 데이터를 서버를 이용하여 백엔드로 보내야 하므로 데이터를 전달 할 때에도 비동기 처리 필수
    const handlePayment = async () => {
    const result = await getRentalPayment(calculatedPrice, selectedPayment);
    console.log("결제 정보", result);

    if (result?.status === "REDIRECTING") {
        return;
    }

    if (result?.status === "SUCCESS") {
        alert("자전거 대여 및 결제가 완료되었습니다!");
        return;
    }
    alert(`결제 실패: ${result?.message || '알 수 없는 오류'}`);
};

    // 렌탈 시간과 금액을 timePaymenet 변수에 할당하고
    // useEffect를 이용해 slice에 상태 저장
    const timePaymenet = {rentalTime, calculatedPrice};
    useEffect(() => {
        setPaymentDetails(timePaymenet);
    }, [rentalTime, calculatedPrice]);

    
    useEffect(() => {
        const paymentInfoData = async () => {
            const jsonData = await axiosData("/data/rental_data/rentalPayment.json");
            setPaymentJsonData(jsonData);
        }
        paymentInfoData()
    }, []);

    return {
    rentalTime,
    selectedPayment,
    paymentJsonData,
    calculatedPrice,
    otherPayment,
    setOtherPayment,
    handleTimeIncrease,
    handleTimeDecrease,
    handleTimeAllDay,
    handlePaymentChange,
    handlePayment,
  };

}

export default useRentalInfoLogic