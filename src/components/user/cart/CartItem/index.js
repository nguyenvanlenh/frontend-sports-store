import { Form, Image } from "react-bootstrap";
import { formatCurrencyVN } from "../../../../utils/common";
import { QuantityAdjuster } from "../../../common/QuantityAdjuster";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProductFromCart, updateProductQuantityInCart } from "../../../../redux/cartSlice";
import { removeProductFromOrder, toggleProductInOrder, updateProductQuantityInOrder } from "../../../../redux/orderSlice";
import { confirmAlert } from "../../../../utils/sweetAlert";
import { selectProductsSelected, useToggleProductInOrder } from "../../../../redux/orderSelector";
const imageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
};
export const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    const productsSelected = useSelector(selectProductsSelected);
    const [quantitySelected, setQuantitySelected] = React.useState(() => cartItem.quantity);

    const price = cartItem.product.salePrice;

    const handleQuantityChange = React.useCallback((quantity) => {
        setQuantitySelected(quantity);
        dispatch(updateProductQuantityInCart({ id: cartItem.id, quantity: quantity }));
        dispatch(updateProductQuantityInOrder({ id: cartItem.id, quantity: quantity }));

    }, [dispatch, cartItem.id]);
    React.useEffect(() => {
        if (quantitySelected === 0) {
            confirmAlert(() => {
                dispatch(removeProductFromCart({ id: cartItem.id }));
                dispatch(removeProductFromOrder(cartItem));
            }
                ,
                "Bạn có muốn xóa sản phẩm này không ?",
                handleQuantityChange(1)
            )
        }

    }, [dispatch, handleQuantityChange, quantitySelected, cartItem])
    const totalPrice = () => {
        return quantitySelected * price;
    }
    const toggleProduct = useToggleProductInOrder(cartItem);
    const handleChangeCheckbox = () => {
        toggleProduct();
    }

    const isChecked = productsSelected?.some((item) =>
        (item?.product.id === cartItem?.product.id) &&
        (item?.size.id === cartItem?.size.id));
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
                <Image src={cartItem.product.thumbnailImage || cartItem.product.listImages[0]?.path} rounded style={imageStyle} />
            </td>
            <td className="col-3">
                <strong className="text-uppercase">{cartItem.product.name}</strong>
                <p>Size: {cartItem.size.name}</p>
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