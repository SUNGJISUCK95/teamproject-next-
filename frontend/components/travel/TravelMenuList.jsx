"use client";

import { useEffect, useState } from 'react';

import { TravelMenu } from "@/components/travel/TravelMenu.jsx";

import { getTravelMenuList } from '@/utils/travel/travelMenuAPI.js';

export function TravelMenuList({ handleMenuClick }) {
    const [travelMenuList, setTravelMenuList] = useState([]);

    const [number, setNumber] = useState(3);

    useEffect(() => {
        const fetchLists = async () => {
            const menu = await getTravelMenuList(number);
            setTravelMenuList(menu || []);
        };

        fetchLists();
    }, [number]);

    const handleClick = (type) => {
        handleMenuClick(type);
    }

    return(
        <>
            {travelMenuList && travelMenuList.map((rowArray, idx) =>
                { return rowArray && rowArray.map((travelMenu, idx) =>
                    <TravelMenu name={travelMenu.name} type={travelMenu.type} icon={travelMenu.icon} handleClick={handleClick}  key={idx} />
                )}
            )}
        </>
    );
}