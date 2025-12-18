"use client";

import { useEffect, useState } from 'react';

import { TravelHotel } from "@/components/travel/TravelHotel.jsx";

import { getTravelHotelList } from '@/utils/travel/travelHotelAPI.js';

export function TravelHotelList({ handleListDetail, selectedRegion }) {
    const [travelHotelList, setTravelHotelList] = useState([]);
    const [filteredList, setFilteredList] = useState([]); //검색 데이터
    const [number, setNumber] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchLists = async () => {
            const hotel = await getTravelHotelList(number);
            setTravelHotelList(hotel || []);
        };

        fetchLists();
    }, [number]);

    useEffect(() => {
        if (!selectedRegion) {
          return; // 선택된 지역이 없으면 아무 것도 안함
        }

        const filtered = travelHotelList.filter(hotel => hotel.region === selectedRegion);
        setFilteredList(filtered);
    }, [travelHotelList, selectedRegion]);


    const handleDetail = (type, hid = null) => {
        handleListDetail(type, hid);
    }

    const handleSearch = () => {
        const keyword = searchKeyword.trim().toLowerCase();

        if (!keyword) {
            // 검색어 없으면 지역 필터만 적용
            if (selectedRegion) {
                const filtered = travelHotelList.filter(hotel => hotel.region === selectedRegion);
                setFilteredList(filtered);
            } else {
                setFilteredList(travelHotelList);
            }
            setIsSearching(false);
            return;
        }

        const filtered = travelHotelList.filter(hotel => {
            // 지역 필터 적용
            if (selectedRegion && hotel.region !== selectedRegion) return false;

            // 이름/태그 검색
            const nameMatch = hotel.hname.toLowerCase().includes(keyword);
            const tagArray = hotel.tag ? JSON.parse(hotel.tag) : [];
            const tagMatch = tagArray.some(tagItem => tagItem.toLowerCase().includes(keyword));

            return nameMatch || tagMatch;
        });

        setFilteredList(filtered);
        setIsSearching(true);
    };

    return(
    <div className="travel-hotel-container">
          <div className="search-box">
            <li className="search-input-back">
                <input
                  type="text"
                  placeholder="호텔 이름을 입력하세요"
                  className="search-input"
                  onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </li>
          </div>

          <ul className="travel-hotel-list">
              {filteredList && filteredList.length > 0 ? (
                filteredList.map((travelHotel, idx) => (
                    <TravelHotel
                        key={travelHotel.hid}
                        idx={idx+1}
                        hid={travelHotel.hid}
                        hname={travelHotel.hname}
                        hlike={travelHotel.hlike}
                        score={travelHotel.score}
                        evaluation={travelHotel.evaluation}
                        tag={travelHotel.tag}
                        image1={travelHotel.image1}
                        image2={travelHotel.image2}
                        image3={travelHotel.image3}
                        fullImage1={travelHotel.fullImage1}
                        fullImage2={travelHotel.fullImage2}
                        fullImage3={travelHotel.fullImage3}
                        description={travelHotel.description}
                        handleDetail={handleDetail}
                        type="hotel"
                    />
                ))
              ) : isSearching ? (
                <li className="no-results">검색 결과가 없습니다.</li>
              ) : selectedRegion ? (
                <li className="no-results">데이터 준비중입니다.</li>
              ) : (
                <li className="no-results">검색 결과가 없습니다.</li>
              )}
          </ul>
    </div>
    );
}