import React from "react";
import { axiosData, groupByRows, axiosGet, axiosPost } from "@/utils/dataFetch.js";

export const getTravelSaveList = async (uid, type) => {
    const url = "http://localhost:9000/travel/save";
    const jsonData = await axiosPost(url, {"uid":uid});

    return jsonData;
}

export const updateTravelSaveList = async (uid, id, type) => {
    if(type === "food"){
         const url = "http://localhost:8080/travel/foodSaveUpdate";
         const jsonData = await axiosPost(url, {"uid":uid, "fid":id});
         return jsonData;
    }

    if(type === "hotel"){
         const url = "http://localhost:8080/travel/hotelSaveUpdate";
         const jsonData = await axiosPost(url, {"uid":uid, "hid":id});
         return jsonData;
    }

    if(type === "repair"){
         const url = "http://localhost:8080/travel/repairSaveUpdate";
         const jsonData = await axiosPost(url, {"uid":uid, "rid":id});
         return jsonData;
    }
}