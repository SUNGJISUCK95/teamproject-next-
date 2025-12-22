"use client"

import React, { useEffect } from 'react';
import { useRentalStore } from '@/store/useRentalStore';
import { showMarkerAPI } from "@/utils/rental_util/rentalMarkerAPI";
import { getDistance } from "@/app/(Rental)/rental/contents/rentalContent";
import useRentalMapResponsive from "@/utils/rental_util/useRentalMapResponsive";

const useRentalLogic = () => {
  const {
    bikeList,
    latLon,
    selectedStation,
    addData,
    setLatLon,
    setFilteredList,
    setSelectedStation,
  } = useRentalStore();

  const responsiveWidth = useRentalMapResponsive();
  const isMapMobile = responsiveWidth <= 810;

  useEffect(() => {
    const init = async () => {
      try {
        const data = await showMarkerAPI();
        addData(data);

        navigator.geolocation.getCurrentPosition(
          ({ coords }) => {
            setLatLon({
              lat: coords.latitude,
              lng: coords.longitude,
            });
          },
          (error) => {
            console.error("Geolocation Error:", error);
          }
        );
      } catch (error) {
        console.error("자전거 데이터 로딩 실패:", error);
      }
    };

    init();
  }, [addData, setLatLon]);

  useEffect(() => {
    if (bikeList.length === 0) return;

    const MAX_DISTANCE = 0.5;
    const MAX_MARKERS = 10;

    const filtered = bikeList
      .filter((station) => {
        const distance = getDistance(
          latLon.lat,
          latLon.lng,
          station.latitude,
          station.longitude
        );
        return distance <= MAX_DISTANCE;
      })
      .slice(0, MAX_MARKERS);

    setFilteredList(filtered);

    if (isMapMobile && !selectedStation && filtered.length > 0) {
      setSelectedStation(filtered[0]);
    }
  }, [bikeList, latLon, isMapMobile, selectedStation, setFilteredList, setSelectedStation]);
};

export default useRentalLogic;