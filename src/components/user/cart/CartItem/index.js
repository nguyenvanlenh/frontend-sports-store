import { Form, Image } from "react-bootstrap";
import { formatCurrencyVN } from "../../../../utils/common";
import { QuantityAdjuster } from "../../../common/QuantityAdjuster";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart, updateProductQuantityInCart } from "../../../../redux/cartSlice";
import { toggleProductInOrder } from "../../../../redux/orderSlice";
import { confirmAlert } from "../../../../utils/sweetAlert";
const imageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
};
export const CartItem = ({ item }) => {
    const productsIdSelected = useSelector(state => state.order.productsIdSelected);
    const dispatch = useDispatch();
    const [quantitySelected, setQuantitySelected] = React.useState(() => item.quantity);
    const price = item.product.salePrice;
    const handleQuantityChange = React.useCallback((quantity) => {
        setQuantitySelected(quantity);
        dispatch(updateProductQuantityInCart({ id: item.id, quantity: quantity }));
    }, [dispatch, item.id]);
    React.useEffect(() => {
        if (quantitySelected === 0) {
            confirmAlert(() =>
                dispatch(removeProductFromCart({ id: item.id })),
                "Bạn có muốn xóa sản phẩm này không ?",
                handleQuantityChange(1)
            )
        }

    }, [dispatch, handleQuantityChange, item.id, quantitySelected])
    const totalPrice = () => {
        return quantitySelected * price;
    }
    const handleChangeCheckbox = () => {
        dispatch(toggleProductInOrder(item.id))
    }

    const isChecked = productsIdSelected?.some(id => id === item.id);
    return (
        <tr className="d-flex align-items-center justify-content-between p-2">
            <td className="col-1">
                <Form>
                    <Form.Check
                        onChange={handleChangeCheckbox}
                        checked={isChecked}
                        type="checkbox"
                        id="cart-checkox"
                    />
                </Form>
            </td>
            <td className="col-2">
                <Image src={item.product.thumbnailImage || item.product.listImages[0]?.path} rounded style={imageStyle} />
            </td>
            <td className="col-3">
                <strong className="text-uppercase">{item.product.name}</strong>
                <p>Size: {item.size.name}</p>
            </td>
            <td className="text-secondary text-center col-2"><strong>{formatCurrencyVN(price)}</strong></td>
            <td className="col-2 d-flex justify-content-end">
                <QuantityAdjuster
                    min={0}
                    initialQuantity={quantitySelected}
                    onQuantityChange={handleQuantityChange}
                /></td>
            <td className="text-secondary col-2 text-end"><strong>{formatCurrencyVN(totalPrice())}</strong></td>
        </tr>
    )
}