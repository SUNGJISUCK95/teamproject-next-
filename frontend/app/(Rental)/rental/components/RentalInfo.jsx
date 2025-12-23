"use client";

import { imagePath } from '@/app/(Rental)/rental/contents/rentalContent';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export function RentalInfo({ data }) {
    const router = useRouter();
    const userId = useAuthStore((s) => s.userId) || null; // hook은 최상위에서 호출

    const handleRentalClick = () => {
        if (!userId || userId.trim() === "") {
            alert("로그인이 필요합니다!");
            router.push("/login");
            return;
        }

        router.push(`/rental/rental_payment/${data.id}`);
    };

    return (
        <div className='map_marker_data_info'>
            {!data ? (
                <div className='map_marker_alarm'>
                    <img src="/images/home_bicycle1.png" />
                    <p>Marker Click</p>
                </div>
            ) : (
                <div>
                    <h3>{data?.name}</h3>
                    <img
                        className='map_marker_data_info_img'
                        src={imagePath}
                        alt="자전거 이미지"
                    />
                    <ul className='map_marker_data_info_list'>
                        <li style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ width: "100%", marginRight: "15px" }}>위도 <em>{data?.latitude}</em></span>
                            <span style={{ width: "100%", marginLeft: "15px" }}>경도 <em>{data?.longitude}</em></span>
                        </li>
                        <li>
                            <span>자전거 수: <strong>{data?.free_bikes}</strong></span>
                            <span>빈 거치대: <strong>{data?.empty_slots}</strong></span>
                            <span>어린이 자전거 : <strong>{data.extra?.kid_bikes}</strong></span>
                        </li>
                    </ul>
                    <button
                        className="boarding"
                        onClick={handleRentalClick}
                        // disabled={userId === null} // null이면 클릭 못함
                    >대여하기</button>
                </div>
            )}
        </div>
    );
}
