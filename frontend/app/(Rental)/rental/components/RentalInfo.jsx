"use client";

import { imagePath } from '@/app/(Rental)/rental/contents/rentalContent';
import Link from 'next/link';

export function RentalInfo({ data }) {
    // 마커가 클릭 되지 않았을 시 데이터의 접근 시도를 차단해 빈 값의 반환을 차단하는 안전장치
    // if (!data) return null;

    return (
        <div className='map_marker_data_info'>
            {!data ? (
                <div className='map_marker_alarm' >
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
                    <Link className='boarding' href={`/rental/rental_payment/${data.id}`}>
                        대여하기
                    </Link>
                </div>
            )}
        </div>
    );
}