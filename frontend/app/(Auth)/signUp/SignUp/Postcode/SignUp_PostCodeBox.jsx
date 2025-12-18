
import {usePostCode} from "@/utils/auth/authAPI";

export function SignUp_PostCodeBox({formData, setFormData}){

    
    const {handleClick} = usePostCode(formData, setFormData);

    return(
    <>
    <button
        className = "MainAddress"
        type="button" 
        onClick={handleClick}>주소 검색 버튼
    </button>
    <input
        type="text"
        className="MainAddress"
        id="mainAddress"
        value={formData.mainAddress}
        placeholder='위의 버튼으로 주소를 검색하세요.'
        readOnly
    />
    </>
    )
}