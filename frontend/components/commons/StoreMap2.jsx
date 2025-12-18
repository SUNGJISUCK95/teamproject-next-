"use client";
import { Map, MapMarker, useKakaoLoader, CustomOverlayMap } from "react-kakao-maps-sdk";
import {useState} from "react";


function StoreMap({ storeList = {}, selectedStore, onMarkerClick }) {

    const [isOpen, setIsOpen] = useState(false);

    const [loading, error] = useKakaoLoader({
        appkey: "4ed621f0ad68f69ad6dbc1de3560deec",
        libraries: ["clusterer", "drawing", "services"],
    });

    const defaultCenter = { lat: 37.566826, lng: 126.9786567 };

    const center = (storeList && storeList.length > 0)
        ? { lat: storeList[0].lat, lng: storeList[0].lng }
        : defaultCenter;

    const mapCenter = selectedStore
        ? { lat: selectedStore.lat, lng: selectedStore.lng }
        : center;

    const imageSize = { width: 18, height: 18 };
    const imageOption = { offset: { x: 12, y: 35 } };
    const greenMarkerSrc = "http://localhost:3000/images/travel_markers/marker_main.png";
    const redMarkerSrc = "http://localhost:3000/images/travel_markers/marker_main_select.png";

    if (loading) return <div>지도를 불러오는 중입니다...</div>;
    if (error) return <div>지도를 가져오는데 실패했습니다.</div>;

    return (
        <Map
            center={mapCenter}
            style={{ width: "100%", height: "100%", minHeight: "500px" }}
            level={6}
        >
            {storeList.map((store) => (
                <div key={store.sid}>
                    <MapMarker
                        position={{ lat: store.lat, lng: store.lng }}
                        image={{
                            src: selectedStore?.sid === store.sid ? redMarkerSrc : greenMarkerSrc,
                            size: imageSize,
                            options: imageOption,
                        }}
                        onClick={() => onMarkerClick && onMarkerClick(store)}
                        zIndex={selectedStore?.sid === store.sid ? 3 : 1}
                    />
                    {selectedStore?.sid === store.sid && (
                        <CustomOverlayMap
                            position={{ lat: store.lat, lng: store.lng }}
                            yAnchor={1.4}
                            zIndex={3}
                        >
                            <div className="map-info-window">
                                <div className="map-info-header">
                                    <span className="map-info-title">{store.name}</span>
                                    <span
                                        className="map-info-close"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onMarkerClick(null);
                                        }}
                                    >
                                        ✕
                                    </span>
                                </div>
                                <div className="map-info-body">
                                    {store.address && (
                                        <div className="info-row">
                                            <span>📍</span>
                                            <span>{store.address}</span>
                                        </div>
                                    )}
                                    {store.phone && (
                                        <div className="info-row">
                                            <span>📞</span>
                                            <span>{store.phone}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="map-info-footer">
                                    <a
                                        href={store.url || `https://map.kakao.com/link/search/${store.name}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="map-link-btn"
                                    >
                                        상세보기 &gt;
                                    </a>
                                </div>
                            </div>
                        </CustomOverlayMap>
                    )}
                </div>
            ))}
        </Map>
    );
}

export default StoreMap;