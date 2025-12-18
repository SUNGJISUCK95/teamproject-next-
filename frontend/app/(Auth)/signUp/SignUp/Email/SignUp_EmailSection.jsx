import { SignUp_InputBox } from "../InputBox/SignUp_InputBox";
import { SignUp_Label } from "../InputBox/SignUp_Lable";
import { SignUp_EmailSelect } from "./SignUp_EmailSelect";

export function SignUp_EmailSection({formData,handleChange,sharedData}){
    return(
        <>
        <div className = "EmailAddressBox">
            <div className = "EmailAddressFront">
                <div className='ConsoleBoxWrapper'>
                    <SignUp_InputBox id="emailAddress" type="text" name="emailAddress" {...sharedData}/>
                    <SignUp_Label id="emailAddress" {...sharedData}/>
                </div>
            </div>
            <div className = "EmailAddressBack">
                {formData.emailList==="default"?<p></p>:<span>@</span>}
                <SignUp_EmailSelect formData={formData} handleChange={handleChange}/>
            </div>
        </div>
        </>
    )
}