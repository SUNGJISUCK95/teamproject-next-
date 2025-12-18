
/*
설명 : 로그인을 위한 페이지입니다
    소셜 로그인의 경우 현재 백엔드로 가는 길을 막기 위해 무력화시켜둔 상태입니다.
    일반 로그인의 경우 아이디(test), 비밀번호(1234)를 입력하면 islogin=true로 바뀌고, 이에따라 페이지 하단이 변경됩니다.
*/

/*
 나중에 반드시 인터셉터쪽 다시 보고, 문제가 될만한게 있는지 확인해보기
 */

import {Loginform} from "@/app/(Auth)/login/Loginform";
import {SocialLogin} from "@/app/(Auth)/login/SocialLogin";
import {LogoutButton} from "@/app/(Auth)/login/LogoutButton";
import Link from "next/link";

import './loginpage.css'
export default function Login() {
    return (
        <>
            <div className='loginCenter'>
                <div className='loginAllBox'>
                    <ul>
                        <h1 className = "LoginPage">로그인 페이지</h1>
                        <Loginform/>
                    </ul>
                    <SocialLogin/>
                    <LogoutButton/>
                </div>
                <div className='loginBottomLinks'>
                    <Link href="/signUp" className='loginLinkBtn'>회원가입</Link>
                    <Link href="/IdPwSearch?mode=findId"
                          className='loginLinkBtn'
                          >아이디 찾기</Link>
                    <Link href="/IdPwSearch?mode=changePass"
                          className='loginLinkBtn'
                          >비밀번호 찾기</Link>
                </div>
                <Link href="/mypage" >내정보</Link>
            </div>
        </>
    );
}