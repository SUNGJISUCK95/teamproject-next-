import React from "react";
import { axiosGet, axiosPost } from "@/utils/dataFetch.js";

export const getTravelFoodList = (number) => async(dispatch) =>{
    const url = "http://localhost:9000/travel/food";
    const jsonData = await axiosGet(url);

    return jsonData;
}

export const getTravelFoodDetailList = async (did) => {
    const url = "http://localhost:8080/travel/foodDetail";
    const jsonData = await axiosPost(url, {"did":did});

    return jsonData;
}

export const getTravelFoodReviewList = async (fid) => {
    const url = "http://localhost:8080/travel/foodReview";
    const jsonData = await axiosPost(url, {"fid":fid});

    return jsonData;
}

export const insertTravelFoodReviewList = async (reviewData) => {
    const url = "http://localhost:8080/travel/foodReviewInsert";
    const jsonData = await axiosPost(url, reviewData);
    console.log("jsonData",jsonData);
    return jsonData;
}
