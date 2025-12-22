import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"

export default function useKakaoLoader() {
    useKakaoLoaderOrigin({
        appkey: "ba6d5501eeb4a5d8098250cf5972fc00",
        libraries: ["clusterer", "drawing", "services"],
    })
}