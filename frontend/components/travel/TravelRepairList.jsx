"use client";

import { useEffect, useState } from 'react';

import { TravelRepair } from "@/components/travel/TravelRepair.jsx";

export function TravelRepairList({ travelRepairList, handleListDetail, selectedRegion }) {
    const [filteredList, setFilteredList] = useState([]); //검색 데이터
    const [number, setNumber] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (!selectedRegion) {
          return; // 선택된 지역이 없으면 아무 것도 안함
        }

        const filtered = travelRepairList.filter(repair => repair.region === selectedRegion);
        setFilteredList(filtered);
    }, [travelRepairList, selectedRegion]);


    const handleDetail = (type, rid = null) => {
        handleListDetail(type, rid);
    }

    const handleSearch = () => {
        const keyword = searchKeyword.trim().toLowerCase();

        if (!keyword) {
            // 검색어 없으면 지역 필터만 적용
            if (selectedRegion) {
                const filtered = travelRepairList.filter(repair => repair.region === selectedRegion);
                setFilteredList(filtered);
            } else {
                setFilteredList(travelRepairList);
            }
            setIsSearching(false);
            return;
        }

        const filtered = travelRepairList.filter(repair => {
            // 지역 필터 적용
            if (selectedRegion && repair.region !== selectedRegion) return false;

            // 이름/태그 검색
            const nameMatch = repair.rname.toLowerCase().includes(keyword);
            const tagArray = repair.tag ? JSON.parse(repair.tag) : [];
            const tagMatch = tagArray.some(tagItem => tagItem.toLowerCase().includes(keyword));

            return nameMatch || tagMatch;
        });

        setFilteredList(filtered);
        setIsSearching(true);
    };

    return(
        <div className="travel-repair-container">
            <div className="search-box">
              <li className="search-input-back">
                  <input
                    type="text"
                    placeholder="정비소 이름을 입력하세요"
                    className="search-input"
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <button className="search-button" onClick={handleSearch}>
                      <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
              </li>
            </div>

            <ul className="travel-repair-list">
               {filteredList && filteredList.length > 0 ? (
                  filteredList.map((travelRepair, idx) => (
                      <TravelRepair
                          key={travelRepair.rid}
                          idx={idx+1}
                          rid={travelRepair.rid}
                          rname={travelRepair.rname}
                          rlike={travelRepair.rlike}
                          score={travelRepair.score}
                          evaluation={travelRepair.evaluation}
                          tag={travelRepair.tag}
                          image1={travelRepair.image1}
                          image2={travelRepair.image2}
                          image3={travelRepair.image3}
                          fullImage1={travelRepair.fullImage1}
                          fullImage2={travelRepair.fullImage2}
                          fullImage3={travelRepair.fullImage3}
                          description={travelRepair.description}
                          handleDetail={handleDetail}
                          type="repair"
                      />
                 ))
               ) : isSearching ? (
                  <li className="no-results">검색 결과가 없습니다.</li>
               ) : selectedRegion ? (
                 <li className="no-results">데이터 준비중입니다.</li>
               ) : (
                 <li className="no-results">출력오류 관리자에게 문의하십시오.</li>
               )}
            </ul>
        </div>
    );
}