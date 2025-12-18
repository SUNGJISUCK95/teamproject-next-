import React from "react";
import { axiosGet, axiosPost } from "@/utils/dataFetch.js";

export const getTravelRepairList = async(number) =>{
    const url = "/travel/repair";
    const jsonData = await axiosGet(url);

    return jsonData;
}

export const getTravelRepairDetailList = async (did) => {
    const url = "/travel/repairDetail";
    const jsonData = await axiosPost(url, {"did":did});

    return jsonData;
}

export const getTravelRepairReviewList = async (rid) => {
    const url = "/travel/repairReview";
    const jsonData = await axiosPost(url, {"rid":rid});

    return jsonData;
}

export const insertTravelRepairReviewList = async (reviewData) => {
    const url = "/travel/repairReviewInsert";
    const jsonData = await axiosPost(url, reviewData);

    return jsonData;
}
