"use client"

import Swal from 'sweetalert2';
import {idDuplCheck, randomString8to16, sendSignUpData, usePostCode} from "@/utils/auth/authAPI";
import React, {useState,useMemo} from 'react'
import {useRouter} from "next/navigation";

import {SignUp_InputBox} from "@/app/(Auth)/signUp/SignUp/InputBox/SignUp_InputBox";
import {SignUp_Label} from "@/app/(Auth)/signUp/SignUp/InputBox/SignUp_Lable";
import {SignUp_GenderSelect} from "@/app/(Auth)/signUp/SignUp/Gender/SignUp_GenderSelect";
import {SignUp_PostCodeBox} from "@/app/(Auth)/signUp/SignUp/Postcode/SignUp_PostCodeBox";
import {SignUp_EmailSection} from "@/app/(Auth)/signUp/SignUp/Email/SignUp_EmailSection";

import {PhoneNumberSetter} from "@/components/Auth/PhoneNumberSetter";
import {WarningMessage} from "@/app/(Auth)/signUp/WarningMessage";

export function SignUp(){

    //얘가 null이면 그냥 회원가입, null이 아니면 소셜 회원가입-localstorage쓸려면 useclient에 넣어야함
    const usersocialid = localStorage.getItem("loginInfo");

    // 소셜로그인인 경우 아이디 비번 제거를 위해 선언
    // showIdPass==true 인 경우 : 소셜 로그인 아님 ||| showIdPass==false 인 경우 : 소셜 로그인임
    let showIdPass;
    let loginInfoObject;
    if(usersocialid==null)
    {
        showIdPass=true;
    }
    else
    {
        showIdPass=false;
        loginInfoObject = JSON.parse(usersocialid);
    }
    const randompassword = randomString8to16();

    const initialArray = showIdPass?
        {id : "", pass : "", passcheck:"", name : "", age:"",
            gender:"",mainAddress:"",postcode:"", detailAddress:"", emailAddress:"",
            emailList:"default", phone:"", jwToken:true, socialDupl : true} :
        {id : "", pass : "", passcheck:"", name : "", age:"",
            gender:"",mainAddress:"",postcode:"", detailAddress:"", emailAddress:"",
            emailList:"default", phone:"", jwToken: loginInfoObject["userId"], socialDupl : false};



    //초기값 세팅을 위한 initialArray선언 및 초기값 선언
    const [formData, setFormData]=useState(initialArray);
    const [placeholderJudge, setPlaceholderJudge] = useState(initialArray);
    const [passLook,setPassLook] = useState(false);
    const passInputType = passLook ? "text" : "password"; // 패스워드 보이기 안보이기 설정용
    const [idDupl,setIdDupl] = useState(false)
    const router = useRouter();
    const inputRefs = useMemo(() => {// reduce를 사용하여 각 키값에 대응하는 Ref 객체 생성.
        const keys = Object.keys(initialArray);
        return keys.reduce((acc, currentKey) => {
            // 필드이름+Ref : ref값 생성
            acc[`${currentKey}Ref`] = React.createRef();
            return acc;
        }, {});
    }, []);

    // 주소값을 가져오기 위한 선언 - authAPI
    const {handleClick} = usePostCode(formData, setFormData);


//입력, 마우스 클릭, 마우스 떼기 등 진행 시 변화 감지 코드
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({...formData,  [name] : value})
        if(name === "id")
        {
            setIdDupl(false);//아이디 값이 새로 입력될 경우 중복확인 다시 하게 만듬.
        }
        else if(name === "age")//나이는 숫자만 입력받음
        {
            const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
            setFormData({...formData,  [name] : onlyNumbers})
        }
        else if(name ==="phone")
        {
            let formattedValue =PhoneNumberSetter(value);

            // 폼 데이터에 하이픈이 삽입된 값으로 설정
            setFormData({...formData,  [name] : formattedValue});
        }
        // console.log(formData)
    }

    const focusIn = (e) =>{
        const {name} = e.target;
        setPlaceholderJudge({...placeholderJudge,  [name] : "true"})
    }

    const focusOut= (e) =>{
        const {name} = e.target;
        setPlaceholderJudge({...placeholderJudge,  [name] : "aftertrue"})
    }

    //아이디 중복확인 버튼
    const IdDupleCheck = async() => {
        const duplResult = await idDuplCheck(formData.id);

        if(!duplResult){//duplResult=true면 중복있음, false면 중복없음
            //!duplResult은 중복이 없을때 true가 됨
            setIdDupl(true);
        }
        else{
            setFormData({...formData,  [id] : ""});
            await Swal.fire({icon: 'error', text:"아이디 중복! 다시 입력해주세요"});
            inputRefs.idRef.current.focus();
        }
    }


    // 제출버튼을 누를 경우 빈값 확인 후 필수 요소에 빈값이 있는 경우 경보 발동
    // 비밀번호가 다를 경우 경보 발동
    // 이후 입력받은 정보들을 백으로 전달 예정-현재(11.03) 미구현
    const signupOnSubmit = (e) =>{
        e.preventDefault();

        let mainAlertMessage = WarningMessage(initialArray,formData,showIdPass,idDupl)


        // console.log("newEmptyCheck : ",newEmptyCheck);
        //경보 메세지가 비어있지 않을 경우(필수 입력 항목이 비었거나 비밀번호가 다른 경우) 경보 메세지 출력
        if(mainAlertMessage!==""){
            Swal.fire({icon: 'error', html:mainAlertMessage.replace(/\n/g,'<br/>')});
        }
        else{
            sendSignUpData(formData);
            Swal.fire({icon: 'info', text:"가입 완료. 홈페이지로 돌아갑니다"})
            // navigate('/')
            router.push("/");
        }
    }

    //리셋 버튼. 누르면 전부 초기화
    const resetButton =(e)=>{
        setFormData(initialArray);
        setPlaceholderJudge(initialArray);
    }

    const stringPlacer = {
        id : ["ID를 입력해주세요","ID를 입력하셨습니다"],
        pass : ["비밀번호를 입력해주세요","비밀번호를 입력하셨습니다"],
        passcheck:["비밀번호를 똑같이 입력해주세요","비밀번호가 다릅니다","비밀번호를 똑같이 입력하셨습니다","비밀번호가 비었습니다"],
        name : ["이름을 입력해주세요","이름을 입력하셨습니다"],
        age:["나이를 입력해주세요","나이를 입력하셨습니다"],
        gender:"",
        detailAddress:["상세 주소를 입력해주세요","상세 주소를 입력하셨습니다"],
        emailAddress:["이메일 주소를 입력해주세요","이메일 주소를 입력하셨습니다"],
        phone:["전화번호를 입력해주세요","전화번호를 입력하셨습니다"]
    }



    const sharedData = {
        "formData":formData,
        "focusIn":focusIn,
        "focusOut":focusOut,
        "handleChange":handleChange,
        "placeholderJudge" :  placeholderJudge,
        "inputRefs" : inputRefs,
        "stringPlacer" : stringPlacer
    }

return(
    <form onSubmit={signupOnSubmit}>
        <h1 className="SignTitle">회원가입 페이지입니다.</h1>
        { showIdPass &&
            <>
                <div className = "IdPassSection">
                    <h3>반드시 입력해주세요</h3>
                    <h1 className="IdPassTitle">접속 정보란입니다</h1>
                    <div className="IdBox">
                        <div className='ConsoleBoxWrapper'>
                            <SignUp_InputBox id="id" type="text" name="id" {...sharedData}/>
                            <SignUp_Label id="id" {...sharedData}/>
                        </div>
                        {idDupl?
                            <button type='button' className = 'IdDuplCheck'>중복확인 성공</button>:
                            <button type='button' className = 'IdDuplCheck' onClick={IdDupleCheck}>중복확인</button>}
                    </div>
                    <div className="PassBox">
                        {/* passLook의 값에따라 비밀번호 형식 또는 문자열 형식 표시 */}
                        <div className='ConsoleBoxWrapper'>
                            <SignUp_InputBox id="pass" type={passInputType} name="pass" {...sharedData}/>
                            <SignUp_Label id="pass" {...sharedData}/>
                        </div>
                        <div className='ConsoleBoxWrapper'>
                            <SignUp_InputBox id="passcheck" type={passInputType} name="passcheck" {...sharedData}/>
                            <SignUp_Label id="passcheck" {...sharedData}/>
                        </div>
                        {passLook?
                            <button
                                type='button'
                                className = 'passlook' onClick={()=>setPassLook(!passLook)}>비밀번호 가리기</button>:
                            <button
                                type='button'
                                className = 'passlook' onClick={()=>setPassLook(!passLook)}>비밀번호 확인</button>}

                    </div>
                </div>
            </>
        }
        <div className= "PrivateInfoSection">
            <h3>반드시 입력 및 선택해주세요</h3>
            <h1>개인 정보란 입니다</h1>
            <div className = "PrivateInfoBox">
                <div className='ConsoleBoxWrapper'>
                    <SignUp_InputBox id="name" type="text" name="name" {...sharedData}/>
                    <SignUp_Label id="name" {...sharedData}/>
                </div>
                <div className='ConsoleBoxWrapper'>
                    <SignUp_InputBox id="age" type="text" name="age" {...sharedData}/>
                    <SignUp_Label id="age" {...sharedData}/>
                </div>
                <SignUp_GenderSelect formData={formData} handleChange={handleChange}/>
                <SignUp_PostCodeBox formData={formData} setFormData={setFormData}/>
                <div className='ConsoleBoxWrapper'>
                    <SignUp_InputBox id="detailAddress" type="text" name="detailAddress" {...sharedData}/>
                    <SignUp_Label id="detailAddress" {...sharedData}/>
                </div>
            </div>
        </div>
        <div className = "PrivateConnInfoSection">
            <h1>연락처를 작성해주세요</h1>
            <div className = "PrivateConnInfoBox">
                <SignUp_EmailSection formData ={formData} handleChange={handleChange} sharedData={sharedData}/>
                <div className='ConsoleBoxWrapper'>
                    <SignUp_InputBox id="phone" type="text" name="phone" {...sharedData}/>
                    <SignUp_Label id="phone" {...sharedData}/>
                </div>
            </div>
        </div>
        <div className="lastButtoBox">
            <div className="lastButton">
                <button type='reset' onClick={resetButton}>리셋</button>
                <button type='submit'>제출</button>
            </div>
        </div>
    </form>
    );

}