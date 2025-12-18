
export function SignUp_GenderSelect({formData = {},handleChange}){

    return(
        <>
        {Object.keys(formData).length === 0?
            <>
                <select id="ugender" name="ugender" onChange={handleChange}>
                <option value="default">성별 선택</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="기타 혹은 선택거부">기타 혹은 선택거부</option>
                </select>
            </>:
            <>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="default">성별 선택</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="기타 혹은 선택거부">기타 혹은 선택거부</option>
                </select>
            </>
            }
        </>
    );
}