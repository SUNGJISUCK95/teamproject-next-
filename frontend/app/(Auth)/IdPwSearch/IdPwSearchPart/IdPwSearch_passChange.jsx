import { AuthInputBox , AuthInputButton} from "./IdPwSearch_InputAndButton.jsx";

export function IdPwSearch_passChange({handleInfo,searchUserinfo,Clicker}){

    return(
    <>
    <ul className="IdPwSearchFormList">
        <li>비밀번호 :&nbsp;<AuthInputBox boxType="upass" handleInfo = {handleInfo} value={searchUserinfo.upass||''}/></li>
        <li>비밀번호 확인 :&nbsp;<AuthInputBox boxType="upassCheck" handleInfo = {handleInfo} value={searchUserinfo.upassCheck||''}/></li>
    </ul>
    <div className="IdPwChangeButton">
        <AuthInputButton buttonType = "passCheck" Clicker={Clicker}/>
    </div>
    </>)
}