import '@/styles/cart/cart.css';
import {axiosPost} from "@/utils/dataFetch";
import CartMain from "@/components/cart/CartMain";

const showCartList = async() => {
    const url = `/cart/list`;
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    const data = await axiosPost(url,{"uid":userId});
    console.log(data);
    return data;
}

export default async function CartPage(){

    const list = await showCartList();

    return(
        <div className="cart-page-container">
            <CartMain initialCartList={list}/>
        </div>
    );
}