"use client"

import {useEffect} from "react";
import {axiosPost} from "@/utils/dataFetch";
import {refreshCsrfToken} from "@/utils/csrf/manageCsrfToken";
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/store/authStore";


export function SocialAuth(){

    const router = useRouter();
    const login = useAuthStore((s)=>s.login);

    useEffect(()=>{
        //window, sessionStorage는 브라우저 함수라서
        // 클라이언트 컴포넌트가 로딩이 다 된 시점(useEffect 시작 시점) 이후에 불러야한다.
        let code = new URL(window.location.href).searchParams.get("code");
        const social = sessionStorage.getItem('social');
        if(code != null)//카카오나 네이버는 이거로 코드 수집 가능
        {
            console.log("authcode:123 ",code);
        }
        else{//이건 구글
            code = window.location.hash;
            code = code.substring(code.indexOf('=')+1,code.indexOf('&'))
            console.log("authcode:123123123 ",code);
        }
        console.log("authcode: ",code);
        const handleSocialtoken = async () =>{
            // const authtoken = await getsocialtoken(code,social);

            const hostName = new URL(window.location.href).hostname;
            const json_code = {"authCode": code,"social":social, "hostName" : hostName};
            const url = "/auth/token";

            const authtoken = await axiosPost(url,json_code);//authtoken이 dto객체 받음.
            await refreshCsrfToken();
            console.log("authtoken : ", authtoken );
            //

            const loginInfo = { "userId": authtoken.accessToken,
                "isLogin":authtoken.login,
                "isSocial" :social,
                "role": authtoken.role || []};
            localStorage.setItem("loginInfo", JSON.stringify(loginInfo));

            if(authtoken?.login)
            {
                login({//login에서는 isLogin값은 true로 변경
                    userId: authtoken.userId,
                    role: authtoken.role,
                    accessToken: authtoken.accessToken});


                router.push("/login");//csrf토큰 새로고침을 위해서 재접속
                // alert("로그인에 성공하셨습니다.");
                // router.push("/");
            }
            else {// 회원가입
                await Swal.fire({icon: 'error',text :"아이디 없음. 로그인 실패. 확인 부탁드립니다."})


                router.push("/signUp");
            }
        };
        handleSocialtoken();
    },[])

    return(<></>)
}