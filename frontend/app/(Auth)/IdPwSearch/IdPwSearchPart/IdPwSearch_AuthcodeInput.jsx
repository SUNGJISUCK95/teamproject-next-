import { AuthInputBox , AuthInputButton} from "./IdPwSearch_InputAndButton.jsx";

export function IdPwSearch_AuthcodeInput({handleInfo,Clicker}){

    return(
        <>
        <div className="IdPwSearchContent">
            <h1>인증 코드 입력</h1>
            <ul className="IdPwSearchFormList">
                <li>인증 코드 :&nbsp;<AuthInputBox boxType="authCodeIdPw" handleInfo = {handleInfo}/></li>
            </ul>
            <div className="IdPwSearchAuthButton">
                <AuthInputButton buttonType = "Auth" Clicker={Clicker}/>
            </div>
        </div>
        </>
    )
}