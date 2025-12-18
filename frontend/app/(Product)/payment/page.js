import {redirect} from "next/navigation";

export default function OrderIndexPage(){
        redirect('http://localhost:9000/payment/order');
}