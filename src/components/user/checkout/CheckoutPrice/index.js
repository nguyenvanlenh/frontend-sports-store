import { Button, Col, Form, InputGroup, Row } from "react-bootstrap"
import { formatCurrencyVN } from "../../../../utils/common"
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { ItemOrderDetail } from "../ItemOrderDetail";
export const CheckoutPrice = () => {
    const cartItems = useSelector(state => state.cart);
    const [totalPriceCart] = React.useState(() => {
        return cartItems.reduce((acc, item) => {
            return acc + item.quantity * item.product.price;
        }, 0);
    });
    const [coupon, setCoupon] = React.useState("");
    const shippingFee = 0;
    return (
        <div className="mt-4">
            {cartItems.map((item) => {
                return (
                    <ItemOrderDetail key={uuidv4()} detail={item} />
                )
            })}
            <hr />
            <Row>
                <Col lg={8} xs={8}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Mã giảm giá"
                            aria-label="couponCode"
                            value={coupon}
                            onChange={(e) => setCoupon(e.value.target)} />
                    </InputGroup>
                </Col>
                <Col lg={4} xs={4}>
                    <Button variant="secondary">Áp dụng</Button>
                </Col>
            </Row>
            <hr />
            <div className="d-flex justify-content-between">
                <span>Tạm tính</span>
                <span>{formatCurrencyVN(totalPriceCart)}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span>Phí vận chuyển</span>
                <span>{formatCurrencyVN(shippingFee)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
                <span className="fs-5">Tổng cộng</span>
                <span className="fs-4 text-uppercase">{formatCurrencyVN(totalPriceCart + shippingFee)}</span>
            </div>
        </div>
    )
}