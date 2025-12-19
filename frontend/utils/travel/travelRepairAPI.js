import React from "react";
import { axiosPost } from "@/utils/dataFetch.js";

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
