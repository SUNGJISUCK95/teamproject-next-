"use client"
/**
 csrf 토큰 요청시 주의사항
 - 쿠키 요청을 항상 true로 설정
 - CRA Proxy 사용여부에 따라 ip 주소 변경
 ✨ 위의 사항을 포함한 전역변수 axios 객체를 별도 생성 : axiosSetup.js
 */
import axios from './axiosSetup.js';

/**
 로그아웃 성공 시 CSRF 토큰 재발급
 */
export const refreshCsrfToken = async() => {
    try{
        await axios.get("http://localhost:9000/csrf/refresh", {
            withCredentials: true // ✅ 1. 쿠키 전송 허용
        });
        console.log("---------------->> 토큰 최초 재발급 !!!")
    } catch(error) {
        console.log("csrf token create error :: ", error);
    }
}


/**
 CSRF 토큰 최초 발급 함수
 */
export const createCsrfToken = async() => {
    try{
        await axios.get("http://localhost:9000/csrf/create", {
            withCredentials: true // ✅ 1. 쿠키 전송 허용
        });
        console.log("---------------->> 토큰 최초 발급 !!!")
    } catch(error) {
        console.log("csrf token create error :: ", error);
    }
}