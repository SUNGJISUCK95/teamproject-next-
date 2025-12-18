// import { SignUp_InputBox } from "../SignUp/InputBox/SignUp_InputBox"
// import { SignUp_GenderSelect } from "../SignUp/Gender/SignUp_GenderSelect"
// import { SignUp_PostCodeBox } from "../SignUp/Postcode/SignUp_PostCodeBox"

import {SignUp_InputBox} from "@/app/(Auth)/signUp/SignUp/InputBox/SignUp_InputBox";
import {SignUp_GenderSelect} from "@/app/(Auth)/signUp/SignUp/Gender/SignUp_GenderSelect";
import {SignUp_PostCodeBox} from "@/app/(Auth)/signUp/SignUp/Postcode/SignUp_PostCodeBox";


export function MyPage_InputSection({values,mainAddressVar,setMainAddressVar,dataChangeButtonOnOff,nameString,handleChange,DataChangeClose,IdDupleCheck,idChecker,DataChangeOpen,info,name}){
    return(
    <>
        {dataChangeButtonOnOff[name]?
        <>
            <span>{nameString[name]} 변경 </span>
            
            {name==="ugender"?
                <>
                <SignUp_GenderSelect handleChange={handleChange} />
                <button name={name} onClick={DataChangeClose}> 취소</button>
                </>
                :
                <>
                {name==="uaddress"?<SignUp_PostCodeBox formData={mainAddressVar} setFormData={setMainAddressVar}/>:""}
                <SignUp_InputBox name = {name} id={name} handleChange={handleChange} formData={values}/>
                <button name={name} onClick={DataChangeClose}> 취소</button>
                {name==="uid"?
                    idChecker?<button>중복 체크 OK </button>:<button onClick={IdDupleCheck}>중복 체크</button>
                :""}
                </>
            }
        </>:
        <>  
            {info[name]} <button name={name} onClick={DataChangeOpen}> {nameString[name]} 수정</button>
        </>}
    </>
    )
}