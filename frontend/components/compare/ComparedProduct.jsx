"use client"

import '@/styles/compare.css';
import {useRouter} from "next/navigation";
import useCompareStore from "@/store/useCompareStore";

export function ComparedProduct(){
    const {compareList, removeCompareItem} = useCompareStore();
    const router = useRouter();
    const itemsToDisplay = compareList.slice(0, 3);
    const goToProduct = () => {
        router.push("/products/mountain");
    }

    return(
        <div className="compare-container">
            <h2>제품 비교</h2>

            {itemsToDisplay.length > 0 ? (
                <table className="compare-table">
                    <thead>
                    <tr>
                        <th className="spec-header">
                            <span className="total-count">
                                    총 {itemsToDisplay.length}개
                                </span>
                        </th>
                        {itemsToDisplay.map(product => (
                            <th key={product.pid + product.category} className="product-header">
                                <img src={product.image} alt={product.name}/>
                                <p className="product-name">{product.name}</p>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeCompareItem(product)}>
                                    삭제
                                </button>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="spec-row">
                        <td className="spec-name">가격</td>
                        {itemsToDisplay.map(product => (
                            <td key={product.pid + product.category}>
                                {product.price.toLocaleString()}원
                            </td>
                        ))}
                    </tr>

                    <tr className="spec-row">
                        <td className="spec-name">요약</td>
                        {itemsToDisplay.map(product => (
                            <td key={product.pid + product.category}>
                                {product.subinfo}
                            </td>
                        ))}
                    </tr>

                    <tr className="spec-row spec-description">
                        <td className="spec-name">메인 스펙</td>
                        {itemsToDisplay.map(product => (
                            <td key={product.pid + product.category}>
                                <ul>
                                    {product.description.map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </ul>
                            </td>
                        ))}
                    </tr>
                    </tbody>
                </table>
            ) : (
                <div className="empty-compare">
                    <p>비교할 상품이 없습니다.</p>
                    <p>상품 목록에서 '비교하기' 버튼을 눌러 상품을 추가해주세요.</p>
                    <button onClick={goToProduct}>자전거 보기</button>
                </div>
            )}
        </div>
    );
}