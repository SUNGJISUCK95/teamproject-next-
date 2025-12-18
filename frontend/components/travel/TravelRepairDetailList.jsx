"use client";

import { useEffect, useState } from 'react';

import { TravelRepairDetail } from "./TravelRepairDetail.jsx";

import { getTravelRepairDetailList, getTravelRepairReviewList, insertTravelRepairReviewList } from '@/utils/travel/travelRepairAPI.js';
import { getTravelSaveList, updateTravelSaveList } from '@/utils/travel/travelSaveAPI.js';
import Swal from 'sweetalert2';

export function TravelRepairDetailList({ selectedDid }) {
    const [travelRepairDetailList, setTravelRepairDetailList] = useState([]);
    const [travelRepairReviewList, setTravelRepairReviewList] = useState([]);
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
        const dataDetail = await getTravelRepairDetailList(selectedDid);
        setTravelRepairDetailList(dataDetail);
      }
      fetchDetailData();
    }, []);

    useEffect(() => {
      async function fetchReviewData() {
        const dataReview = await getTravelRepairReviewList(selectedDid);
        setTravelRepairReviewList(dataReview);
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
      const dataReview = await getTravelRepairReviewList(selectedDid);
      setTravelRepairReviewList(dataReview);
    };

    const handleLikeUpdate = async (uid, newRid) => {
        if (!uid) {
            Swal.fire({
                icon: "info",
                title: "회원 제한",
                text: "로그인이 필요합니다!",
            });
            return;
        }

        const rid = JSON.stringify(newRid);
        const dataSave = await updateTravelSaveList(uid, rid, "repair");
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

        const result = await insertTravelRepairReviewList(reviewData);
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
            {travelRepairDetailList &&
                    <TravelRepairDetail
                        did={travelRepairDetailList.did}
                        uid = {uid}
                        rname={travelRepairDetailList.rname}
                        rlike={travelRepairDetailList.rlike}
                        score={travelRepairDetailList.score}
                        tag={travelRepairDetailList.tag}
                        location={travelRepairDetailList.location}
                        repair={travelRepairDetailList.repair}
                        address={travelRepairDetailList.address}
                        localAddress={travelRepairDetailList.localAddress}
                        business={travelRepairDetailList.business}
                        phone={travelRepairDetailList.phone}
                        other={travelRepairDetailList.other}
                        menu={travelRepairDetailList.menu}
                        mainImages={travelRepairDetailList.mainImages}
                        imageList={travelRepairDetailList.imageList}
                        review = {travelRepairReviewList}
                        save = {travelSaveList.rid}
                        handleLikeUpdate = {handleLikeUpdate}
                        handleReviewUpload = {handleReviewUpload}
                    />
            }
        </>
    );
}