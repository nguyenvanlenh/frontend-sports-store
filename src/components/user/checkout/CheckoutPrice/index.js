import { Badge, Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap"
import { formatCurrencyVN } from "../../../../utils/common"
import ImageLiver from "../../../../data/img/liver.webp";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import React from "react";
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

const ItemOrderDetail = ({ detail }) => {

    return (
        <Row className="d-flex justify-content-between align-items-center mt-3 mb-3">
            <Col lg={8} xs={8}>
                <div className="d-flex" >
                    <div style={{
                        position: "relative",
                        display: "inline-block",
                    }}>
                        <Image
                            src={ImageLiver}
                            thumbnail
                            style={{
                                width: "70px",
                                height: "70px",
                                objectFit: "cover",
                                marginRight: "20px"
                            }} />
                        <Badge
                            pill
                            bg="light"
                            text="secondary"
                            style={{
                                position: "absolute",
                                top: "-7px",
                                right: "9px"
                            }}
                        >{detail.quantity}</Badge>
                    </div>
                    <div className="d-flex flex-column ms-2">
                        <span>{detail.product.name}</span>
                        <span>{detail.size.name}</span>
                    </div>
                </div>
            </Col>
            <Col lg={4} xs={4}>
                <span className="d-flex justify-content-end">{formatCurrencyVN(detail.quantity * detail.product.price)}</span>
            </Col>
        </Row>
    )

}