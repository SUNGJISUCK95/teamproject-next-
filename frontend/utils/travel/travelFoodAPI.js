import React from "react";
import { axiosPost } from "@/utils/dataFetch.js";

export const getTravelFoodDetailList = async (did) => {
    const url = "/travel/foodDetail";
    const jsonData = await axiosPost(url, {"did":did});

    return jsonData;
}

export const getTravelFoodReviewList = async (fid) => {
    const url = "/travel/foodReview";
    const jsonData = await axiosPost(url, {"fid":fid});

    return jsonData;
}

export const insertTravelFoodReviewList = async (reviewData) => {
    const url = "/travel/foodReviewInsert";
    const jsonData = await axiosPost(url, reviewData);

    return jsonData;
}
