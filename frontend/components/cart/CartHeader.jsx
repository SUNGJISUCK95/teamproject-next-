export function CartHeader(){
    return(
        <div className="cart-header">
            <h1>장바구니</h1>
            <ul className="cart-stepper">
                <li className="step-item"><span className="step-name">Step 01 장바구니</span></li>
                <li className="step-item"><span className="step-name">Step 02 주문결제</span></li>
                <li className="step-item"><span className="step-name">Step 03 주문완료</span></li>
            </ul>
        </div>
    )
}