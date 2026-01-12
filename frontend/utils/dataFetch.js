import axios from 'axios';
import { useAuthStore } from "@/store/authStore.js";

/**
 * axios 환경 설정 - 쿠키 저장, 기본  URL
 * @type {axios.AxiosInstance}
 */
const api = axios.create({
    baseURL: "http://54.180.89.176:9000",
    withCredentials: true,
});


/**
 * 제목 : 요청(Request) 인터셉터
 * 브라우저(클라이언트)에서 '요청주소(ex. /product/all)'로 실제 요청을 보내기 직전에 실행된다.
 * 브라우저 → axios 요청 발생 → Request Interceptor 실행 → 서버(Spring Boot)로 전송
 */
/**
 * [수정됨] 요청(Request) 인터셉터
 * 기능 1: API 요청 전 헤더에 토큰(AccessToken) 자동 주입
 * 기능 2: (NEW!) 새로고침 시 Zustand 초기화로 토큰이 날아갔을 경우, LocalStorage에서 자동 복구
 */
// api.interceptors.request.use(
//     (config) => {
//         let token = useAuthStore.getState().accessToken;
//
//         if (!token) {
//             const storageData = localStorage.getItem("loginInfo");
//             if (storageData) {
//                 try {
//                     const parsedData = JSON.parse(storageData);
//                     // 💡 여기서 키 이름을 result 객체와 똑같이 맞춰야 합니다!
//                     // 만약 백엔드에서 준 키가 'token'이면 parsedData.token으로 써야 합니다.
//                     token = parsedData?.accessToken || parsedData?.token;
//
//                     if (token) {
//                         useAuthStore.getState().setAccessToken(token);
//                     }
//                 } catch (e) {
//                     console.error("복구 에러:", e);
//                 }
//             }
//         }
//
//         if (token && !config.url.includes("/auth/refresh")) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//
//         // 🔥 [매우 중요] 이 줄이 없으면 요청이 멈춥니다.
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        const url = config.url || "";

        if (token != null && !url.includes("/auth/refresh")) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


/**
 * 제목 : 응답(Response) 인터셉터
 * 서버(Spring Boot)가 응답을 보내고, 브라우저가 그 응답을 받은 직후 실행된다.
 * 컨트롤러의 return 결과가 axios에게 도달한 다음 → interceptor 실행
 */
api.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        const original = err.config;

        if (err.response?.status === 401 && !original._retry) { //왼쪽 값이 null 또는 undefined 인 경우 → 오류를 던지지 않고 undefined 를 반환
            original._retry = true;
            try {
                const { data } = await api.post( "/auth/refresh",
                    {},
                    { headers: { "Content-Type": "application/json" }
                    });

                console.log("🟢 새 accessToken", data.accessToken);

                // 새로운 accessToken 등록!
                useAuthStore.getState().setAccessToken(data.accessToken);
                original.headers.Authorization = `Bearer ${data.accessToken}`;

                console.log("🟢 재시도 Authorization", original.headers.Authorization);
                console.log("📦 useAuthStore.token", useAuthStore.getState().accessToken);

            // return axios(original); // 원래 요청 시도
            return api(original);

            } catch (e) {
                return Promise.reject(e);
            }
        }
        return Promise.reject(err);
    }
);


export const groupByRows = (array, number) => {
    const rows = array.reduce((acc, cur, idx) => { 
        if(idx % number === 0){
            acc.push([cur]); 
        }else {
            acc[acc.length-1].push(cur); 
        }
        return acc;
        
    }, []);

    return rows;
}


/**
 * axios 함수를 이용하여 데이터 가져오기
 */

export const axiosData = async(url) => {
    const response = await axios.get(url);
    return response.data;
}

/**
 * fetch 함수를 이용하여 데이터 가져오기
 */

export const fetchData = async(url) => {
    const response = await fetch(url);
    const jsonData = await response.json(); 
    return jsonData;
}

////////////////////////////////////////////////

/**
 * axios 함수를 이용하여 백엔드 연동 처리 //DB 경우
 */

// export const axiosGet = async (url) => {
//    console.log("url => ", url);
//     const response = await axios.get(url);
// //    console.log(response);

// //    위 방식 또는
// //    const response = await axios({
// //        method:"GET",
// //        url: url,
// //        data: formData
// //    })

//     return response.data;
// }

export const axiosGet = async (url) => {
    try{
        const reqUrl = `${url}`;
        // const reqUrl = `${url}`;
        const response = await api.get(reqUrl);
        return response?.data;
    }catch(error) {
        console.log("🎯 에러발생, 페이지 이동합니다!!");

    }
}


/**
 * axiosPost 함수를 이용한 백엔드 연동 처리
 */

// export const axiosPost = async (url, formData) => { //axios는 json()으로 파싱작업 필요없음 (자동으로 해줌)
// //    const response = await axios.post(url, 데이터, 환경설정);
//     const response = await axios.post(url, formData, {"Content-Type": "application/json"});
// //    console.log(response);

// //    위 방식 또는
// //    const response = await axios({
// //        method:"POST",
// //        url: url,
// //        headers: { "Content-Type": "application/json" },
// //        data: formData
// //    })
//     return response.data;
// }

export const axiosPost = async (url, data) => {
    try{
        // const reqUrl = `http://localhost:9000${url}`;
        const reqUrl = `${url}`;
        const csrfToken = getCsrfTokenFromCookie();//보낼때 헤더에 토큰 넣어서 보내기.
        const headers = { "Content-Type": "application/json"}
        if(csrfToken){
            headers['X-XSRF-TOKEN'] = csrfToken; // 👈 XSRF 헤더 추가
        } else {
            console.log("CSRF 토큰이 없어 403 에러가 발생할 수 있습니다.");
        }

        console.log("reqURL :: ", reqUrl, data);
        const response = await api.post( reqUrl, data,
            { headers: headers } // 수정된 헤더 사용
        );
        return response.data;
    }catch(error) {
        console.log("🎯 에러발생, 페이지 이동합니다!!", error);
    }
}

export const axiosDataPost = async (url, data, customHeaders={}) => {
    try {
        const reqUrl = `http://localhost:9000${url}`;

        const headers = {
            "Content-Type": "application/json",
            ...customHeaders
        };

        if (typeof document !== "undefined") {
            const csrfToken = getCsrfTokenFromCookie();
            if(csrfToken) headers['X-XSRF-TOKEN'] = csrfToken;
        }
        else if (customHeaders.Cookie) {
            const cookies = customHeaders.Cookie.split(';');
            const xsrfCookie = cookies.find(c => c.trim().startsWith('XSRF-TOKEN='));

            if (xsrfCookie) {
                const tokenValue = xsrfCookie.split('=')[1];
                headers['X-XSRF-TOKEN'] = tokenValue;
            }
        }

        console.log("reqURL :: ", reqUrl);

        const response = await api.post(reqUrl, data, { headers }); // api.post 대신 axios.post 권장 (서버사이드 이슈 방지)
        return response.data;

    } catch(error) {
        console.log("🎯 에러발생:", error.response ? error.response.status : error);
        throw error;
    }
}

const getCsrfTokenFromCookie = () => {
    if (typeof document === 'undefined') {
        return "";
    }
    const name = "XSRF-TOKEN=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};