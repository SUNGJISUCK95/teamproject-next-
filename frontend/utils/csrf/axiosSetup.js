/**
 전역으로 사용하는 axios 설정
 csrf 토큰 요청시 주의사항
 - 쿠키 요청을 항상 true로 설정
 - CRA Proxy 사용여부에 따라 ip 주소 변경
 */
import axios from "axios";

// ✅ 쿠키를 보내야 하므로
axios.defaults.withCredentials = true;

// (선택) CRA proxy 사용하는 경우 baseURL 불필요
// axios.defaults.baseURL = "http://localhost:8080";

export default axios;