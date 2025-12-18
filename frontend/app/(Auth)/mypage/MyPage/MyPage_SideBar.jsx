
//
// import { Link } from 'react-router-dom';
import Link from "next/link";
export function MyPage_SideBar(){
    return(
    <>
    <div className="sideBar">
        <h1 className="sideBarTitle">사이드 탭</h1>
        <ul className="sideBarList">
            <Link href={`/cart`}>
                <li>
                    자전거 장바구니
                </li>
            </Link>
            <Link href={`/payment/order`}>
                <li>
                    자전거 구매내역
                </li>
            </Link>
            <li>여행지 찜목록</li>
        </ul>
    </div>
    </>)
}