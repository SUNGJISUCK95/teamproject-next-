import React from "react";
import { axiosGet} from "@/utils/dataFetch.js";

export const getMarkerList = async (number) => {
    const url = "/map/all";
    const jsonData = await axiosGet(url);

    return jsonData;
}

