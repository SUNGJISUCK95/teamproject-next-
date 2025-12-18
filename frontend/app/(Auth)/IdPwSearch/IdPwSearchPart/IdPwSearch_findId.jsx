
import { AuthInputBox , AuthInputButton} from "./IdPwSearch_InputAndButton.jsx";

export function IdPwSearch_findId({buttonType,handleInfo,searchUserinfo,Clicker}){

    return(
        <div>
            {buttonType==="Id"?<h1>아이디 찾기를 위한 인증 칸</h1>:<h1>비밀번호 변경을 위한 인증 칸</h1>}            
            <ul className="IdPwSearchFormList">
                <li>이메일 주소 :&nbsp;<AuthInputBox boxType="uemail" handleInfo = {handleInfo} value={searchUserinfo.uemail||''}/></li>
                <li>본인 이름 :&nbsp;<AuthInputBox boxType="uname" handleInfo = {handleInfo} value={searchUserinfo.uname||''}/></li>
                {buttonType!="Id"?<li>아이디 :&nbsp;<AuthInputBox boxType="uid" handleInfo = {handleInfo} value={searchUserinfo.uid||''}/></li>:""}
            </ul>
            <div className="IdPwSearchAuthButton">
                <AuthInputButton buttonType = {buttonType} Clicker={Clicker}/>
            </div>
        </div>
    )
}