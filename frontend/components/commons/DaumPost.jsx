import React from 'react';
import '../../styles/daumPost.css';
import {useDaumPostcodePopup} from "react-daum-postcode";

export default function DaumPost({onComplete}){
    const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    const open = useDaumPostcodePopup(postcodeScriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') extraAddress += data.bname;
            if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        onComplete({
            postcode: data.zonecode,
            address: fullAddress
        });
    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return <div className="find_address_button" type="button" onClick={handleClick}>주소검색</div>;
};
