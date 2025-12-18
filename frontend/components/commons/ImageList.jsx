import React from 'react';

/**
 * ImageList 컴포넌트
 *
 * 역할:
 * - 전달받은 이미지 파일 이름 배열(imgList)을 기반으로
 *   <ul> 리스트 형태로 이미지를 렌더링한다.
 *
 * 특징:
 * - 이미지 경로는 /public/images/ 기준으로 접근함
 *   예: imgList = ["a.jpg"] → /images/a.jpg
 *
 * props:
 * - imgList: 이미지 파일명 배열 (예: ["img1.jpg", "img2.png"])
 * - className: <ul>에 적용할 CSS 클래스명
 */
export function ImageList({ imgList, className }) {
    return (
        <ul className={className}>
            {imgList &&
                imgList.map((img, idx) => (
                    <li key={idx}>
                        <img src={`/images/${img}`} alt={img} />
                    </li>
                ))}
        </ul>
    );
}
