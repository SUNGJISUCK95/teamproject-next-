import React from "react";
import { axiosGet, axiosPost } from "@/utils/dataFetch.js";

export const getTravelRepairList = (number) => async(dispatch) =>{
    const url = "http://localhost:9000/travel/repair";
    const jsonData = await axiosGet(url);

    return jsonData;
}

export const getTravelRepairDetailList = async (did) => {
    const url = "http://localhost:8080/travel/repairDetail";
    const jsonData = await axiosPost(url, {"did":did});

    return jsonData;
}

export const getTravelRepairReviewList = async (rid) => {
    const url = "http://localhost:8080/travel/repairReview";
    const jsonData = await axiosPost(url, {"rid":rid});

    return jsonData;
}

export const insertTravelRepairReviewList = async (reviewData) => {
    const url = "http://localhost:8080/travel/repairReviewInsert";
    const jsonData = await axiosPost(url, reviewData);

    return jsonData;
}
