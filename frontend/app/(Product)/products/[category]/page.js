import React from 'react';
import { ProductList } from '@/components/product/ProductList.jsx';
import {axiosGet} from "@/utils/dataFetch";

const getProductList = async(category) => {
    const url = `/products/${category}`;
    const data = await axiosGet(url);
    return data;
}

export default async function ProductsPage({params}) {
    const { category } = await params;

    const product = await getProductList(category);

    return (
        <div className='content' style={{paddingTop:'35px'}}>
            <div style={{marginTop:'20px'}}>
                <h2 className='all-products-title'>{category || 'All Products'}</h2>
            </div>
            <ProductList products={product}/>
        </div>
    );
}
