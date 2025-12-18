"use client"

import React, { useState } from 'react';
import '@/styles/product/locationstore.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import StoreMap2 from "@/components/commons/StoreMap2";

export function StoreLocation({data}) {

    const storeList = data;
    const [selectedStore, setSelectedStore] = useState(null);
    const [searchStore, setSearchStore] = useState("");

    const handleClick = (store) => {
        setSelectedStore(store);
    }
    const filterStoreList = Array.isArray(storeList) ?
        storeList.filter(store =>
            store.name.toLowerCase().includes(searchStore.toLowerCase())
        ) : [];

    return (
        <div className="store-locator-container" style={{paddingTop:'65px'}}>
            <h1 className="store-locator-title">대리점 찾기</h1>
            <div className="store-locator-content">

                <div className="store-list-panel">
                    <div className="search-bar">
                        <input type="text" placeholder="주소를 입력하세요."
                                value={searchStore} onChange={(e)=>setSearchStore(e.target.value)}/>
                    </div>
                    <ul className="store-list store-list-styled">
                        {filterStoreList.map((store) => (
                            <li
                                key={store.sid}
                                className={`store-list-item ${selectedStore?.sid === store.sid ? 'active' : ''}`}
                                onClick={() => handleClick(store)}>
                                <div className="store-info">
                                    <strong>{store.name}</strong>
                                    <p>{store.address}</p>
                                    <p className="phone-text">전화: {store.phone}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="store-map-panel">
                    <StoreMap2 storeList={storeList}
                              selectedStore={selectedStore}
                              onMarkerClick={handleClick}/>
                </div>

            </div>
        </div>
    );
}