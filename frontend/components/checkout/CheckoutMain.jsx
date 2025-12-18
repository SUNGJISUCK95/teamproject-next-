
import {CheckoutHeader} from "@/components/checkout/CheckoutHeader.jsx";
import {CheckoutForm} from "@/components/checkout/CheckoutForm.jsx";
import {CheckoutOrder} from "@/components/checkout/CheckoutOrder.jsx";
import {CheckoutPayment} from "@/components/checkout/CheckoutPayment.jsx";
import '@/styles/checkout.css';
import {axiosPost} from "@/utils/dataFetch";

const getCheckoutList = async () => {
    const url = 'http://localhost:9000/cart/list';
    const  userId  = "test111";
    const data = await axiosPost(url,{"uid":userId});
    return data;
}

export async function CheckoutMain(){
    // const cartList = useSelector((state)=>state.cart.cartList);
    // const totalPrice = useSelector((state)=>state.cart.totalPrice);
    const cartList = await getCheckoutList();
    const totalPrice = cartList.reduce((acc, item) => {
        return acc + (item.price * item.qty);
    }, 0);
    return(
        <div className="checkout-page-container">
            <CheckoutHeader/>
            <CheckoutForm cartList={cartList}/>
            <CheckoutOrder cartList={cartList}
                           totalPrice={totalPrice}/>
            <CheckoutPayment totalPrice={totalPrice}
                             cartList={cartList}/>
        </div>
    );
}