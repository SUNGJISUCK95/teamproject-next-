"use client"

import {RiDeleteBin6Line} from "react-icons/ri";
import {useRouter} from "next/navigation";
import useCartStore from "@/store/useCartStore";

export function CartItem(){
    const { cartList, totalPrice , removeCart, updateCart, checkItem} = useCartStore();
    const router = useRouter();

    const goToProduct = () => {
        router.push("/products/mountain");
    }

    return(
        <div className="cart-item-list">

            {cartList && cartList.length > 0 ? (
                <>
                    {cartList
                        .filter(item => item.price !== undefined)
                        .map((item)=> (
                            <div key={item.cid} className="cart-item-row">
                                <input
                                    type="checkbox"
                                    className="cart-item-checkbox"
                                    checked={item.checked || false}
                                    onChange={() => checkItem(item.cid)}
                                />
                                {item.image && (
                                    <img src={`${item.image}`} alt={item.name} />
                                )}

                                <span className="item-name">{item.name && item.name}</span>
                                <span className="item-price">
                                {item.price && item.price.toLocaleString() + '원'}
                                </span>
                                <div className='cart-quantity'>
                                    <button type='button'
                                            onClick={()=>{item.qty > 1 && updateCart(item.cid, "-")}}>-</button>
                                    <input type='text' value={item.qty} readOnly/>
                                    <button type='button'
                                            onClick={()=> updateCart(item.cid, "+")}>+</button>
                                    <button className='cart-remove' onClick={()=>removeCart(item.cid)}>
                                        <RiDeleteBin6Line />
                                    </button>
                                </div>
                            </div>
                        ))}

                    <div className="cart-total-summary">
                        <span className="total-label">총 금액 :</span>
                        <span className="total-value">{totalPrice.toLocaleString()}원</span>
                    </div>
                </>
            ) : (
                <div className="cart-empty-message">
                    <p>장바구니에 상품이 없습니다.</p>
                    <button onClick={goToProduct}>자전거 구매</button>
                </div>
            )}
        </div>
    );
}