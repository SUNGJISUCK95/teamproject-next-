

export function IdPwSearch_selectTab({PTC,Ptype}){



    return(
        <div>
            <ul className="IdPwSearchTabNav">
                <li 
                    onClick={()=>{PTC("findId")}}
                    className={Ptype === "findId" ? "active" : ""}
                >
                    계정 아이디 찾기
                </li>
                <li 
                    onClick={()=>{PTC("changePass")}}
                    className={Ptype === "changePass" ? "active" : ""}
                >
                    계정 비밀번호 변경하기
                </li>
            </ul>
        </div>
    )
}