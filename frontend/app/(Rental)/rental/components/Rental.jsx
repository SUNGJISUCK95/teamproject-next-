"use client";

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from "@/utils/rental_util/useKakaoLoader";
import { BiTargetLock } from "react-icons/bi";
import { RentalInfo } from "@/app/(Rental)/rental/components/RentalInfo";
import useRentalLogic from "@/app/(Rental)/rental/hooks/useRentalLogic";
import { useRentalStore } from "@/store/useRentalStore";
import { defaultMarkerImage, selectedMarkerImage } from '@/app/(Rental)/rental/contents/rentalContent';

const Rental = () => {
  useKakaoLoader();
  useRentalLogic();

  const {
    mapCenter,
    latLon,
    filteredBikeList,
    selectedStation,
    showSearchButton,
    setMapCenter,
    setLatLon,
    setShowSearchButton,
    setSelectedStation,
  } = useRentalStore();

  return (
    <>
      <RentalInfo data={selectedStation} />
      <Map
        className="kakao_rental_map"
        center={latLon}
        style={{ width: "80%", height: "calc(100vh - 100px)" }}
        onIdle={(map) => {
          const center = map.getCenter();
          setMapCenter({
            lat: center.getLat(),
            lng: center.getLng(),
          });
          setShowSearchButton(true);
        }}
      >
        {filteredBikeList.map((station) => (
          <MapMarker
          key={station.id}
          position={{ lat: station.latitude, lng: station.longitude }}
          image={station.id === selectedStation?.id ? selectedMarkerImage : defaultMarkerImage}
          onClick={() => setSelectedStation(station)}
          />
        ))}
      </Map>

      {showSearchButton && (
        <button className='rental_map_target' onClick={() => setLatLon(mapCenter)}>
          <BiTargetLock />
        </button>
      )}
      </>
  );
};

export default Rental;

