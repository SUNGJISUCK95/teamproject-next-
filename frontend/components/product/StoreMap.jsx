"use client"

import { useEffect } from "react";

function StoreMap({ storeList,selectedStore,onMarkerClick }) {
  useEffect(() => {
    if (window.kakao && window.kakao.maps && Array.isArray(storeList) && storeList.length > 0) {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const centerPosition = selectedStore
          ? new window.kakao.maps.LatLng(selectedStore.lat, selectedStore.lng)
          : new window.kakao.maps.LatLng(storeList[0].lat, storeList[0].lng)
        const options = {
          center: centerPosition, // 중심 좌표 서초점
          level: 6,
        };

        const map = new window.kakao.maps.Map(container, options);

        const greenMarkerSrc  = 'http://localhost:3000/images/travel_markers/marker_main.png';
        // const greenMarkerSrc  = 'http://172.16.250.24:3000/images/travel_markers/marker_main.png';
        const redMarkerSrc = 'http://localhost:3000/images/travel_markers/marker_main_select.png';
        // const redMarkerSrc = 'http://172.16.250.24:3000/images/travel_markers/marker_main_select.png';
        let imageSize = new window.kakao.maps.Size(15, 15);
        let imageOption = {offset: new window.kakao.maps.Point(0, 0)};

        const greenMarkerImage = new window.kakao.maps.MarkerImage(greenMarkerSrc, imageSize, imageOption);
        const redMarkerImage = new window.kakao.maps.MarkerImage(redMarkerSrc, imageSize, imageOption);

        const markers = [];
        let activeOverlay = null;

        storeList.forEach((store) => {
          const markerPosition = new window.kakao.maps.LatLng(store.lat, store.lng);

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: selectedStore?.sid === store.sid ? redMarkerImage : greenMarkerImage,
            map: map,
          });

          // 오버레이 내용
          const content = `
            <div class="map-marker-overlay-box" >
                <ul class="map-marker-overlay">
                  <li class="map-marker-title" ><span>${store.name}</span></li>
             
                </ul>
            </div>
          `;

          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            yAnchor: 1.2, // 오버레이 위치 조정
          });

          window.kakao.maps.event.addListener(marker, "click", () => {

            if (activeOverlay) {
              activeOverlay.setMap(null);
            }
            customOverlay.setMap(map);
            activeOverlay = customOverlay;

            onMarkerClick(store);

          });
          markers.push(marker);
        });

      });
    }
  }, [storeList,selectedStore,onMarkerClick]);


  return (
    <>
      <div className="map" id="map"></div>
    </>
  );
}

export default StoreMap;