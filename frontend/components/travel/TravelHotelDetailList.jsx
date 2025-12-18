"use client";

import { useEffect, useState } from 'react';

import { TravelHotelDetail } from "./TravelHotelDetail.jsx";

import { getTravelHotelDetailList, getTravelHotelReviewList, insertTravelHotelReviewList } from '@/utils/travel/travelHotelAPI.js';
import { getTravelSaveList, updateTravelSaveList } from '@/utils/travel/travelSaveAPI.js';
import Swal from 'sweetalert2';

export function TravelHotelDetailList({ selectedDid }) {
    const [travelHotelDetailList, setTravelHotelDetailList] = useState([]);
    const [travelHotelReviewList, setTravelHotelReviewList] = useState([]);
    const [travelSaveList, setTravelSaveList] = useState([]);

    let uid = null;

    try {
      const loginInfoString = localStorage.getItem("loginInfo");
      if (loginInfoString) {
        const loginInfo = JSON.parse(loginInfoString);
        uid = loginInfo.userId;
      }
    } catch (e) {
      console.error("로그인 정보 파싱 오류:", e);
    }

    useEffect(() => {
      async function fetchDetailData() {
        const dataDetail = await getTravelHotelDetailList(selectedDid);
        setTravelHotelDetailList(dataDetail);
      }
      fetchDetailData();
    }, []);

    useEffect(() => {
      async function fetchReviewData() {
        const dataReview = await getTravelHotelReviewList(selectedDid);
        setTravelHotelReviewList(dataReview);
      }
      fetchReviewData();
    }, []);

    useEffect(() => {
      if (!uid) return; // 로그인 안 되어 있으면 API 호출 X

      async function fetchSaveData() {
        const dataSave = await getTravelSaveList(uid);
        setTravelSaveList(dataSave);
      }
      fetchSaveData();
    }, [uid]);

    const reFetchReviewData = async () => {
      const dataReview = await getTravelHotelReviewList(selectedDid);
      setTravelHotelReviewList(dataReview);
    };

    const handleLikeUpdate = async (uid, newHid) => {
        if (!uid) {
           Swal.fire({
               icon: "info",
               title: "회원 제한",
               text: "로그인이 필요합니다!",
           });
            return;
        }

        const hid = JSON.stringify(newHid);
        const dataSave = await updateTravelSaveList(uid, hid, "hotel");
        setTravelSaveList(dataSave);
    }

    const handleReviewUpload = async (reviewData) => {
        if (!uid) {
            Swal.fire({
                icon: "info",
                title: "회원 제한",
                text: "로그인이 필요합니다!",
            });
            return;
        }

        const result = await insertTravelHotelReviewList(reviewData);
        if (result) {
            Swal.fire({
                icon: "success",
                title: "등록 성공",
                text: "리뷰등록 성공하였습니다.",
            });
            await reFetchReviewData();
        }
    }

    return(
        <>
            {travelHotelDetailList &&
                    <TravelHotelDetail
                        did={travelHotelDetailList.did}
                        uid = {uid}
                        hname={travelHotelDetailList.hname}
                        hlike={travelHotelDetailList.hlike}
                        score={travelHotelDetailList.score}
                        tag={travelHotelDetailList.tag}
                        location={travelHotelDetailList.location}
                        hotel={travelHotelDetailList.hotel}
                        address={travelHotelDetailList.address}
                        localAddress={travelHotelDetailList.localAddress}
                        business={travelHotelDetailList.business}
                        phone={travelHotelDetailList.phone}
                        other={travelHotelDetailList.other}
                        menu={travelHotelDetailList.menu}
                        mainImages={travelHotelDetailList.mainImages}
                        imageList={travelHotelDetailList.imageList}
                        review = {travelHotelReviewList}
                        save = {travelSaveList.hid}
                        handleLikeUpdate = {handleLikeUpdate}
                        handleReviewUpload = {handleReviewUpload}
                    />
            }
        </>
    );
}