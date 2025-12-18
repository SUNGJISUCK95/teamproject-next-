"use client"

import Swal from 'sweetalert2';
import { useEffect,useState } from "react";
import { getInfo,idDuplCheck,updateUser,IdDrop,getLogout} from "@/utils/auth/authAPI"
import { useRouter} from "next/navigation";
import {useAuthStore} from "@/store/authStore";

import { MyPage_SideBar } from '@/app/(Auth)/mypage/MyPage/MyPage_SideBar'
import { MyPage_InputSection } from '@/app/(Auth)/mypage/MyPage/MyPage_InputSection';
import {refreshCsrfToken} from "@/utils/csrf/manageCsrfToken";
import {PhoneNumberSetter} from "@/components/Auth/PhoneNumberSetter";

export function MyInfopage(){

    const handleDatainit = {uid:"",upass:"",
        uname:"",uage:"",
        ugender:"",uaddress_main:"",uaddress_sub:"",postcode:"",
        uemail:"",uphone:""
    }
    const editDatainit = {uid:0,upass:0,
        uname:0,uage:0,
        ugender:0,uaddress_main:0,uaddress_sub:0,postcode:"",
        uemail:0,uphone:0
    }
    const dataChangeButtonOnOffInit = {uid:false,upass:false,
        uname:false,uage:false,
        ugender:false,uaddress:false,
        uemail:false,uphone:false
    }
    const nameString = {uid:"아이디",upass:"패스워드",
        uname:"이름",uage:"나이",
        ugender:"성별",uaddress:"주소",
        uemail:"이메일",uphone:"전화번호"}

    const router = useRouter();
    const logout = useAuthStore((s)=>s.logout);

    const [info, setInfo] = useState(null);//DB에서 가져온 데이터 저장
    const [handleData,setHandleData] = useState(handleDatainit)//변경 데이터 저장용 변수

    const [editer,setEditer] = useState(editDatainit);//각 정보 중 어디가 바뀌었는지 저장. 이걸로 밑의 editerOnOff변수값 수정
    const [editerOnOff,setEditerOnOff] = useState(0);//회원정보중 어느거라도 수정 버튼 누르면 이 값이 바뀌어서 수정 저장 버튼 나오게 만드는 변수
    const [idChecker,setIdChecker] = useState(false);//아이디 변경 시 중복 방지를 위한 변수

    const[updateResult,setUpdateResult] = useState(0);//회원정보 수정 후 데이터 새로고침을 위한 변수

    const [dataChangeButtonOnOff,setDataChangeButtonOnOff] = useState(dataChangeButtonOnOffInit)//데이터 인풋박스 띄우는 버튼 ON/OFF
    const [postCodeChanger,setPostCodeChanger]=useState(0);//uaddress_main 초기화용 변수
    const [mainAddressVar,setMainAddressVar] = useState({"mainAddress":"","postcode":""});//
    // const {handleClick} = usePostCode(mainAddressVar,setMainAddressVar); // 리턴이 handleclick임

    const handleChange=(e)=>{
        const {name,value} = e.target
        // setHandleData({...handleData,[name]:value})
        console.log(handleData)
        if(name ==="uid")
        {
            setIdChecker(false);//ID값 변경되면 다시 체크하게 만들기
        }
        if(name ==="uphone")
        {

            const onlyNumbers = value.replace(/[^0-9]/g, '');

            let formattedValue = PhoneNumberSetter(value);

            setHandleData({...handleData,[name]:formattedValue})

            if(onlyNumbers.length===0)
            {
                setEditer({...editer,[name]:0})
            }
            else
            {
                setEditer({...editer,[name]:1})
            }
        }
        else if(name === "uage")//나이는 숫자만 입력받음
        {
            const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
            setHandleData({...handleData,[name]:onlyNumbers})
            if(onlyNumbers.length===0)
            {
                setEditer({...editer,[name]:0})
            }
            else
            {
                setEditer({...editer,[name]:1})
            }
        }
        else
        {
            if(name ==="uaddress")
            {
                setHandleData({...handleData,[name+"_sub"]:value})
            }
            else
            {
                setHandleData({...handleData,[name]:value})
            }
            if(value==="")
            {
                setEditer({...editer,[name]:0})//입력창 열고 변화가 없으면 데이터 변화 없는 취급
            }
            else
            {
                setEditer({...editer,[name]:1})
            }
        }
    }

    const loginInfoString = localStorage.getItem("loginInfo");
    let socialLogin = false;
    const Sessionflatform = sessionStorage.getItem("social")
    let Json_loginInfo = null;

    if (loginInfoString) {
        Json_loginInfo = JSON.parse(loginInfoString);
        // socialLogin = Json_loginInfo.isSocial;
        socialLogin=Sessionflatform
    }

    const dataFixer = async() =>{//원본데이터, 변경데이터 넘겨서 해당 내용 바꾸기
        //아이디 중복확인 후 중복 없으면 전달하기
        if(editer["uid"]===1 && !idChecker){
            Swal.fire({icon:"error", text:"아이디 중복체크 하세요"})
        }
        else
        {
            const idIncludehandleData = {...handleData,["includedId"]:info.uid}
            const result = await updateUser(idIncludehandleData)//데이터 백엔드로 전달
            setHandleData(handleDatainit);//이후 작성한 데이터 초기화
            setEditerOnOff(0);
            if(result===1)
            {
                setUpdateResult(prev => prev+1);//updateUser를 넣으면 1값 유지되고, useEffect 작동 안해서 이렇게 변경
            }
        }
    }

    //회원탈퇴 문의 후 탈퇴시키는 함수
    const idDrop = async() =>{
        const idIncludehandleData = {...info}
        // const userResponse = window.confirm("회원 탈퇴 하시겠습니까?");
        // 1. Swal.fire를 await하여 사용자의 응답을 직접 받음
        const result = await Swal.fire({
            title: '회원 탈퇴 하시겠습니까?',
            text: '다시 되돌릴 수 없습니다.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33', // 탈퇴는 빨간색으로 변경 (권장)
            cancelButtonColor: '#3085d6', // 취소는 파란색으로 변경 (권장)
            confirmButtonText: '탈퇴',
            cancelButtonText: '취소',
            reverseButtons: true,
        });

        // 2. 응답 결과에 따라 로직 처리
        if (result.isConfirmed) {
            // 탈퇴(Confirm) 버튼을 눌렀을 때의 로직

            // 2-1. API 호출 및 처리
            console.log(idIncludehandleData);
            try {
                const deleteResult = await IdDrop(idIncludehandleData); // API 호출

                // 2-2. 성공 알림 및 후속 조치
                await Swal.fire({ icon: "success", text: "회원 탈퇴를 완료하였습니다." });
                // dispatch(getLogout());
                // navigate('/');

                await getLogout();
                await refreshCsrfToken();
                logout();
                localStorage.removeItem("loginInfo");
                sessionStorage.removeItem("social");

                router.push("/");

            } catch (error) {
                // API 호출 실패 시 에러 처리
                Swal.fire({ icon: "error", title: "오류", text: "탈퇴 처리 중 오류가 발생했습니다." });
            }

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // 취소(Cancel) 버튼을 눌렀을 때의 로직
            Swal.fire({ icon: "info", text: "회원 탈퇴를 취소하였습니다." });
        }
    }

    //아이디 중복검사 함수
    const IdDupleCheck = async() => {
        const duplResult = await idDuplCheck(handleData.uid);

        if(!duplResult){//duplResult=true면 중복있음, false면 중복없음
            //!duplResult은 중복이 없을때 true가 됨
            // setIdDupl(true);
            setIdChecker(true);
        }
        else{
            // handleData.uid="";
            setHandleData({...handleData, ["uid"]: ""});
            Swal.fire({icon : "error", text:"아이디 중복! 다시 입력해주세요"});
            // inputRefs.idRef.current.focus();
        }
    }


    useEffect(()=>{
        let result;
        const loginInfo = localStorage.getItem("loginInfo");
        if (!loginInfoString) // 로그인 정보가 null인 경우
        {
            // navigate('/');
            router.push("/");
            return; // 리다이렉션 후 이후 코드가 불필요하게 실행되는 것을 방지
        }
        const Json_loginInfo = JSON.parse(loginInfo);
        //isLogin하면 스프링이 데이터를 제대로 못받아서 loggedIn으로 변경.
        const loginInfo_goingback={ uid : Json_loginInfo.userId, loggedIn : Json_loginInfo.isLogin, socialDupl : Json_loginInfo.isSocial}
        const getUserInfo = async() =>{
            result = await getInfo(loginInfo_goingback);
            result["upass"] = "패스워드는 비밀입니다"
            setInfo(result)
        }
        getUserInfo();
    },[updateResult])

    //변화가 생겨서 editer의 값이 한개라도 바뀌면 그걸 editerOnOFF에 추가.
    useEffect(()=>{
        console.log(editer)
        let editerOnOff_changer = 0
        for( const [key, value] of Object.entries(editer))
        {
            editerOnOff_changer=editerOnOff_changer+value
            setEditerOnOff(editerOnOff_changer);
        }
    },[editer])


    //변경 창 여는 함수
    const DataChangeOpen = (e) =>{
        const{name} = e.target;
        setDataChangeButtonOnOff({...dataChangeButtonOnOff,[name] : true})
    }
    const DataChangeClose = (e) =>{
        const{name} = e.target;
        setDataChangeButtonOnOff({...dataChangeButtonOnOff,[name] : false})
        if(name==="uaddress")
        {
            handleChange({target:{name:"uaddress_sub",value:""}})
            handleChange({target:{name:"uaddress",value:""}})
            setPostCodeChanger(1);//uaddress_main 초기화 작업을 위해 세팅
            setMainAddressVar({"mainAddress":"","postcode":""})
        }
        else
        {
            handleChange({target:{name:name,value:""}})
        }
    }


    //여기도 변경 필요할듯?
    useEffect(() => {
        console.log(mainAddressVar.mainAddress)
        console.log(mainAddressVar.postcode)
        if (mainAddressVar.mainAddress && dataChangeButtonOnOff['uaddress']) {
            handleChange({
                target: {
                    name: 'uaddress_main',
                    value: mainAddressVar.mainAddress + " *** " + mainAddressVar.postcode
                }
            });
        }
        if(postCodeChanger===1)
        {
            handleChange({
                target: {
                    name: 'uaddress_main',
                    value: ""
                }
            });
            setPostCodeChanger(0);
        }
    }, [mainAddressVar.mainAddress, postCodeChanger]);

    //이거 나중에 풀어야함
    useEffect(()=>{
        setDataChangeButtonOnOff(dataChangeButtonOnOffInit)
        setMainAddressVar({"mainAddress":"","postcode":""});
    },[updateResult])


    if (!info) {
        // null을 반환하여 아무것도 렌더링하지 않거나, 로딩 메시지를 반환합니다.
        // MyPage에서 <li>로 감싸고 있으므로, <li> 안의 내용만 반환해야 합니다.
        return <>정보를 불러오는 중...</>;
    }

    const VariableSetting= {
        "dataChangeButtonOnOff":dataChangeButtonOnOff,
        "nameString":nameString,
        "handleChange":handleChange,
        "DataChangeClose":DataChangeClose,
        "DataChangeOpen":DataChangeOpen,
        "IdDupleCheck":IdDupleCheck,
        "idChecker":idChecker,
        "info":info,
        "mainAddressVar":mainAddressVar,
        "setMainAddressVar":setMainAddressVar}

    return(
        <>
            <MyPage_SideBar/>
            <div className="infoSection">
                <h1 className="infoSectionTitle">개인정보 기록 및 수정</h1>
                <ul className="infoList">
                    {socialLogin?
                        <>
                            <li>소셜 로그인은 아이디를 공개하지 않습니다</li>
                            <li>소셜 로그인은 패스워드를 공개하지 않습니다</li>
                        </>:
                        <>
                            <li><MyPage_InputSection {...VariableSetting} name="uid"/></li>
                            <li><MyPage_InputSection {...VariableSetting} name="upass"/></li>
                        </>}
                    <li><MyPage_InputSection {...VariableSetting} name="uname"/></li>
                    <li><MyPage_InputSection {...VariableSetting} name="uage" values={handleData}/></li>
                    <li><MyPage_InputSection {...VariableSetting} name="ugender"/></li>
                    <li><MyPage_InputSection {...VariableSetting} name="uaddress"/></li>
                    <li><MyPage_InputSection {...VariableSetting} name="uemail"/></li>
                    <li><MyPage_InputSection {...VariableSetting} name="uphone" values={handleData}/></li>
                </ul>
                {editerOnOff>0?<button className="withdrawButton" onClick={dataFixer}>수정 내용 저장</button>:""}
                <button className="withdrawButton" onClick={idDrop}>회원 탈퇴</button>
            </div>
        </>
    );
}