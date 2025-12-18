export function PhoneNumberSetter(value){

    // // 1. 입력된 값에서 숫자만 추출
    const onlyNumbers = value.replace(/[^0-9]/g, '');
    let formattedValue = onlyNumbers;

    // 2. 최대 11자리까지만 처리 (ex: 01012345678)
    const maxLength = 11;
    const slicedNumbers = onlyNumbers.slice(0, maxLength);

    // 3. 추출된 숫자의 길이에 따라 하이픈 자동 삽입 (3-4-4 패턴)
    if (slicedNumbers.length > 3 && slicedNumbers.length <= 7) {
        // 4자리 ~ 7자리: 000-0000 패턴
        formattedValue = `${slicedNumbers.slice(0, 3)}-${slicedNumbers.slice(3)}`;
    } else if (slicedNumbers.length > 7) {
        // 8자리 ~ 11자리: 000-0000-0000 패턴
        formattedValue = `${slicedNumbers.slice(0, 3)}-${slicedNumbers.slice(3, 7)}-${slicedNumbers.slice(7)}`;
    }

    return formattedValue;
}