"use client"

import CartShippingInfo from "@/components/cart/CartShippingInfo";
import {CartHeader} from "@/components/cart/CartHeader";
import {CartItem} from "@/components/cart/CartItem";
import {useEffect} from "react";
import useCartStore from "@/store/useCartStore";

export default function CartMain({initialCartList}){
    const {showCartItem, updateTotalPrice} = useCartStore();

    useEffect(() => {
        if (initialCartList && initialCartList.length > 0) {
            showCartItem(initialCartList );
            updateTotalPrice();
        }
    }, [initialCartList, showCartItem, updateTotalPrice]);
    return(
        <>
        <CartHeader />
        <CartItem />
        <CartShippingInfo />
        </>
    );
}