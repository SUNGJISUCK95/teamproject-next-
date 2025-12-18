import IdPwSearch from "@/app/(Auth)/IdPwSearch/IdPwSearch.jsx";
import './IdPwSearch.css'

export default async function IdPwSearchPage({searchParams}){


    // const mode = searchParams.mode;
    const resolvedSearchParams = await searchParams;

    const defaultMode = 'findId'; // 원하는 기본값으로 변경하세요.
    const mode = resolvedSearchParams.mode || defaultMode;


    return(
        <div className="IdPwSearchContainer">
            <IdPwSearch mode={mode}/>
        </div>
    )
}