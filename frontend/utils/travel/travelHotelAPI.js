import React from "react";
import { axiosGet, axiosPost } from "@/utils/dataFetch.js";

export const getTravelHotelList = (number) => async(dispatch) =>{
    const url = "http://localhost:9000/travel/hotel";
    const jsonData = await axiosGet(url);

    return jsonData;
}

export const getTravelHotelDetailList = async (did) => {
    const url = "http://localhost:8080/travel/hotelDetail";
    const jsonData = await axiosPost(url, {"did":did});

    return jsonData;
}

export const getTravelHotelReviewList = async (hid) => {
    const url = "http://localhost:8080/travel/hotelReview";
    const jsonData = await axiosPost(url, {"hid":hid});

    return jsonData;
}

export const insertTravelHotelReviewList = async (reviewData) => {
    const url = "http://localhost:8080/travel/hotelReviewInsert";
    const jsonData = await axiosPost(url, reviewData);
    console.log("jsonData",jsonData);
    return jsonData;
}

