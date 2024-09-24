import { Col, Row } from "react-bootstrap"
import { CartItem } from "../../../components/user/cart/CartItem"
import { CartPrice } from "../../../components/user/cart/CartPrice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaReply, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { confirmAlert } from "../../../utils/sweetAlert";
import { v4 as uuidv4 } from "uuid";
import { CustomButton } from "../../../components/common/Button";
import { useClearOrder } from "../../../hooks/useClearOrder";
import { selectProductsSelected } from "../../../redux/orderSelector";
import { clearProductsSelected } from "../../../redux/orderSlice";
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
    const productsSelected = useSelector(selectProductsSelected);
    const clearOrder = useClearOrder(productsSelected);
    React.useEffect(() => { dispatch(clearProductsSelected()) }, [dispatch]);

    const totalPrice = React.useMemo(() => {
        return productsSelected.reduce((total, item) => {
            return total + item.quantity * item.product.salePrice;
        }, 0);
    }, [productsSelected]);

    const handleDelete = () => {
        if (!!productsSelected.length)
            confirmAlert(() => clearOrder(),
                "Bạn có muốn xóa sản phẩm đã chọn không ?"
            )

    }
    return (
        <Row style={cartStyle}>
            <div className="d-flex align-items-center justify-content-between">
                <h1 className="fs-4 pt-2 pb-2 text-uppercase">Giỏ hàng của bạn</h1>
                <CustomButton
                    onClick={handleDelete}
                    variant="danger"
                    className="px-4"
                    style={{
                        backgroundColor: "#d81f19"
                    }}>Xóa</CustomButton>
            </div>
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
                                            cartItem={item}
                                        />
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