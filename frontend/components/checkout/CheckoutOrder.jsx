export function CheckoutOrder({ cartList, totalPrice }) {
    // const checkedItems = cartList.filter(item => item.checked && item.price);
    const checkedItems = cartList.filter(item => item.price > 0);
    return (
        <div className="order-summary-container">
            <h3>주문제품 내역</h3>
            <table className="order-summary-table">
                <thead>
                <tr>
                    <th>제품 정보</th>
                    <th>수량</th>
                    <th>판매금액</th>
                </tr>
                </thead>
                <tbody>
                {checkedItems.map(item => (
                    <tr key={item.cid}>
                        <td className="product-info">
                            <img src={item.image} alt={item.name} />
                            <span className="name">{item.name}</span>
                        </td>
                        <td>{item.qty}</td>
                        <td>{item.price.toLocaleString()}원</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="order-total-bottom">
                <div className="total-item">
                    <span className="label">총 판매금액</span>
                    <span className="value">{totalPrice.toLocaleString()}원</span>
                </div>
                <span className="operator">-</span>
                <div className="total-item">
                    <span className="label">총 할인금액</span>
                    <span className="value">0원</span>
                </div>
                <span className="operator">+</span>
                <div className="total-item">
                    <span className="label">총 배송비</span>
                    <span className="value">0원</span>
                </div>
                <span className="operator">=</span>
                <div className="total-item">
                    <span className="label">총 결제예상금액</span>
                    <span className="value" style={{color: '#d9534f'}}>
                        {totalPrice.toLocaleString()}원
                    </span>
                </div>
            </div>
        </div>
    );
}