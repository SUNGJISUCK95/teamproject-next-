
export function SignUp_Label({id, type, name,formData, focusIn, focusOut, handleChange, placeholderJudge,inputRefs,stringPlacer}){

    return(
    <>
    {placeholderJudge[id]===""&& formData[id]===""?
        <label id={id} htmlFor={id} className="NamePlaceholderIn">{stringPlacer[id][0]}</label>:
        placeholderJudge[id]==="true"?
            <label id={id} className="NamePlaceholderOut">{stringPlacer[id][0]}</label>:
            id !== "passcheck"?
            (formData[id]!==""?
                <label id={id} className="NamePlaceholderOut">{stringPlacer[id][1]}</label>:
                <label id={id} htmlFor={id} className="NamePlaceholderOutWaring">{stringPlacer[id][0]}</label>
            ):
            (formData.pass!==formData.passcheck?
                <label id={id} htmlFor={id} className="NamePlaceholderOutWaring">{stringPlacer[id][1]}</label>:
                formData.passcheck===""?
                <label id={id} htmlFor={id} className="NamePlaceholderOutWaring">{stringPlacer[id][3]}</label>:
                <label id={id} className="NamePlaceholderOut">{stringPlacer[id][2]}</label>
            )
    }
    </>
    )
}