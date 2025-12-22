import cityBikeImage from "@/utils/rental_util/cityBikeImage";

export const getDistance = (startLat, startLon, endLat, endLon) => {
        // 주 지점이 같은 경우 0km 반환
        if ((startLat === endLat) && (startLon === endLon)) {
            return 0;
        }
    
        // 지구의 평균 반지름 (단위: km)
        const earthRadiusKm = 6371;
    
        // 도(각도: 위도, 경도)를 라디안으로 변환
        const degreesToRadians = Math.PI / 180;
    
        // 위도 및 경도 차이를 라디안으로 변환
        const latDifferenceRad = (endLat - startLat) * degreesToRadians;
        const lonDifferenceRed = (endLon - startLon) * degreesToRadians;
    
        // Haversine 공식의 값 계산
        const haversineValueA =
            Math.sin(latDifferenceRad / 2) * Math.sin(latDifferenceRad / 2) +
            Math.cos(startLat * degreesToRadians) * Math.cos(endLat * degreesToRadians) *
            Math.sin(lonDifferenceRed / 2) * Math.sin(latDifferenceRad / 2);
    
        // Haversine 공식의 c값 계산 (두 지점 사이의 호의 중심 각, 라디안)
        const centralAngleArc = 2 * Math.atan2(Math.sqrt(haversineValueA), Math.sqrt(1 - haversineValueA));
    
        // 최종 거리 계산 (거리 = 반지름 * 호의 길이)
        const distanceKm = earthRadiusKm * centralAngleArc;
    
        return distanceKm;
    }

    // 기본 마커 이미지
    export const defaultMarkerImage = {
        src: 'http://t1.daumcdn.net/mapjsapi/images/marker.png',
        size: { width: 30, height: 50 },
    };

    // 선택된 마커 이미지
    export const selectedMarkerImage = {
        src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 예시로 빨간 마커 사용
        size: { width: 40, height: 60 }, // 크기를 다르게 하여 시각적으로 강조
    };

    const imageKey = ["seoulBike"];
    export const imagePath = cityBikeImage[imageKey];