"use client";

import RentalBikeList from '@/app/(Rental)/rental/components/RentalBikeList.jsx';
import { CheckoutPage } from '@/app/(Rental)/rental/components/Tosspayments.jsx';
import useRentalInfoLogic from '../hooks/useRentalInfoLogic';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useRentalStore } from "@/store/useRentalStore";
import useKakaoLoader from "@/utils/rental_util/useKakaoLoader";
import { defaultMarkerImage, selectedMarkerImage } from '@/app/(Rental)/rental/contents/rentalContent';
import { getDistance } from '@/app/(Rental)/rental/contents/rentalContent';

const RentalPayment = () => {
    useKakaoLoader();

    const {
        rentalTime,
        selectedPayment,
        paymentJsonData,
        calculatedPrice,
        otherPayment,
        setOtherPayment,
        handleTimeIncrease,
        handleTimeDecrease,
        handleTimeAllDay,
        handlePaymentChange,
        handlePayment,
    } = useRentalInfoLogic();
    const {
        latLon,
        filteredBikeList,
        selectedStation,
        setMapCenter,
        setSelectedStation,
        setFilteredList
    } = useRentalStore();

    return (
        <>
            <div className="bike_rental_payment_info">
                <h3>{paymentJsonData[0]?.time_event?.title}</h3>
                <div className='rental_payment_container'>
                    <div className="payment_map_box">
                        <Map
                            className='payment_map'
                            center={latLon}
                            level={4}
                            style={{ width: "100%", height:"40vh"}}
                            onIdle={(map) => {
                                const center = map.getCenter();

                                const newCenter = {
                                    lat: center.getLat(),
                                    lng: center.getLng(),
                                };
                                setMapCenter(newCenter);
                                const RADIUS = 0.5;
                                const MAX_MARKERS = 10;

                                const filtered = useRentalStore
                                    .getState()
                                    .bikeList
                                    .filter(station => {
                                        const dist = getDistance(
                                            newCenter.lat,
                                            newCenter.lng,
                                            station.latitude,
                                            station.longitude
                                        );
                                        return dist <= RADIUS;
                                    })
                                    .slice(0, MAX_MARKERS)

                                setFilteredList(filtered);
                            }}
                        >
                            {filteredBikeList.map((station) => (
                                <MapMarker
                                    key={station.id}
                                    position={{ lat: station.latitude, lng: station.longitude }}
                                    image={station.id === selectedStation?.id ? selectedMarkerImage : defaultMarkerImage}
                                    onClick={() => setSelectedStation(station)}
                                />
                            ))}
                        </Map>
                        <RentalBikeList />
                    </div>
                    <div className='payment_items'>
                        <div className='payment_time_event'>
                            <button
                                className='payment_handletime_decrease'
                                type='button'

                                onClick={handleTimeDecrease}>{paymentJsonData[0]?.time_event?.decrease}</button>
                            <span>{rentalTime}</span>
                            <span>{paymentJsonData[0]?.time_event?.minute}</span>
                            <button
                                className='payment_handletime_increase'
                                type='button'
                                onClick={handleTimeIncrease}>{paymentJsonData[0]?.time_event?.increase}</button>
                        </div>
                        <div className='payment_time_allday_box'>
                            <button
                                className='payment_handleTime_allday'
                                type='button'
                                onClick={handleTimeAllDay}
                            >{paymentJsonData[1]?.payment_allday?.name}</button>
                            <p>{paymentJsonData[1]?.payment_allday?.desc}</p>
                        </div>
                        <div className='payment_price_info'>
                            <ul>
                                <li className='price_info'>
                                    <em>{paymentJsonData[2]?.price_info?.title}</em>
                                    <span>{calculatedPrice.toLocaleString('ko-KR')}{paymentJsonData[2]?.price_info?.sign}</span>
                                </li>
                            </ul>
                            <div>
                                <strong>{paymentJsonData[3]?.choice?.title}</strong>
                                <ul className='payment_choice'>
                                    <li>
                                        <label htmlFor="kakaopay">
                                            <img src={paymentJsonData[3]?.choice?.kakaopay_img} alt={paymentJsonData[3]?.choice?.kakao} />
                                        </label>
                                        <input
                                            type="radio"
                                            id='kakaopay'
                                            name='paymentCheckd'
                                            value="kakaopay"
                                            onChange={handlePaymentChange}
                                            checked={selectedPayment === 'kakaopay'}
                                        />
                                    </li>
                                    {/* <li>
                                <label htmlFor="otmerpayment">
                                    <img src={paymentJsonData[3]?.choice?.naverpay_img} alt={paymentJsonData[3]?.choice?.naver} />
                                </label>
                                    <input
                                        type="radio"
                                        id='otmerpayment'
                                        name='paymentCheckd'
                                        value="otmerpayment"
                                        onChange={handlePaymentChange}
                                        checked={selectedPayment === 'otmerpayment'}
                                    />
                            </li> */}
                                    <li>
                                        <button
                                            type='button'
                                            onClick={() => setOtherPayment(true)}
                                        >다른 결제 수단
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {otherPayment && (
                            <CheckoutPage
                                data={otherPayment}
                                onClose={() => setOtherPayment(false)}
                            />
                        )}
                        <form>

                            <button className='payment_button' type='button' onClick={handlePayment}>{paymentJsonData[4]?.price_button?.payment_button}</button>
                            <button
                                className='payment_info_close'
                                type='button'
                            >{paymentJsonData[4]?.price_button?.price_back}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RentalPayment;