
export function WarningMessage(initialArray,formData,showIdPass,idDupl){
    const keys = Object.keys(initialArray)

    //필수 입력 항목을 key값으로, 해당 항목이 비었을 때의 출력 값을 value로 갖는 배열 생성
    const mainKey=showIdPass?
        {"id":"아이디","pass":"비밀번호",
            "passcheck":"비밀번호 확인","name":"이름",
            "age":"나이","gender":"성별",
            "mainAddress":"도로명 주소","detailAddress":"상세 주소"}
        :
        {"name":"이름",
            "age":"나이","gender":"성별",
            "mainAddress":"도로명 주소","detailAddress":"상세 주소"};
    let mainAlertMessage = "";
    for (const key of keys){
        const value = formData[key];
        if(value===""){
            if(Object.keys(mainKey).includes(key)){
                mainAlertMessage=mainAlertMessage+mainKey[key]+" 값이 비었습니다.\n";
            }
        }
    }
    //비밀번호와 비밀번호 확인란 차이 확인
    if(showIdPass && (formData.pass !== formData.passcheck))
    {
        mainAlertMessage = mainAlertMessage+"\n비밀번호가 다릅니다. 확인해주세요."
    }
    if(!idDupl && showIdPass){//중복확인 통과시 문제없음. 안했거나 통과 못하면 경고 메시지
        mainAlertMessage = mainAlertMessage+"\n아이디 중복확인을 해주세요."
    }
    return mainAlertMessage;
}