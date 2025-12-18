

export function SignUp_EmailSelect({formData,handleChange}){

    return(
    <>
    <select id="emailList" name="emailList" value={formData.emailList} onChange={handleChange}>
        <option value="default">직접 입력</option>
        <option value="naver.com">naver.com</option>
        <option value="daum.com">daum.com</option>
        <option value="gmail.com">gmail.com</option>
    </select>
    </>
    )
}