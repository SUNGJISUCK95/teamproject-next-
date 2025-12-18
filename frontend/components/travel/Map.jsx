"use client";

import { useEffect, useState, useRef } from "react";
import { getMarkerList } from '@/utils/travel/mapAPI.js';
import { getTravelFoodList } from '@/utils/travel/travelFoodAPI.js';
import { getTravelHotelList } from '@/utils/travel/travelHotelAPI.js';
import { getTravelRepairList } from '@/utils/travel/travelRepairAPI.js';

export default function Map({
                                handleMenuClick,
                                handleMapGoBack,
                                handleListDetail,
                                type,
                                selectedDid
                            }) {

    const [travelFoodList, setTravelFoodList] = useState([]);
    const [travelHotelList, setTravelHotelList] = useState([]);
    const [travelRepairList, setTravelRepairList] = useState([]);
    const [number, setNumber] = useState(3);

    const mapRef = useRef(null);
    const markersRef = useRef([]);
    const baseMarkersRef = useRef([]);
    const typeMarkersRef = useRef([]);

    const defaultCenter = useRef({ lat: 36.5, lng: 127.8 });

    const markerMapRef = useRef({
        food: {},
        hotel: {},
        repair: {}
    });

    const pointRef = useRef({ startPoint: null, endPoint: null });
    const routeLineRef = useRef(null);

    // ================================================================
    // 1) Kakao Map SDK Script Load (필수)
    // ================================================================
    useEffect(() => {
        if (typeof window === "undefined") return;

        if (window.kakao && window.kakao.maps) return;

        const script = document.createElement("script");
        script.src =
            `//dapi.kakao.com/v2/maps/sdk.js?appkey=13052c0aa951d8be4109ba36bf555930&autoload=false`;
        script.async = true;

        script.onload = () => {
            console.log("Kakao Maps SDK Loaded");
        };

        document.head.appendChild(script);
    }, []);

    // ================================================================
    // 2) 시작/도착 지점 선택
    // ================================================================
    function handleMarkerClick(lat, lng) {
        if (!pointRef.current.startPoint) {
            pointRef.current.startPoint = { lat, lng };
            pointRef.current.endPoint = null;
        } else {
            pointRef.current.endPoint = { lat, lng };
            getCarDirection(pointRef.current.startPoint, pointRef.current.endPoint);
        }
    }

    // ================================================================
    // 3) 경로 정보 오버레이
    // ================================================================
    function showRouteInfoOnMap(distance, duration, startPoint, endPoint) {
        if (!mapRef.current) return;

        const infoContent = `
      <div style="padding:5px 10px; background:white; border:1px solid #ccc; border-radius:5px;">
        <div>거리: ${distance} km</div>
        <div>예상 시간: ${duration} 분</div>
      </div>
    `;

        if (routeLineRef.current?.infoOverlay) {
            routeLineRef.current.infoOverlay.setMap(null);
        }

        const infoOverlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(
                (startPoint.lat + endPoint.lat) / 2,
                (startPoint.lng + endPoint.lng) / 2
            ),
            content: infoContent,
            yAnchor: 1.2,
        });

        infoOverlay.setMap(mapRef.current);
        routeLineRef.current.infoOverlay = infoOverlay;
    }

    // ================================================================
    // 4) 카카오 모빌리티 API — 자전거 경로
    // ================================================================
    async function getCarDirection(startPoint, endPoint) {
        const REST_API_KEY = "dc7443a72307e740e0624e32834a863e";
        const url = "https://apis-navi.kakaomobility.com/v1/directions";

        const origin = `${startPoint.lng},${startPoint.lat}`;
        const destination = `${endPoint.lng},${endPoint.lat}`;

        const headers = {
            Authorization: `KakaoAK ${REST_API_KEY}`,
            "Content-Type": "application/json"
        };

        const queryParams = new URLSearchParams({
            origin,
            destination,
            vehicleType: "BICYCLE",
            priority: "RECOMMEND",
        });

        try {
            const response = await fetch(`${url}?${queryParams}`, { method: "GET", headers });
            const data = await response.json();

            const linePath = [];

            data.routes[0].sections.forEach((section) => {
                section.roads.forEach((road) => {
                    for (let i = 0; i < road.vertexes.length; i += 2) {
                        const lng = road.vertexes[i];
                        const lat = road.vertexes[i + 1];
                        linePath.push(new window.kakao.maps.LatLng(lat, lng));
                    }
                });
            });

            const summary = data.routes[0].summary;
            const distanceKm = (summary.distance / 1000).toFixed(1);
            const durationMin = Math.round(summary.duration / 60);

            drawRouteOnMap(linePath, distanceKm, durationMin);
            showRouteInfoOnMap(distanceKm, durationMin, startPoint, endPoint);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    // ================================================================
    // 5) 지도에 경로 그리기
    // ================================================================
    function drawRouteOnMap(linePath, distance, duration) {
        if (!mapRef.current) return;

        if (routeLineRef.current) {
            routeLineRef.current.setMap(null);
            if (routeLineRef.current.infoOverlay) {
                routeLineRef.current.infoOverlay.setMap(null);
            }
        }

        const routeLine = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: "#FF4500",
            strokeOpacity: 0.8,
        });

        routeLine.setMap(mapRef.current);

        const infoContent = `
      <div style="padding:5px 10px; background:white; border:1px solid #ccc; border-radius:5px;">
        <div>거리: ${distance} km</div>
        <div>예상 시간: ${duration} 분</div>
      </div>
    `;

        const infoOverlay = new window.kakao.maps.CustomOverlay({
            position: linePath[Math.floor(linePath.length / 2)],
            content: infoContent,
            yAnchor: 1.2,
        });

        infoOverlay.setMap(mapRef.current);

        routeLine.infoOverlay = infoOverlay;
        routeLineRef.current = routeLine;
    }

    // ================================================================
    // 6) API로 목록 불러오기
    // ================================================================
    useEffect(() => {
        const fetchLists = async () => {
            setTravelFoodList(await getTravelFoodList() || []);
            setTravelHotelList(await getTravelHotelList() || []);
            setTravelRepairList(await getTravelRepairList() || []);
        };
        fetchLists();
    }, []);

    // ================================================================
    // 7) 지도 초기화 + 대표 마커 로드
    // ================================================================
    useEffect(() => {
        const fetch = async () => {
            const data = await getMarkerList(number);
            if (!data) return;

            function initMap() {
                window.kakao.maps.load(() => {
                    const container = document.getElementById("map");

                    const center = new window.kakao.maps.LatLng(
                        defaultCenter.current.lat,
                        defaultCenter.current.lng
                    );

                    const map = new window.kakao.maps.Map(container, {
                        center,
                        level: 12
                    });

                    mapRef.current = map;

                    const host = window.location.hostname;

                    const BASE_URL =
                        host === "localhost"
                            ? "http://localhost:3000"
                            : "http://172.16.250.24:3000";

                    const greenMarkerSrc = `${BASE_URL}/images/travel_markers/marker_main.png`;
                    const redMarkerSrc = `${BASE_URL}/images/travel_markers/marker_main_select.png`;

                    const imageSize = new window.kakao.maps.Size(15, 15);

                    const greenImage = new window.kakao.maps.MarkerImage(greenMarkerSrc, imageSize);
                    const redImage = new window.kakao.maps.MarkerImage(redMarkerSrc, imageSize);

                    const markers = [];
                    baseMarkersRef.current = markers;

                    let activeOverlay = null;

                    // 대표 마커 생성
                    data.forEach(({ mname, lat, lng, mlink, type }) => {
                        const position = new window.kakao.maps.LatLng(lat, lng);

                        const marker = new window.kakao.maps.Marker({
                            position,
                            image: greenImage,
                            map,
                        });

                        const content = `
              <div style="padding:5px 10px; background:white; border:1px solid #ccc; border-radius:5px;">
                <strong>${mname}</strong>
                <br />
                <a href="${mlink}" target="_blank">바로가기</a>
              </div>
            `;

                        const overlay = new window.kakao.maps.CustomOverlay({
                            position,
                            content,
                            yAnchor: 1.2,
                        });

                        window.kakao.maps.event.addListener(marker, "click", () => {
                            handleMarkerClick(lat, lng);

                            markers.forEach((m) => m.setImage(greenImage));
                            marker.setImage(redImage);

                            if (activeOverlay) activeOverlay.setMap(null);
                            overlay.setMap(map);
                            activeOverlay = overlay;

                            map.setLevel(7);
                            map.panTo(new window.kakao.maps.LatLng(lat - 0.001, lng));

                            handleMenuClick(type, mname);
                        });

                        markers.push(marker);
                    });
                });
            }

            if (window.kakao && window.kakao.maps) initMap();
            else {
                const check = setInterval(() => {
                    if (window.kakao && window.kakao.maps) {
                        clearInterval(check);
                        initMap();
                    }
                }, 100);
            }
        };

        fetch();
    }, [number]);

    // ================================================================
    // 8) type 변경 시 - 타입 마커 표시
    // ================================================================
    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) return;

        const listMap = {
            food: travelFoodList,
            hotel: travelHotelList,
            repair: travelRepairList,
        };

        const listToRender = listMap[type] || [];
        if (listToRender.length === 0) return;

        window.kakao.maps.load(() => {
            const map = mapRef.current;
            if (!map) return;

            typeMarkersRef.current.forEach((m) => m.setMap(null));
            typeMarkersRef.current = [];

            if (routeLineRef.current) {
                routeLineRef.current.setMap(null);
                if (routeLineRef.current.infoOverlay)
                    routeLineRef.current.infoOverlay.setMap(null);
                routeLineRef.current = null;
            }

            const host = window.location.hostname;

            const BASE_URL =
                host === "localhost"
                    ? "http://localhost:3000"
                    : "http://172.16.250.24:3000";

            let orangeMarkerSrc = "";
            let selectMarkerSrc = "";

            if (type === "food") {
                orangeMarkerSrc = `${BASE_URL}/images/travel_markers/marker_food.png`;
                selectMarkerSrc = `${BASE_URL}/images/travel_markers/marker_food_select.png`;
            } else if (type === "hotel") {
                orangeMarkerSrc = `${BASE_URL}/images/travel_markers/marker_hotel.png`;
                selectMarkerSrc = `${BASE_URL}/images/travel_markers/marker_hotel_select.png`;
            } else if (type === "repair") {
                orangeMarkerSrc = `${BASE_URL}/images/travel_markers/marker_repair.png`;
                selectMarkerSrc = `${BASE_URL}/images/travel_markers/marker_repair_select.png`;
            }

            const imageSize = new window.kakao.maps.Size(20, 20);
            const orangeImage = new window.kakao.maps.MarkerImage(orangeMarkerSrc, imageSize);

            const selectSize = new window.kakao.maps.Size(45, 45);
            const selectImage = new window.kakao.maps.MarkerImage(selectMarkerSrc, selectSize);

            let activeOverlay = null;

            listToRender.forEach((item) => {
                const { lat, lng, fname, flink } = item;

                const did =
                    type === "food" ? item.fid :
                        type === "hotel" ? item.hid :
                            item.rid;

                const position = new window.kakao.maps.LatLng(lat, lng);

                const marker = new window.kakao.maps.Marker({
                    position,
                    image: orangeImage,
                    map,
                });

                markerMapRef.current[type][did] = marker;

                window.kakao.maps.event.addListener(marker, "click", () => {
                    handleMarkerClick(lat, lng);

                    typeMarkersRef.current.forEach((m) => m.setImage(orangeImage));

                    marker.setImage(selectImage);

                    map.setLevel(5);
                    map.panTo(new window.kakao.maps.LatLng(lat - 0.001, lng));

                    handleListDetail(type, did);
                });

                typeMarkersRef.current.push(marker);
            });
        });
    }, [type, travelFoodList, travelHotelList, travelRepairList]);

    // ================================================================
    // 9) 리스트 → 해당 마커 자동 클릭
    // ================================================================
    useEffect(() => {
        if (!selectedDid || !type) return;

        const marker = markerMapRef.current[type]?.[selectedDid];
        if (marker) {
            window.kakao.maps.event.trigger(marker, "click");
        }
    }, [selectedDid, type]);

    // ================================================================
    // 10) 뒤로 가기 버튼
    // ================================================================
    const handleGoBack = () => {
        if (mapRef.current) {
            const center = new window.kakao.maps.LatLng(
                defaultCenter.current.lat,
                defaultCenter.current.lng
            );

            mapRef.current.panTo(center);
            mapRef.current.setLevel(12);

            typeMarkersRef.current.forEach((marker) => marker.setMap(null));
            typeMarkersRef.current = [];

            pointRef.current.startPoint = null;
            pointRef.current.endPoint = null;

            if (routeLineRef.current) {
                routeLineRef.current.setMap(null);
                if (routeLineRef.current.infoOverlay)
                    routeLineRef.current.infoOverlay.setMap(null);
                routeLineRef.current = null;
            }
        }

        handleMapGoBack();
    };

    // ================================================================
    // 렌더
    // ================================================================
    return (
        <>
            <div className="map" id="map"></div>
            <div className="goback-button" onClick={handleGoBack}>
                <i className="fa-solid fa-backward-step"></i>
            </div>
        </>
    );
}
