"use client"

import Swal from 'sweetalert2';
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import { getLogin } from "@/utils/auth/authAPI";
import {useAuthStore} from "@/store/authStore";

export function Loginform(){

    //소셜로그인이 아닌 일반 로그인을 위한 값 세팅.
    const initialsetting = {uid:"",upass : ""};//이쪽은 param이 null이 아니라 socialDupl 넣을 필요 없다
    const [formData,setFormData] = useState(initialsetting);
    const [errors,setErrors] = useState(initialsetting);
    const idRef = useRef(null);
    const pwdRef = useRef(null);
    const router = useRouter();
    const logdate = useAuthStore((s)=>s.login);
    const logout = useAuthStore((s)=>s.logout);
    const socialisLogin = useAuthStore((s)=>s.isLogin);
    const isLoginAccessToken = useAuthStore((s)=>s.accessToken);
    //로그인 페이지에 직접 입력하는 경우 칸에 값이 입력됨에 따라 변화함을 감지
    const handleformchange=(e)=>{
        const{name,value} = e.target;
        setFormData({...formData,[name]:value});
        setErrors(initialsetting)
    }

    // useEffect로 if문 걸고, isLogin값이 true면 발동시키고 아니면 패스
    // csrf 토큰 재발급하려면 세션이 한번 바뀌어야해서 그냥 로그인 한번 시킴
    useEffect(() => {
        if(socialisLogin && sessionStorage.getItem("social"))
        {
            const param = null;
            const usersocialid = localStorage.getItem("loginInfo");
            const loginInfoObject = JSON.parse(usersocialid);

            const autoFormData = {uid : loginInfoObject["userId"] , socialDupl: true}

            const attemptAutoLogin = async () => {
                console.log("attemptAutoLogin123123123");
                // const success = await dispatch(getLogin(autoFormData, param));
                const success = await getLogin(autoFormData,param);
                if (success) {
                    console.log("lego");
                    // router.push("/"); 다 완료하고 넣기.
                }
                else {
                    console.log("attemptfail");
                    Swal.fire({icon: 'error',text :"소셜로그인 실패. 재시도 부탁드립니다."})
                    // navigate('/login');
                }
            }
            attemptAutoLogin();
        }
    }, []);



    //제출버튼을 누르면 변화 발생.
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const param = {
            idRef : idRef,
            pwdRef : pwdRef,
            setErrors : setErrors,
            errors : errors
        }
        const succ = await getLogin(formData,param);
        console.log(succ)
        logdate({
            userId: succ.userId,
            role: succ.role,
            accessToken: succ.accessToken});
        if(succ.login)//여기다가 localstorage에 데이터 저장
        {
            // await login(); -- 기종씨가 입력하신 함수
            // navigate('/');
            localStorage.setItem("loginInfo",JSON.stringify(succ));
            router.push("/");
        }
        else{
            logout();
            await Swal.fire({icon: 'error',text : "로그인에 실패. 확인후 다시 진행해주세요."});
            setFormData({uid:"", upass:""});
            idRef.current.focus();
        }
    }

    return(
        <form onSubmit={handleLoginSubmit}>
            <li>
                <div className='loginDataBox'>아이디 : <input type="text"
                                                           name="uid"
                                                           onChange={handleformchange}
                                                           value = {formData.uid}
                                                           ref = {idRef}
                                                           placeholder='아이디'/>
                </div>
            </li>
            <li>
                <div className='loginDataBox'>비밀번호 : <input type="password"
                                                            name="upass"
                                                            onChange={handleformchange}
                                                            value = {formData.upass}
                                                            ref= {pwdRef}
                                                            placeholder='비밀번호'/>
                </div>
            </li>
            <ul>
                <li><button type = "submit">로그인</button></li>
                <li><button type = "reset">비우기</button></li>
            </ul>
        </form>
    )
}