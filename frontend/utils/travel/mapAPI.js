import React from "react";
import { axiosGet} from "@/utils/dataFetch.js";

export const getMarkerList = async (number) => {
    const url = "http://localhost:9000/map/all";
    const jsonData = await axiosGet(url);

    return jsonData;
}

