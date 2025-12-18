import React from "react";
import { axiosGet, axiosPost } from "@/utils/dataFetch.js";

export const getTravelFoodList = async(number) =>{
    const url = "/travel/food";
    const jsonData = await axiosGet(url);

    return jsonData;
}

export const getTravelFoodDetailList = async (did) => {
    const url = "/travel/foodDetail";
    const jsonData = await axiosPost(url, {"did":did});
    console.log(jsonData);
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
    console.log("jsonData",jsonData);
    return jsonData;
}
