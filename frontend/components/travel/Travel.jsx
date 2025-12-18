"use client";

import { useState } from 'react';

import { TravelMenuList } from "@/components/travel/TravelMenuList.jsx";
import { TravelFoodList } from "@/components/travel/TravelFoodList.jsx";
import { TravelHotelList } from "@/components/travel/TravelHotelList.jsx";
import { TravelRepairList } from "@/components/travel/TravelRepairList.jsx";
import { TravelFoodDetailList } from "@/components/travel/TravelFoodDetailList.jsx";
import { TravelHotelDetailList } from "@/components/travel/TravelHotelDetailList.jsx";
import { TravelRepairDetailList } from "@/components/travel/TravelRepairDetailList.jsx";
import Map from '@/components/travel/Map.jsx';

export default function Travel() {

    // 버튼 및 리스트들 보이기/숨기기 상태 관리
    const [showMenus, setShowMenus] = useState(false);
    const [showFoods, setShowFoods] = useState(false);
    const [showHotels, setShowHotels] = useState(false);
    const [showRepairs, setShowRepairs] = useState(false);

    // 선택된 항목/타입/지역 정보
    const [selectedDid, setSelectedDid] = useState(null); // 클릭된 did 저장
    const [selectedType, setSelectedType] = useState(null); // 클릭된 type 저장
    const [selectedRegion, setSelectedRegion] = useState(null);

    //-----------------------------
    // 메뉴 버튼 및 리스트창 출력 제어
    //-----------------------------
    const handleMenuClick = (type, mname) => {
        const travel_left_menus = document.querySelector('.travel-left-menus');
        const travel_left_detail = document.querySelector('.travel-left-detail');

        // 마커 클릭 시 버튼 출력
        if(type === "coord"){
            setShowMenus(true);
            setSelectedRegion(mname);
            travel_left_menus.style.top = "0";
        }

        // 타입에 맞는 정보 출력
        if(type === "food") {
            setShowFoods(true);
            setShowHotels(false);
            setShowRepairs(false);
            setSelectedType(type);
            travel_left_detail.style.left = "0";
        }else if(type === "hotel"){
            setShowFoods(false);
            setShowHotels(true);
            setShowRepairs(false);
            setSelectedType(type);
            travel_left_detail.style.left = "0";
        }
        else if(type === "repair"){
            setShowFoods(false);
            setShowHotels(false);
            setShowRepairs(true);
            setSelectedType(type);
            travel_left_detail.style.left = "0";
        }

    }

    //-----------------------------
    // 상세 정보창 열기/닫기
    //-----------------------------
    const handleListDetail = (type, did) => {
        const detail_back = document.getElementById("travel_detail_back");
        const detail = document.getElementById("travel_detail");

        // 상세 정보창 출력
        if(detail && (type === "food" || type === "hotel" || type === "repair")) {
            if (did) {
                setSelectedDid(did);
            }
            detail_back.style.display = "block";
            detail.style.display = "block";
        }

        // 상세 정보창 닫기
        if(detail && type === "close"){
            detail_back.style.display = "none";
            detail.style.display = "none";
            setSelectedDid(null);
        }

    }

    //-----------------------------
    // 좌측 리스트창 숨기기
    //-----------------------------
    const handleLeftClose = () => {
        const travel_left_detail = document.querySelector(".travel-left-detail");

        if(travel_left_detail) {
            travel_left_detail.style.left = "-40rem";
        }
    }

    //-----------------------------
    // 지도 뒤로가기 시 UI 초기화
    //-----------------------------
    const handleMapGoBack = () => {
        const travel_left_detail = document.querySelector(".travel-left-detail");
        const travel_left_menus = document.querySelector(".travel-left-menus");

        if(travel_left_detail) {
            travel_left_detail.style.left = "-40rem";
        }

        if(travel_left_menus) {
            travel_left_menus.style.top = "-3rem";
        }
    }

    return(
        <div className="content">
            <div className="center-layout travel-form">

                {/* 좌측 메뉴 영역 */}
                <div className="travel-left">
                    <nav className="travel-left-menus">
                        {/* showMenus가 true일 때만 버튼 보이기 */}
                        {showMenus && (
                            <TravelMenuList handleMenuClick={handleMenuClick}/>
                        )}
                    </nav>
                    <div className="travel-left-detail">
                        {/* showFoods, showHotels, showRepairs가 true일 때만 리스트 보이기 */}
                        {showFoods && (
                            <ul className='food-list'>
                                <TravelFoodList handleListDetail={handleListDetail} selectedRegion={selectedRegion} />
                                <button className="travel-left-close" onClick={handleLeftClose}><i className="fa-solid fa-backward-step"></i></button>
                            </ul>
                        )}
                        {showHotels && (
                            <ul className='hotel-list'>
                                <TravelHotelList handleListDetail={handleListDetail} selectedRegion={selectedRegion}/>
                                <button className="travel-left-close" onClick={handleLeftClose}><i className="fa-solid fa-backward-step"></i></button>
                            </ul>
                        )}
                        {showRepairs && (
                            <ul className='repair-list'>
                                <TravelRepairList handleListDetail={handleListDetail} selectedRegion={selectedRegion}/>
                                <button className="travel-left-close" onClick={handleLeftClose}><i className="fa-solid fa-backward-step"></i></button>
                            </ul>
                        )}
                    </div>

                </div>

                {/* 지도 영역 */}
                <div className="travel-map">
                    <Map handleMenuClick={handleMenuClick} handleMapGoBack={handleMapGoBack} handleListDetail={handleListDetail} type={selectedType} selectedDid={selectedDid} />
                </div>

                {/* 상세 정보창 영역 */}
                <div id="travel_detail_back" className="travel-detail-back" />
                <div id="travel_detail" className="travel-detail">
                    {/* showFoods, showHotels, showRepairs가 true일 때만 상세정보창 보이기 */}
                    {showFoods && selectedDid && (
                        <>
                            <li className="detail-close-box"><button className="detail-close-button" onClick={() => handleListDetail("close")}><i className="fa-solid fa-xmark"></i></button></li>
                            <div>
                                <TravelFoodDetailList selectedDid={selectedDid}/>
                            </div>
                        </>
                    )}
                    {showHotels && selectedDid && (
                        <>
                            <li className="detail-close-box"><button className="detail-close-button" onClick={() => handleListDetail("close")}><i className="fa-solid fa-xmark"></i></button></li>
                            <div>
                                <TravelHotelDetailList selectedDid={selectedDid}/>
                            </div>
                        </>
                    )}
                    {showRepairs && selectedDid && (
                        <>
                            <li className="detail-close-box"><button className="detail-close-button" onClick={() => handleListDetail("close")}><i className="fa-solid fa-xmark"></i></button></li>
                            <div>
                                <TravelRepairDetailList selectedDid={selectedDid}/>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}