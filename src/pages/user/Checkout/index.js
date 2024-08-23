import { Col, Row } from "react-bootstrap"
import { ShippingInfo } from "../../../components/user/checkout/ShippingInfo"
import { CheckoutPrice } from "../../../components/user/checkout/CheckoutPrice"

export const Checkout = () => {
    return (
        <>
            <Row>
                <Col lg={6} md={12} className="order-md-1 order-lg-2">
                    <CheckoutPrice />
                </Col>
                <Col lg={6} md={12} className="order-md-2 order-lg-1">
                    <ShippingInfo />
                </Col>
            </Row>
        </>
    )
}