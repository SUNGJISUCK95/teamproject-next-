"use client"

import {useEffect, useState} from "react";
import {randomString8to16} from "@/utils/auth/authAPI";


export function SocialLogin(){

    //플랫폼에 oauth 요청을 위한 필요 정보 값.
    const Rest_api_key='ef9794cb2ff6a12a26f6432f5ec9a04b';//카카오 EST API KEY
    const NAVER_CLIENT_ID = "qxdiERkzD3t06kqHGYdp"; // 네이버 발급받은 Client ID
    const GOOGLE_CLIENT_ID = "308480962204-8kq5mtbgf2o8fk1stqa7tdv72kmrm5rq.apps.googleusercontent.com"; // 네이버 발급받은 Client ID

    const [kakaoURL,setKakaoURL]=useState("");
    const [NAVER_AUTH_URL,setNaverURL]=useState("");
    const [GOOGLE_AUTH_URL,setGoogleURL]=useState("");
    const STATE = randomString8to16()

    useEffect(() => {
        const hostName = new URL(window.location.href).hostname;
        let urldata=""
        if(hostName==="localhost")
        {
            urldata='http://localhost:3000/auth';
        }
        else{
            urldata='http://'+hostName+':3000/auth';
        }
        // 플랫폼별 oauth 요청 URL
        console.log(urldata);
        setKakaoURL(`https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${urldata}&response_type=code`);
        setNaverURL(`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${urldata}`);
        setGoogleURL(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${urldata}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`);
    }, []);



    const handleSocialLogin = (e)=>{
        const flatformName = e.target.id;
        if(flatformName === "kakao")
        {
            sessionStorage.setItem("social","kakao");
            window.location.href = kakaoURL;
        }
        else if (flatformName === "naver")
        {
            sessionStorage.setItem("social","naver");
            window.location.href = NAVER_AUTH_URL;
        }
        else if (flatformName === "google")
        {
            sessionStorage.setItem("social","google");
            window.location.href = GOOGLE_AUTH_URL;
        }
    }

    return(
        <div>
            <h2 className = "OuterLoginPage">외부 로그인</h2>
            <div className='socialButtonWrapper'>
                <button onClick={handleSocialLogin} id = "kakao">카카오 로그인</button>
                <button onClick={handleSocialLogin} id = "naver">네이버 로그인</button>
                <button onClick={handleSocialLogin} id = "google">구글 로그인</button>
            </div>
        </div>
    )
}