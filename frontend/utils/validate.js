/**
 * 로그인 폼 체크
 */
export const validateFormCheck = ({ idRef, pwdRef, setErrors, errors }) => {
    if(idRef.current.value === "") {
        setErrors({...errors, id: "아이디를 입력해주세요"});
        idRef.current.focus();
        return false;
    } else if(pwdRef.current.value === "") {
        setErrors({...errors, pwd: "패스워드를 입력해주세요"});
        pwdRef.current.focus();
        return false;
    }
    return true;
}


/**
 * 회원가입 폼 체크 - 안쓸듯
 */
export function validateSignupFormCheck({refs, setErrors}) {
    if(refs.idRef.current.value === "") {
        setErrors({id: "아이디를 입력해주세요"});
        refs.idRef.current.focus();
        return false;
    } else if(refs.emailDomainRef.current.value === "default") {
        setErrors({emailDomain: "이메일 주소를 선택해주세요"});
        refs.emailDomainRef.current.focus();
        return false;
    }
    return true;
}