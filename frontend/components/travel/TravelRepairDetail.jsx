"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export function TravelRepairDetail({did,
                                    uid,
                                    rname,
                                    rlike,
                                    score,
                                    tag,
                                    location,
                                    repair,
                                    address,
                                    localAddress,
                                    business,
                                    phone,
                                    other,
                                    menu,
                                    mainImages,
                                    imageList,
                                    review,
                                    save,
                                    handleLikeUpdate,
                                    handleReviewUpload
                                    }) {

  //문자열(JSON) 파싱 처리
  const parsedTag = tag ? JSON.parse(tag) : [];
  const parsedBusiness = business ? JSON.parse(business) : [];
  const parsedOther = other ? JSON.parse(other) : [];
  const parsedMenu = menu ? JSON.parse(menu) : [];
  const parsedMainImages = mainImages ? JSON.parse(mainImages) : [];
  const parsedImageList = imageList ? JSON.parse(imageList) : [];
  const parsedSave = save ? JSON.parse(save) : [];

  // parsedSave안에 did가 있는지 확인
  const isSaved = parsedSave.includes(did);

  const imageButtons = ["전체", "업체", "블로그"];
  const reviewButtons = ["최신순", "평점 높은순", "평점 낮은순"];

  const [activeImageMenu, setActiveImageMenu] = useState(0);
  const [activeReviewMenu, setActiveReviewMenu] = useState(0);
  const [pushLike, setPushLike] = useState(false);
  const [showLocalAddress, setShowLocalAddress] = useState(false);
  const [showAllTime, setShowAllTime] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showAllImage, setShowAllImage] = useState(false);
  const [reviewStar, setReviewStar] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewImages, setReviewImages] = useState([]);

  const sortedReview = [...review].sort((a, b) => {
    if (activeReviewMenu === 0) {
      return new Date(b.date) - new Date(a.date); // 최신순
    }
    if (activeReviewMenu === 1) {
      return b.star - a.star; // 평점 높은순
    }
    if (activeReviewMenu === 2) {
      return a.star - b.star; // 평점 낮은순
    }
    return 0;
  });

  const handleImageMenu = (idx) => {
    setActiveImageMenu(idx);
  };

  const handleReviewMenu = (idx) => {
    setActiveReviewMenu(idx);
  };

  const handleLike = (did) => {
      let newRid;

      if (parsedSave.includes(did)) {
          // 이미 저장되어 있으면 제거
          newRid = parsedSave.filter(rid => rid !== did);
      } else {
          // 저장되어 있지 않으면 추가
          newRid = [...parsedSave, did];
      }

      handleLikeUpdate(uid, newRid); // uid, 새로운 배열
  };

  const handleAddress = () => {
      setShowLocalAddress(!showLocalAddress);
  }

  const handleTime = () => {
      setShowAllTime(!showAllTime);
  }

  const handleMenu = () => {
      setShowAllMenu(!showAllMenu);
  }

  const handleImage = () => {
      setShowAllImage(!showAllImage);
  }

  const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);

      // 최대 3개까지만 허용
      const availableSlots = 3 - reviewImages.length;
      const limitedFiles = files.slice(0, availableSlots);

      if (limitedFiles.length === 0) {
          Swal.fire({
              icon: "info",
              title: "이미지 제한",
              text: "이미지는 최대 3개까지 업로드 가능합니다.",
          });
          return;
      }

      const newImages = [];
      let loadedCount = 0;

      limitedFiles.forEach((file) => {
          const reader = new FileReader();

          reader.onload = () => {
              newImages.push(reader.result);
              loadedCount += 1;

              if (loadedCount === limitedFiles.length) {
                  // 기존 이미지 + 새로 읽은 이미지 합치기
                  setReviewImages([...reviewImages, ...newImages]);
              }
          }
      reader.readAsDataURL(file); // 이제 file 타입만 전달
      });
  };

  const handleSubmitReview = () => {
      if (reviewStar === 0) {
          Swal.fire({
              icon: "info",
              title: "별점 선택",
              text: "별점을 선택해주세요.",
          });
          return;
      }
      if (reviewText.trim() === "") {
          Swal.fire({
              icon: "info",
              title: "리뷰 작성",
              text: "리뷰 내용을 입력해주세요.",
          });
          return;
      }

      const reviewData = {
          rid: did,
          uid: uid,           // 로그인한 유저 아이디
          star: reviewStar,
          content: reviewText,
          imageList: JSON.stringify(reviewImages)  // base64 또는 파일 그대로 서버 전송 가능
      };

      handleReviewUpload(reviewData);

      // 초기화
      setReviewStar(0);
      setReviewText("");
      setReviewImages([]);
  };

  return(
      <>            
          <div className="detail-top">
              <ul className="detail-title">
                  <li className="detail-title-image-box">
                      { parsedMainImages && parsedMainImages.map((MainImage, idx) => (
                          <React.Fragment key={idx}>
                              <img className="detail-title-image" src={MainImage}/>
                          </React.Fragment>
                      ))}
                  </li>
                  <li className="detail-title-name-box" >
                      <span className="detail-title-name">{rname}</span>
                      <button className="detail-title-save" onClick={() => handleLike(did)}>
                          {isSaved ? (
                              <i className="fa-solid fa-bookmark fa-pushBookmark"></i>
                          ) : (
                              <i className="fa-regular fa-bookmark"></i>
                          )}
                      &nbsp;저장
                      </button>

                      <button className="detail-title-share"><i className="fa-regular fa-share-from-square"></i> 공유</button>
                  </li>
                  <li className="detail-title-location" >{location} | {repair}</li>
                  <li className="detail-title-like-box" >
                      { <span>
                        {
                          rlike < 2 ? (
                              <>
                                <span className="detail-title-like" >
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star fa-nostar"></i>
                                    <i className="fa-regular fa-star fa-nostar"></i>
                                    <i className="fa-regular fa-star fa-nostar"></i>
                                    <i className="fa-regular fa-star fa-nostar"></i>
                                </span>
                              </>
                            ) :
                          rlike < 3 ? (
                              <>
                                <span className="detail-title-like" >
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </span>
                              </>
                            ) :
                          rlike < 4 ? (
                              <>
                                <span className="detail-title-like" >
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </span>
                              </>
                            ) :
                          rlike < 5 ? (
                              <>
                                <span className="detail-title-like" >
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-regular fa-star"></i>
                                </span>
                              </>
                            ) :
                          (
                              <>
                                 <span className="detail-title-like" >
                                     <i className="fa-solid fa-star"></i>
                                     <i className="fa-solid fa-star"></i>
                                     <i className="fa-solid fa-star"></i>
                                     <i className="fa-solid fa-star"></i>
                                     <i className="fa-solid fa-star"></i>
                                 </span>
                              </>
                          )
                        }
                      </span> }
                      { <span>
                        {
                          rlike < 2 ? (
                              <>
                                <span className="detail-title-likeNum" >1.0</span>
                              </>
                            ) :
                          rlike < 3 ? (
                              <>
                                <span className="detail-title-likeNum" >2.0</span>
                              </>
                            ) :
                          rlike < 4 ? (
                              <>
                                <span className="detail-title-likeNum" >3.0</span>
                              </>
                            ) :
                          rlike < 5 ? (
                              <>
                                <span className="detail-title-likeNum" >4.0</span>
                              </>
                            ) :
                          (
                              <>
                                <span className="detail-title-likeNum" >5.0</span>
                              </>
                          )
                        }
                      </span> }
                      <span className="detail-title-reviewNum" >({review.length}명의 평가)</span>
                      {/*여긴 리뷰개수 카운트 */}
                      <span className="detail-title-likeScore" >{score}점</span></li>
                  <li className="detail-title-address-box">
                      <i className="fa-solid fa-location-dot"></i>
                      <span className="detail-title-address"> {address}</span>
                      <button className="detail-title-address-button" onClick={handleAddress}>
                          지번
                           {showLocalAddress ? (
                               <i className="fa-solid fa-chevron-up"></i>
                           ) : (
                               <i className="fa-solid fa-chevron-down"></i>
                           )}
                      </button>
                  </li>
                  {showLocalAddress && (
                      <li className="detail-title-localAddress-box">
                          <span className="detail-title-localAddress-title">지번</span><span className="detail-title-localAddress"> {localAddress}</span>
                      </li>
                  )}
                  <li className="detail-title-time-box">
                      <i className="fa-solid fa-clock"></i>
                      {parsedBusiness && parsedBusiness
                          .filter((_, idx) => idx === 0)
                          .map((businessDetail, idx) => (

                          <React.Fragment key={idx}>
                              <span className="detail-title-time"> 영업시간: {businessDetail.houers}</span>
                              <button className="detail-title-time-button" onClick={handleTime}> 전체 영업시간 정보
                                  {showAllTime ? (
                                      <i className="fa-solid fa-chevron-up"></i>
                                  ) : (
                                      <i className="fa-solid fa-chevron-down"></i>
                                  )}
                              </button><br/>
                          </React.Fragment>
                      ))}
                  </li>
                  {showAllTime && (
                      <li className="detail-title-allTime-box">
                          {parsedBusiness && parsedBusiness
                              .filter((_, idx) => idx > 0)
                              .map((businessDetail, idx) => (
                            <React.Fragment key={idx}>
                               <span className="detail-title-allDay">({businessDetail.day})</span>
                               <span className="detail-title-allTime"> 영업시간: {businessDetail.houers}</span><br/>
                            </React.Fragment>
                          ))}
                      </li>
                  )}
                  <li className="detail-title-phone-box">
                      <i className="fa-solid fa-book"></i>
                      <span className="detail-title-phone"> {phone}</span>
                  </li>
                  <li className="detail-title-tag-box">
                      <i className="fa-solid fa-tag"></i>
                      {parsedTag && parsedTag.map((tagDetail, idx) => ( 
                        <span key={idx} className="detail-title-tag" > {tagDetail}{idx !== parsedTag.length - 1 ? ", " : ""}</span>
                      ))}
                  </li>
                  <li className="detail-title-other-box">
                      <i className="fa-solid fa-plus"></i>
                      {parsedOther && parsedOther.map((otherDetail, idx) => (
                        <span key={idx} className="detail-title-other" > {otherDetail}{idx !== parsedOther.length - 1 ? ", " : ""}</span>
                      ))}
                  </li>
                  <li className="detail-title-support-box">
                      <i className="fa-solid fa-comment"></i>
                      <span className="detail-title-support" > 정보수정 제한</span>
                  </li>
              </ul>

              <ul className="detail-menu">
                  <li className="detail-menu-title" >작업정보</li>
                  {parsedMenu && parsedMenu
                      .filter((_, idx) => idx <= 2)
                      .map((menuDetail, idx) => (
                    <li key={idx} className="detail-menu-item">
                      <span className="detail-menu-item-mname">{menuDetail.rname}</span>
                      <span className="detail-menu-item-dash"></span>
                      <span className="detail-menu-item-price">{Number(menuDetail.price).toLocaleString()}원</span>
                    </li>
                  ))}
                  {showAllMenu && (
                    <>
                       {parsedMenu && parsedMenu
                           .filter((_, idx) => idx >= 3)
                           .map((menuDetail, idx) => (
                         <li key={idx} className="detail-menu-item">
                          <span className="detail-menu-item-mname">{menuDetail.rname}</span>
                          <span className="detail-menu-item-dash"></span>
                          <span className="detail-menu-item-price">{Number(menuDetail.price).toLocaleString()}원</span>
                         </li>
                       ))}
                    </>
                  )}
                  <li className="detail-menu-more-box">
                      <button className="detail-menu-more" onClick={handleMenu}>
                          메뉴 모두 보기
                          {showAllMenu ? (
                              <i className="fa-solid fa-chevron-up"></i>
                          ) : (
                              <i className="fa-solid fa-chevron-down"></i>
                          )}
                      </button>
                  </li>
              </ul>
          </div>
          <ul className="detail-image">
              <li className="detail-image-title"><span>{rname}</span> 사진(손님이 찍은사진)</li>
              <li className="detail-image-button-box">
                  <div className="detail-image-button-box">
                    {imageButtons.map((imageBtnName, idx) => (
                      <button
                        key={idx}
                        className={
                          activeImageMenu === idx
                            ? "detail-image-button-active"
                            : "detail-image-button"
                        }
                        onClick={() => handleImageMenu(idx)}
                      >
                      {imageBtnName}
                      </button>
                    ))}
                  </div>
              </li>
              <li className="detail-image-box">
                  {parsedImageList && parsedImageList
                      .filter(
                          (parsedImage) =>
                          imageButtons[activeImageMenu] === "전체" ||
                          parsedImage.category === imageButtons[activeImageMenu]
                      )
                      .map((parsedImage, idx) => (
                      <React.Fragment key={idx}>
                          {parsedImage && parsedImage.images
                              .filter((_, idx) => idx <= 5)
                              .map((imageSrc, imgIdx) => (
                                <img
                                  key={imgIdx}
                                  className="detail-view-image"
                                  src={imageSrc}
                                  alt={`${parsedImage.category}-${imgIdx}`}
                                />

                          ))}
                      </React.Fragment>
                  ))}
                  {showAllImage &&
                      <>
                          {parsedImageList && parsedImageList
                              .filter(
                                  (parsedImage) =>
                                  imageButtons[activeImageMenu] === "전체" ||
                                  parsedImage.category === imageButtons[activeImageMenu]
                              )
                              .map((parsedImage, idx) => (
                              <React.Fragment key={idx}>
                                  {parsedImage && parsedImage.images
                                      .filter((_, idx) => idx >= 6)
                                      .map((imageSrc, imgIdx) => (
                                        <img
                                          key={imgIdx}
                                          className="detail-view-image"
                                          src={imageSrc}
                                          alt={`${parsedImage.category}-${imgIdx}`}
                                        />
                                  ))}
                              </React.Fragment>
                          ))}
                      </>
                  }
              </li>
              <li className="detail-image-more-box">
                  <button className="detail-image-more" onClick={handleImage}>
                      사진 더보기
                      {showAllImage ? (
                          <i className="fa-solid fa-chevron-up"></i>
                      ) : (
                          <i className="fa-solid fa-chevron-down"></i>
                      )}
                  </button>
              </li>
          </ul>

          {/* 리뷰 영역 */}
          <ul className="detail-review">
              <li className="detail-review-title">{rname} 방문자 리뷰</li>
              <li className="detail-review-button-box">
                  {reviewButtons.map((reviewBtnName, idx) => (
                    <button
                      key={idx}
                      className={
                        activeReviewMenu === idx
                          ? "detail-review-button-active"
                          : "detail-review-button"
                      }
                      onClick={() => handleReviewMenu(idx)}
                    >
                    {reviewBtnName}
                    </button>
                  ))}
              </li>
              {sortedReview && sortedReview.map((reviewDetail, idx) => (
                  <li key={idx} className="detail-review-box">
                      <div className="detail-review-profile">
                          <img className="detail-review-user-image" src={reviewDetail.userImage} alt="프로필" />
                          <div className="detail-review-info">
                              <span className="detail-review-user-id">{reviewDetail.uid}</span><br/>
                              <span className="detail-review-user-like">평균 별점 {reviewDetail.star} </span>
                              <span className="detail-review-user-stats">
                                  평가 {reviewDetail.userTotalReview} 팔로워 {reviewDetail.userFllowers}
                              </span>
                          </div>
                      </div>
                      <div className="detail-review-image-box">
                        { reviewDetail.imageList &&
                          JSON.parse(reviewDetail.imageList).map((reviewImage, idx) => (
                            <img key={idx} className="detail-review-image" src={reviewImage} />
                          ))
                        }
                      </div>
                      <div className="detail-review-date">{reviewDetail.date}</div>
                      <div className="detail-review-description">
                          {reviewDetail.content}
                      </div>
                  </li>
              ))}
          </ul>

          {/* 리뷰 작성 영역 */}
          <ul className="detail-review-write">
              <li className="detail-review-write-title">리뷰 작성</li>
              <li>
                  <div className="detail-review-star-image-box">
                      {/* 별점 선택(이미지/아이콘 클릭) */}
                      <div className="detail-review-write-stars">
                        {[1,2,3,4,5].map((starValue) => (
                          <i
                            key={starValue}
                            className={
                              reviewStar >= starValue
                                ? "fa-solid fa-star star-selected"  // 선택된 별
                                : "fa-regular fa-star star-unselected" // 선택 안된 별
                            }
                            onClick={() => setReviewStar(starValue)}
                            style={{ cursor: "pointer", color: "#FFD700", fontSize: "24px", marginRight: "4px" }}
                          />
                        ))}
                        <span> {reviewStar}.0 / 5.0</span>
                      </div>

                      {/* 이미지 업로드 */}
                      <div>
                        {/* 숨겨진 파일 input */}
                        <input
                          type="file"
                          id="reviewImageUpload"
                          multiple
                          onChange={handleImageUpload}
                          style={{ display: "none" }} // 숨기기
                        />

                        {/* 아이콘 버튼 */}
                        <label htmlFor="reviewImageUpload" style={{ cursor: "pointer" }}>
                          <i className="fa-solid fa-camera" style={{ fontSize: "24px", color: "#333" }}></i> 사진 업로드
                        </label>

                        {/* 업로드한 이미지 미리보기 */}
                        <div className="detail-review-preview">
                          {reviewImages.map((img, idx) => (
                            <img key={idx} src={img} className="review-preview-img" />
                          ))}
                        </div>
                      </div>
                  </div>
              </li>
              {/* 리뷰 텍스트 입력 */}
              <li>
                  <textarea
                      className="detail-review-textarea"
                      placeholder="방문하신 후기를 남겨주세요."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                  />
              </li>

              {/* 등록 버튼 */}
              <li className="detail-review-submit-box">
                  <button className="detail-review-submit" onClick={handleSubmitReview}>
                      리뷰 등록
                  </button>
              </li>
          </ul>
      </>
  );
}