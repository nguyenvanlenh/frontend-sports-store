import { Col, Row, Table } from "react-bootstrap"
import { CartItem } from "../../../components/user/cart/CartItem"
import { CartPrice } from "../../../components/user/cart/CartPrice";
const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
};
const cartStyle = {
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
}
export const Cart = () => {

    return (
        <Row style={cartStyle}>
            <h1 className="fs-4 pt-2 pb-2 text-uppercase">Giỏ hàng của bạn</h1>
            <hr />
            <Col sm={12} md={8}>
                <table style={tableStyle}>
                    <tbody>
                        <CartItem />
                        <CartItem />
                        <CartItem />
                    </tbody>
                </table>
            </Col>
            <Col sm={12} md={4}>
                <CartPrice />
            </Col>
        </Row>
    )
}