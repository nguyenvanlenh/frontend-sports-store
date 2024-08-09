import { Col, Row } from "react-bootstrap"
import { CartItem } from "../../../components/user/cart/CartItem"
import { CartPrice } from "../../../components/user/cart/CartPrice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart } from "../../../redux/cartSlice";
import { FaReply, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { confirmAlert } from "../../../utils/sweetAlert";
import { v4 as uuidv4 } from "uuid";
const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
};
const cartStyle = {
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
}
export const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart);
    const handleDelete = (item) => {

        confirmAlert(() =>
            dispatch(
                removeProductFromCart({ id: item.id })
            ),
            "Bạn có muốn xóa sản phẩm này không ?"
        )
    }

    const totalPrice = React.useMemo(() => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    }, [cartItems]);

    return (
        <Row style={cartStyle}>
            <h1 className="fs-4 pt-2 pb-2 text-uppercase">Giỏ hàng của bạn</h1>
            <hr />
            {
                cartItems.length
                    ?
                    <>
                        <Col sm={12} md={9}>
                            <table style={tableStyle}>
                                <tbody>
                                    {cartItems.map((item, index) => (
                                        <CartItem
                                            key={uuidv4()}
                                            item={item}
                                            onDelete={handleDelete} />
                                    ))}
                                </tbody>
                            </table>
                        </Col>
                        <Col sm={12} md={3}>
                            <CartPrice totalPrice={totalPrice} />
                        </Col>
                    </>
                    :
                    <div className="d-flex justify-content-center align-items-center flex-column p-5">
                        <FaShoppingCart size={50} color="gray" />
                        <p>Không có sản phẩm nào trong giỏ hàng!</p>
                        <Link to={"/list-products"} className="text-primary"><FaReply />Tiếp tục mua hàng</Link>
                    </div>
            }
        </Row>
    )
}