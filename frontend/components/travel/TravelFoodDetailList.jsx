"use client";

import { useEffect, useState } from 'react';

import { TravelFoodDetail } from "./TravelFoodDetail.jsx";

import { getTravelFoodDetailList, getTravelFoodReviewList, insertTravelFoodReviewList } from '@/utils/travel/travelFoodAPI.js';
import { getTravelSaveList, updateTravelSaveList } from '@/utils/travel/travelSaveAPI.js';
import Swal from 'sweetalert2';

export function TravelFoodDetailList({ selectedDid }) {
    const [travelFoodDetailList, setTravelFoodDetailList] = useState([]);
    const [travelFoodReviewList, setTravelFoodReviewList] = useState([]);
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
        const dataDetail = await getTravelFoodDetailList(selectedDid);
        setTravelFoodDetailList(dataDetail);
      }
      fetchDetailData();
    }, []);

    useEffect(() => {
      async function fetchReviewData() {
        const dataReview = await getTravelFoodReviewList(selectedDid);
        setTravelFoodReviewList(dataReview);
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
      const dataReview = await getTravelFoodReviewList(selectedDid);
      setTravelFoodReviewList(dataReview);
    };

    const handleLikeUpdate = async (uid, newFid) => {
        if (!uid) {
            Swal.fire({
                icon: "info",
                title: "회원 제한",
                text: "로그인이 필요합니다!",
            });
            return;
        }

        const fid = JSON.stringify(newFid);
        const dataSave = await updateTravelSaveList(uid, fid, "food");
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

        const result = await insertTravelFoodReviewList(reviewData);
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
            {travelFoodDetailList &&
                    <TravelFoodDetail
                        did={travelFoodDetailList.did}
                        uid = {uid}
                        fname={travelFoodDetailList.fname}
                        flike={travelFoodDetailList.flike}
                        score={travelFoodDetailList.score}
                        tag={travelFoodDetailList.tag}
                        location={travelFoodDetailList.location}
                        food={travelFoodDetailList.food}
                        address={travelFoodDetailList.address}
                        localAddress={travelFoodDetailList.localAddress}
                        business={travelFoodDetailList.business}
                        phone={travelFoodDetailList.phone}
                        other={travelFoodDetailList.other}
                        menu={travelFoodDetailList.menu}
                        mainImages={travelFoodDetailList.mainImages}
                        imageList={travelFoodDetailList.imageList}
                        review = {travelFoodReviewList}
                        save = {travelSaveList.fid}
                        handleLikeUpdate = {handleLikeUpdate}
                        handleReviewUpload = {handleReviewUpload}
                    />
            }
        </>
    );
}