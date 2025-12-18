

export const AuthInputBox=({boxType, handleInfo,value})=>{


    const dataRiser=(e)=>{
        const {name, value} = e.target;
        handleInfo(name,value)
    }

    return <input className="underline_inputBox" name={boxType} onChange={dataRiser} value={value}/>;
}

export const AuthInputButton = ({buttonType,Clicker}) =>{

    const setselectedTap=()=>{
        Clicker(buttonType);
    }
    return(
        <>
            {
                buttonType==="Id"?
                    <button onClick={setselectedTap}>아이디 찾기 전 인증 하기</button>:
                    buttonType==="Pw"?
                        <button onClick={setselectedTap}>비밀번호 바꾸기 전 인증 하기</button>:
                        buttonType==="Auth"?
                            <button onClick={setselectedTap}>인증번호 입력하기</button>:
                            <button onClick={setselectedTap}>비밀번호 변경하기</button>
            }
        </>
    )
}
