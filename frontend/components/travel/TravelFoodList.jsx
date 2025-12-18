"use client";

import { useEffect, useState } from 'react';

import { TravelFood } from "@/components/travel/TravelFood.jsx";

import { getTravelFoodList } from '@/utils/travel/travelFoodAPI.js';

export function TravelFoodList({ handleListDetail, selectedRegion }) {
    const [travelFoodList, setTravelFoodList] = useState([]);
    const [filteredList, setFilteredList] = useState([]); //검색 데이터
    const [number, setNumber] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchLists = async () => {
            const food = await getTravelFoodList(number);
            setTravelFoodList(food || []);
        };

        fetchLists();
    }, [number]);

    useEffect(() => {
        if (!selectedRegion) {
          return; // 선택된 지역이 없으면 아무 것도 안함
        }

        const filtered = travelFoodList.filter(food => food.region === selectedRegion);
        setFilteredList(filtered); // 선택한 지역과 일치하는 항목만 리스트에 반영
    }, [travelFoodList, selectedRegion]);


    const handleDetail = (type, fid = null) => {
        handleListDetail(type, fid);
    }

    const handleSearch = () => {
        const keyword = searchKeyword.trim().toLowerCase();

        if (!keyword) {
            // 검색어 없으면 지역 필터만 적용
            if (selectedRegion) {
                const filtered = travelFoodList.filter(food => food.region === selectedRegion);
                setFilteredList(filtered);
            } else {
                setFilteredList(travelFoodList);
            }
            setIsSearching(false);
            return;
        }

        const filtered = travelFoodList.filter(food => {
            // 지역 필터 적용
            if (selectedRegion && food.region !== selectedRegion) return false;

            // 이름/태그 검색
            const nameMatch = food.fname.toLowerCase().includes(keyword);
            const tagArray = food.tag ? JSON.parse(food.tag) : [];
            const tagMatch = tagArray.some(tagItem => tagItem.toLowerCase().includes(keyword));

            return nameMatch || tagMatch;
        });

        setFilteredList(filtered);
        setIsSearching(true);
    };


    return(
        <div className="travel-food-container">
              <div className="search-box">
                <li className="search-input-back">
                    <input
                      type="text"
                      placeholder="맛집 이름을 입력하세요"
                      className="search-input"
                      onChange={(e) => setSearchKeyword(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </li>
              </div>

              <ul className="travel-food-list">
                {filteredList && filteredList.length > 0 ? (
                    filteredList.map((travelFood, idx) => (
                    <TravelFood
                      key={travelFood.fid}
                      idx={idx+1}
                      fid={travelFood.fid}
                      fname={travelFood.fname}
                      flike={travelFood.flike}
                      score={travelFood.score}
                      evaluation={travelFood.evaluation}
                      tag={travelFood.tag}
                      image1={travelFood.image1}
                      image2={travelFood.image2}
                      image3={travelFood.image3}
                      fullImage1={travelFood.fullImage1}
                      fullImage2={travelFood.fullImage2}
                      fullImage3={travelFood.fullImage3}
                      description={travelFood.description}
                      handleDetail={handleDetail}
                      type="food"
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