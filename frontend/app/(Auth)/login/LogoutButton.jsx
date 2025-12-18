"use client"

import Link from "next/link";
import Swal from "sweetalert2";
import {useAuthStore} from "@/store/authStore";
import {refreshCsrfToken} from "@/utils/csrf/manageCsrfToken";
import {getLogout} from "@/utils/auth/authAPI";
import {useRouter} from "next/navigation";

export function LogoutButton(){


    const router = useRouter();
    const logout = useAuthStore((s) => s.logout);
    const userId = useAuthStore((s) => s.userId);
    const isLogin = useAuthStore((s) => s.isLogin);
    console.log("userId :: >>" +userId)
    const handleLogOut= async () =>{
        if(sessionStorage.getItem("social")){
            await Swal.fire({icon: 'info',text :"소셜상태에서 로그아웃 하셨습니다."});
        }
        else{

        }
        await getLogout();
        await refreshCsrfToken();
        localStorage.removeItem("loginInfo");
        sessionStorage.removeItem("social");
        await Swal.fire({icon: 'info',text :"로그아웃 하셨습니다."});
        // await logout(); -- 기종씨가 입력하신 함수
        // navigate('/');
        router.push("/");
        logout({});
    }

    return(
        <>
            {isLogin?
                <>
                    <h1>로그인 상태</h1>
                    <Link href="/public">홈</Link>
                    <button onClick={handleLogOut}>로그아웃</button>
                </>:
                <h1>비 로그인 상태</h1>}
        </>
    )
}