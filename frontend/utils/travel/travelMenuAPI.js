import React from "react";
import { axiosData, groupByRows } from "@/utils/dataFetch.js";

export const getTravelMenuList = async(number) => {
    const jsonData = await axiosData("/data/travel/travelMenus.json"); //비동기
    const rows = groupByRows(jsonData, number); //groupByRows()로 1차원인 jsonData를 2차원 배열로 변경한다 //dataFetch.js에 있음
    return rows;
}

