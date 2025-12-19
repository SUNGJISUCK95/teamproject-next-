import React from "react";
import { axiosPost } from "@/utils/dataFetch.js";

export const getTravelHotelDetailList = async (did) => {
    const url = "/travel/hotelDetail";
    const jsonData = await axiosPost(url, {"did":did});

    return jsonData;
}

export const getTravelHotelReviewList = async (hid) => {
    const url = "/travel/hotelReview";
    const jsonData = await axiosPost(url, {"hid":hid});

    return jsonData;
}

export const insertTravelHotelReviewList = async (reviewData) => {
    const url = "/travel/hotelReviewInsert";
    const jsonData = await axiosPost(url, reviewData);

    return jsonData;
}

