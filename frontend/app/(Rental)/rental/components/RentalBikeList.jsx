"use client";

import React, { useEffect } from 'react'
import { showMarkerAPI } from '@/utils/rental_util/rentalMarkerAPI.js';
import { useRentalStore } from '@/store/useRentalStore';

const RentalBikeList = () => {
	const setSelectedStation = useRentalStore((s) => s.setSelectedStation);
	// store에 등록한 전역 데이터를 셀렉터를 통해서 get
	const filteredBikeList = useRentalStore((s) => s.filteredBikeList);

    // 전역으로 가져온 데이터를 필터링하여 지도에 찍힌 마커의 수만큼 slice에서 필터링한 데이터를 get
	const selectedStation = useRentalStore((s) => s.selectedStation);
	
	const addData = useRentalStore((s) => s.addData);


	// 비동기 API 호출을 통해 전체 마커 데이터(rentalMarker.js)를 가져와 전역 상태(Slice)에 저장
	useEffect(() => {
			const bikeListData = async () => {
			const bikeData = await showMarkerAPI();
			addData(bikeData);
		}
		bikeListData();
	}, []);
	

	return (
		<div>
			<div className="bike_station_name_list">
				<ul>
					{
						// 맵에 찍힌 마커의 수 만큼 브라우저에 렌더링
						filteredBikeList && filteredBikeList.map((bikeList, index)=>{
                            const isActive = selectedStation && (selectedStation.extra.uid === bikeList.extra.uid);
							return (
								<li
                                    className={isActive ? "active" : ""}
									key={index}
									onClick={()=>{
										setSelectedStation(bikeList)
									}}
								>{bikeList.name}<span>{bikeList.extra.uid}</span></li>
							)
						})

					}
				</ul>
			</div>
		</div>
	)
}

export default RentalBikeList;