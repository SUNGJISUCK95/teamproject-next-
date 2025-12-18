"use client"

import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { SearchingUserInfo , sendingAuthCode, updateUser} from "@/utils/auth/authAPI.js"
import {IdPwSearch_selectTab} from "@/app/(Auth)/IdPwSearch/IdPwSearchPart/IdPwSearch_selectTab";
import {IdPwSearch_findId} from "@/app/(Auth)/IdPwSearch/IdPwSearchPart/IdPwSearch_findId";
import {IdPwSearch_AuthcodeInput} from "@/app/(Auth)/IdPwSearch/IdPwSearchPart/IdPwSearch_AuthcodeInput";
import {IdPwSearch_passChange} from "@/app/(Auth)/IdPwSearch/IdPwSearchPart/IdPwSearch_passChange";

import {useRouter} from "next/navigation";

export default function IdPwSearch({mode}){

    const searchUserinfoInit = {"uemail" : null, "uname":null,"uid":null,"selectedTap":null,"authCodeIdPw":null,"upass":null,"upassCheck":null}
    // location.state 객체에서 type 값을 구조 분해 할당으로 가져옴

    const [pageType, setPageType] = useState(mode);
    const [searchUserinfo,setSearchUserinfo] = useState(searchUserinfoInit);
    const [inputLevel,setInputLevel] = useState({"searchingInfo":true,"authcodeInput":null,"showOrChange":null})
    const [finalData,setFinalData] = useState(null);
    const [startTime, setStartTime] = useState(null);//인가코드 발급받고 5분재서 넘으면 되돌려보낼 예정.
    const DURATION_LIMIT = 5 * 60 * 1000; // 5(분단위) * 60(초단위) * 1000(밀리초)


    const router = useRouter();

    const pageTypeChange = (newPageType) => {
        setPageType(newPageType);
        setSearchUserinfo(searchUserinfoInit);//탭 변경시 인풋박스 초기화
        setInputLevel(prev=>({...prev,["searchingInfo"]:true}))
        setInputLevel(prev=>({...prev,["authcodeInput"]:null}))
        setInputLevel(prev=>({...prev,["showOrChange"]:null}))
    }

    const handleInfo = (name,value) => {
        setSearchUserinfo(prev=>({...prev,[name]:value}))
    }

    const handleselectedTap = (value) => {
        setSearchUserinfo(prev=>({...prev,["selectedTap"]:value}))//이거로 변경이 일어나서 useEffect 발동되고 저장된 정보를 백으로 이동시킴
    }

    const sendingUserInfo = async() =>{
        if(await SearchingUserInfo(searchUserinfo))
        {
            if(inputLevel.searchingInfo)
            {
                setInputLevel(prev=>({...prev,["searchingInfo"]:null}))
                setInputLevel(prev=>({...prev,["authcodeInput"]:true}))
                setInputLevel(prev=>({...prev,["showOrChange"]:null}))
                //여기에 백에서 메일 쏘는거 입력
                console.log("sendingUserInfo : ??");
                console.log(searchUserinfo)

                setStartTime(Date.now());//인증코드 유효시간 측정용

                Swal.fire({icon: 'info',text :"메일을 보냈습니다. 확인 후 입력해보세요."});
            }
        }
        else{
            Swal.fire({icon: 'error',text :"해당 정보와 일치하는 계정이 없습니다. 다시 한번 입력값을 확인 후 입력하세요."});
            setSearchUserinfo(prev=>({...prev,["selectedTap"]:null}))
        }
    }

    const sendingAuth = async() =>{
        const result = await sendingAuthCode(searchUserinfo);
        const current = Date.now();
        if(current-startTime<=DURATION_LIMIT)
        {
            if(result != "wrong or late")
            {
                setFinalData(result)
                console.log("finaldata : " + finalData )
                //시간초를 설정하고, 시간초 지나서 입력이 들어오거나 맞으면 아래 실행해서 틀렸는지 맞았는지 알려주기?
                setInputLevel(prev=>({...prev,["searchingInfo"]:null}))
                setInputLevel(prev=>({...prev,["authcodeInput"]:null}))
                setInputLevel(prev=>({...prev,["showOrChange"]:true}))
            }
            else
            {
                const lefttime = DURATION_LIMIT-(current-startTime);
                const totalleftsec = Math.floor(lefttime/1000);
                const leftmin = Math.floor(totalleftsec/60);
                const leftsec = totalleftsec - (60* Math.floor(totalleftsec/60));

                Swal.fire({icon:"warning",text:`인증코드가 틀렸습니다. 제한시간은 ${leftmin}분 ${leftsec}초 남았습니다.`})
            }
        }
        else
        {
            //바깥에 새로고침을 두니 비동기 문제가 생겨서 .then으로 작동시킴
            Swal.fire({icon:"error",text:`시간초과, 처음부터 다시 부탁드립니다.`}).then(()=>{window.location.reload();})
        }
    }

    useEffect(()=>{
        if(searchUserinfo.selectedTap === "Id" || searchUserinfo.selectedTap === "Pw")
        {
            sendingUserInfo();
            setSearchUserinfo(prev=>({...prev,["selectedTap"]:null}))//여러번 누를수도 있으니까 초기화
        }
        else if(searchUserinfo.selectedTap === "Auth")
        {
            sendingAuth();
            setSearchUserinfo(prev=>({...prev,["selectedTap"]:null}))//여러번 누를수도 있으니까 초기화
        }
        else if(searchUserinfo.selectedTap === "passCheck")
        {
            if(searchUserinfo.upass!=searchUserinfo.upassCheck)
            {
                setSearchUserinfo(prev=>({...prev,["upass"]:null}))
                setSearchUserinfo(prev=>({...prev,["upassCheck"]:null}))
            }
            else
            {
                updateUser(searchUserinfo);
                Swal.fire({icon: 'info',text :"비밀번호가 변경되었습니다. 메인화면으로 돌아갑니다."});
                // navigate("/");
                router.push("/");
            }
            setSearchUserinfo(prev=>({...prev,["selectedTap"]:null}))//여러번 누를수도 있으니까 초기화
        }
    },[searchUserinfo.selectedTap])

    return(
        <>
            <IdPwSearch_selectTab PTC={pageTypeChange} Ptype={pageType}/>
            {inputLevel.searchingInfo?
                <div className="IdPwSearchContent">
                    {pageType==="findId"?
                        <>
                            <div>
                                <IdPwSearch_findId buttonType={"Id"} handleInfo={handleInfo} searchUserinfo={searchUserinfo} Clicker={handleselectedTap}/>
                            </div>
                        </>
                        :
                        <div>
                            <IdPwSearch_findId buttonType={"Pw"} handleInfo={handleInfo} searchUserinfo={searchUserinfo} Clicker={handleselectedTap}/>
                        </div>
                    }
                </div>
                :
                ""}
            {inputLevel.authcodeInput?
                <IdPwSearch_AuthcodeInput handleInfo={handleInfo} Clicker={handleselectedTap}/>
                :
                ""
            }
            {inputLevel.showOrChange?
                (finalData==="PW"?
                    <>
                        <IdPwSearch_passChange handleInfo={handleInfo} searchUserinfo={searchUserinfo} Clicker={handleselectedTap}/>
                    </>
                    :
                    finalData==="wrong or late"?
                        <h1>인증코드가 틀렸거나 인증시간을 초과하였습니다. <br/> 처음부터 다시 시도해주세요.</h1>:
                        <h1>아이디 : {finalData}</h1>)
                :<></>}
        </>
    )
}