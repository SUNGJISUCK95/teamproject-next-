import {OrderListMain} from "@/components/checkout/OrderListMain";
import {axiosPost} from "@/utils/dataFetch";

const getOrderList = async () => {
    const url = 'http://localhost:9000/payment/order';
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    const data = await axiosPost(url,{"uid":userId});
    return data;
}

export default async function OrderListPage() {

    const orderList = await getOrderList();

    return (
        <>
            <OrderListMain orderList={orderList}/>
        </>
    );
}