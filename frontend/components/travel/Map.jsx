"use client";

import { useEffect, useState, useRef } from "react";
import { getMarkerList } from '@/utils/travel/mapAPI.js';
import { getTravelFoodList } from '@/utils/travel/travelFoodAPI.js';
import { getTravelHotelList } from '@/utils/travel/travelHotelAPI.js';
import { getTravelRepairList } from '@/utils/travel/travelRepairAPI.js';

export default function Map({ handleMenuClick, handleMapGoBack, handleListDetail, type, selectedDid }) {
    const [travelFoodList, setTravelFoodList] = useState([]);
    const [travelHotelList, setTravelHotelList] = useState([]);
    const [travelRepairList, setTravelRepairList] = useState([]);


    const [number, setNumber] = useState(3);
    const mapRef = useRef(null); // 지도 객체 저장용
    const markersRef = useRef([]); // 기존 + 새 마커 모두 저장
    const defaultCenter = useRef({ lat: 36.5, lng: 127.8 }); // 중심좌표(남한)

    const baseMarkersRef = useRef([]); // 대표 추천 여행지 마커
    const typeMarkersRef = useRef([]); // type별 리스트 마커
    const markerMapRef = useRef({
        food: {},
        hotel: {},
        repair: {}
    });

    const pointRef = useRef({ startPoint: null, endPoint: null });
    const routeLineRef = useRef(null);

    // -----------------------------
    // 마커 클릭 → 시작/도착 지점 설정
    // -----------------------------
    function handleMarkerClick(lat, lng) {
        // startPoint 설정
        if (!pointRef.current.startPoint) {
            pointRef.current.startPoint = { lat, lng };
            pointRef.current.endPoint = null;
        } else {
            // startPoint는 그대로 endPoint만 갱신
            pointRef.current.endPoint = { lat, lng };

            // 경로 계산
            getCarDirection(pointRef.current.startPoint, pointRef.current.endPoint);
        }
    }

    // -----------------------------
    // 경로 정보 오버레이 표시
    // -----------------------------
    function showRouteInfoOnMap(distance, duration, startPoint, endPoint) {
        if (!mapRef.current) return;

        const infoContent = `
      <div style="padding:5px 10px; background:white; border:1px solid #ccc; border-radius:5px;">
        <div>거리: ${distance} km</div>
        <div>예상 시간: ${duration} 분</div>
      </div>
    `;

        // 기존 오버레이 제거
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

        // 오버레이 참조 저장
        routeLineRef.current.infoOverlay = infoOverlay;
    }

    // -----------------------------
    // Kakao Mobility API — 자전거 경로 요청
    // -----------------------------
    async function getCarDirection(startPoint, endPoint) {
        const REST_API_KEY = 'dc7443a72307e740e0624e32834a863e';
        const url = 'https://apis-navi.kakaomobility.com/v1/directions';
        const origin = `${startPoint.lng},${startPoint.lat}`;
        const destination = `${endPoint.lng},${endPoint.lat}`;

        const headers = {
            Authorization: `KakaoAK ${REST_API_KEY}`,
            'Content-Type': 'application/json'
        };

        const queryParams = new URLSearchParams({
            origin,
            destination,
            vehicleType: 'BICYCLE', // 자전거 경로
            priority: 'RECOMMEND'
        });


        try {
            const response = await fetch(`${url}?${queryParams}`, { method: 'GET', headers });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();

            const linePath = [];

            // 모든 sections 순회해서 경로 라인 생성
            data.routes[0].sections.forEach(section => {
                section.roads.forEach(road => {
                    for (let i = 0; i < road.vertexes.length; i += 2) {
                        const lng = road.vertexes[i];
                        const lat = road.vertexes[i + 1];
                        linePath.push(new window.kakao.maps.LatLng(lat, lng));
                    }
                });
            });

            const summary = data.routes[0].summary;
            const distanceKm = (summary.distance / 1000).toFixed(1);   // km 단위
            const durationMin = Math.round(summary.duration / 60);     // 분 단위

            drawRouteOnMap(linePath, distanceKm, durationMin);

            // 지도에 표시
            showRouteInfoOnMap(distanceKm, durationMin, startPoint, endPoint);

        } catch (error) {
            console.error('Error:', error);
        }
    }



    // -----------------------------
    // 지도에 경로(Polyline) 그리기
    // -----------------------------
    function drawRouteOnMap(linePath, distance, duration) {
        if (!mapRef.current) return;

        // 이전 경로 제거
        if (routeLineRef.current) {
            routeLineRef.current.setMap(null);
        }

        // 이전 정보 오버레이 제거
        if (routeLineRef.current?.infoOverlay) {
            routeLineRef.current.infoOverlay.setMap(null);
        }

        const routeLine = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: '#FF4500',
            strokeOpacity: 0.8,
            strokeStyle: 'solid',
        });

        routeLine.setMap(mapRef.current);

        // 거리, 시간 정보 오버레이
        const infoContent = `
      <div style="padding:5px 10px; background:white; border:1px solid #ccc; border-radius:5px;">
        <div>거리: ${distance} km</div>
        <div>예상 시간: ${duration} 분</div>
      </div>
    `;

        const infoOverlay = new window.kakao.maps.CustomOverlay({
            position: linePath[Math.floor(linePath.length / 2)], // 중간 위치
            content: infoContent,
            yAnchor: 1.2,
        });

        infoOverlay.setMap(mapRef.current);

        // 오버레이 참조 routeLine에 저장
        routeLine.infoOverlay = infoOverlay;

        // routeLineRef에 저장
        routeLineRef.current = routeLine;
    }

    // ================================================================
    // API로 목록 불러오기
    // ================================================================
    useEffect(() => {
        const fetchLists = async () => {
            setTravelFoodList(await getTravelFoodList() || []);
            setTravelHotelList(await getTravelHotelList() || []);
            setTravelRepairList(await getTravelRepairList() || []);
        };
        fetchLists();
    }, []);

    // -----------------------------
    // 초기 지도 및 대표 여행지 마커 렌더링
    // -----------------------------
    useEffect(() => {
        const fetch = async() => {
            const data = await getMarkerList(number);
            if(data){
                if (window.kakao && window.kakao.maps) {
                    window.kakao.maps.load(() => {
                        const container = document.getElementById("map");
                        const centerLatLng = new window.kakao.maps.LatLng(
                            defaultCenter.current.lat,
                            defaultCenter.current.lng
                        );

                        const map = new window.kakao.maps.Map(container, {
                            center: centerLatLng,
                            level: 12
                        });
                        mapRef.current = map; // 지도 객체 저장

                        // 현재 접속한 도메인 가져오기
                        const host = window.location.hostname;

                        const BASE_URL = host === "localhost"
                            ? "http://localhost:3000"
                            : "http://172.16.250.24:3000";   // 필요 시 포트 포함

                        const greenMarkerSrc  = `${BASE_URL}/images/travel_markers/marker_main.png`;
                        const redMarkerSrc    = `${BASE_URL}/images/travel_markers/marker_main_select.png`;
                        let imageSize = new window.kakao.maps.Size(15, 15);
                        let imageOption = {offset: new window.kakao.maps.Point(0, 0)};

                        const greenMarkerImage = new window.kakao.maps.MarkerImage(greenMarkerSrc, imageSize, imageOption);
                        const redMarkerImage = new window.kakao.maps.MarkerImage(redMarkerSrc, imageSize, imageOption);

                        const markers = [];
                        let activeOverlay = null;

                        // -----------------------------
                        // 대표 여행지 마커 생성
                        // -----------------------------
                        data.forEach(({ mname, lat, lng, mlink, type }) => {
                            const markerPosition = new window.kakao.maps.LatLng(lat, lng);

                            const marker = new window.kakao.maps.Marker({
                                position: markerPosition,
                                image: greenMarkerImage,
                                map: map,
                            });

                            // 오버레이 내용
                            const content = `
                    <div class="map-marker-overlay-box" >
                        <ul class="map-marker-overlay">
                          <li class="map-marker-title" ><span>${mname}</span></li>
                          <li class="map-marker-link" ><a href="${mlink}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i></a></li>
                        </ul>
                    </div>
                  `;

                            const customOverlay = new window.kakao.maps.CustomOverlay({
                                position: markerPosition,
                                content: content,
                                yAnchor: 1.2, // 오버레이 위치 조정
                            });

                            window.kakao.maps.event.addListener(marker, "click", () => {
                                handleMarkerClick(lat, lng);

                                // 마커 이미지 변경
                                markers.forEach(m => m.setImage(greenMarkerImage));
                                marker.setImage(redMarkerImage);

                                // 오버레이 열고 닫기
                                if (activeOverlay) {
                                    activeOverlay.setMap(null);
                                }
                                customOverlay.setMap(map);
                                activeOverlay = customOverlay;

                                const currentLevel = map.getLevel();
                                map.setLevel(Math.max(currentLevel - 7, 7));

                                // 마커 중심으로 이동
                                const moveLatLon = new window.kakao.maps.LatLng(
                                    lat - 0.001, // 상하
                                    lng // 좌우
                                );
                                map.panTo(moveLatLon);

                                const goback_btn = document.querySelector(".goback-button");
                                if (goback_btn) {
                                    goback_btn.style.top = "0.3rem";
                                }

                                handleMenuClick(type, mname);

                            });
                            markers.push(marker);
                        });
                    });
                }
            }
        }
        fetch();

    }, [number]);

    // -----------------------------
    // 메뉴 타입 변경 시(type) — 타입별 마커 표시
    // -----------------------------
    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) return;

        // type별 리스트 매핑
        const listMap = {
            food: travelFoodList,
            hotel: travelHotelList,
            repair: travelRepairList
        };

        // 선택할 리스트
        const listToRender = listMap[type] || [];

        if (!listToRender || listToRender.length === 0) return;

        window.kakao.maps.load(() => {
            const map = mapRef.current;
            if (!map) return;

            // 이전 type 마커 제거
            typeMarkersRef.current.forEach(m => m.setMap(null));
            typeMarkersRef.current = [];

            // 이전 경로와 오버레이 제거
            if (routeLineRef.current) {
                routeLineRef.current.setMap(null);
                if (routeLineRef.current.infoOverlay) {
                    routeLineRef.current.infoOverlay.setMap(null);
                }
                routeLineRef.current = null;
            }

            // 현재 접속한 도메인 가져오기
            const host = window.location.hostname;

            const BASE_URL = host === "localhost"
                ? "http://localhost:3000"
                : "http://172.16.250.24:3000";   // 필요 시 포트 포함

            let orangeMarkerSrc = '';
            let selectMarkerSrc = '';

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
            const imageOption = { offset: new window.kakao.maps.Point(0, 0) };
            const selectImageSize = new window.kakao.maps.Size(45, 45);
            const selectImageOption = { offset: new window.kakao.maps.Point(15, 30) };
            const orangeMarkerImage = new window.kakao.maps.MarkerImage(orangeMarkerSrc, imageSize, imageOption);
            const selectMarkerImage = new window.kakao.maps.MarkerImage(selectMarkerSrc, selectImageSize, selectImageOption);

            let activeOverlay = null;


            listToRender.forEach((item) => {

                const { lat, lng, fname, flink } = item;

                // type에 맞춰 did 설정
                const did =
                    type === "food"  ? item.fid :
                        type === "hotel" ? item.hid :
                            item.rid;

                const markerPosition = new window.kakao.maps.LatLng(lat, lng);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    image: orangeMarkerImage,
                    map,
                });

                // 리스트 선택한 마커 저장
                markerMapRef.current[type][did] = marker;

                window.kakao.maps.event.addListener(marker, "click", () => {
                    handleMarkerClick(lat, lng);

                    baseMarkersRef.current.forEach(m => m.setImage(orangeMarkerImage));
                    typeMarkersRef.current.forEach(m => m.setImage(orangeMarkerImage));
                    marker.setImage(selectMarkerImage);

                    const currentLevel = map.getLevel();
                    map.setLevel(Math.max(currentLevel - 7, 5));

                    map.panTo(new window.kakao.maps.LatLng(lat - 0.001, lng));

                    //상세페이지 열기
                    handleListDetail(type, did);
                });

                typeMarkersRef.current.push(marker);
            });
        });
    }, [type, travelFoodList, travelHotelList, travelRepairList]);


    // -----------------------------
    // 리스트에서 선택 → 해당 마커 자동 클릭
    // -----------------------------
    useEffect(() => {
        if (!selectedDid || !type) return;

        const marker = markerMapRef.current[type]?.[selectedDid];

        if (marker) {
            window.kakao.maps.event.trigger(marker, "click");
        }
    }, [selectedDid, type]);

    // -----------------------------
    // 뒤로가기 버튼 클릭 — 지도 상태 초기화
    // -----------------------------
    const handleGoBack = () => {
        if (mapRef.current) {
            const centerLatLng = new window.kakao.maps.LatLng(
                defaultCenter.current.lat,
                defaultCenter.current.lng
            );

            mapRef.current.panTo(centerLatLng);
            mapRef.current.setLevel(12);

            const goback_btn = document.querySelector(".goback-button");
            if (goback_btn) {
                goback_btn.style.top = "-3rem";
            }

            //type 마커 제거
            typeMarkersRef.current.forEach(marker => marker.setMap(null));
            typeMarkersRef.current = [];

            //마커 이미지 초기화
            baseMarkersRef.current.forEach(marker => marker.setImage(marker.defaultImage));

            // startPoint, endPoint 초기화
            pointRef.current.startPoint = null;
            pointRef.current.endPoint = null;

            // 기존 경로와 오버레이 제거
            if (routeLineRef.current) {
                routeLineRef.current.setMap(null);
                if (routeLineRef.current.infoOverlay) {
                    routeLineRef.current.infoOverlay.setMap(null);
                }
                routeLineRef.current = null;
            }
        }

        if(handleGoBack) {
            handleMapGoBack();
        }
    }

    return (
        <>
            <div className="map" id="map"></div>
            <div className="goback-button" id="" onClick={handleGoBack} ><i className="fa-solid fa-backward-step"></i></div>
        </>
    );
}