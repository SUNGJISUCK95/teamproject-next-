import React from 'react';
import {createProduct, setProduct, setStoreList} from './productSlice.js';
import {axiosGet} from '../../utils/dataFetch.js';

export const getProduct = (category,pid) => async(dispatch) => {
    // const jsonData = await axiosData(`/data/${category}/${category}Data.json`);
    // const foundProduct = jsonData.find(item => item.pid.toString() === pid.toString());
    const url = `/products/${category}/${pid}`;
    const product = await axiosGet(url)

    dispatch(setProduct(product));
}

export const getProductList = (category) => async(dispatch) => {
    // const jsonData = await axiosData(`/data/${category}/${category}Data.json`);
    // return dispatch(createProduct({"products":jsonData}));
    const url = `/products/${category}`;
    console.log(url);
    const productData = await axiosGet(url);
    dispatch(createProduct({"products":productData}));

}
export const getStore = () => async(dispatch) => {
    // const jsonData = await axiosData("/data/productLocation.json");
    const url = "/location"
    const storeData = await axiosGet(url);

    dispatch(setStoreList(storeData));
}