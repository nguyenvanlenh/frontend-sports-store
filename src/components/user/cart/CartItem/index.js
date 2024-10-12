import React from "react";
import { Form, Image } from "react-bootstrap";
import { formatCurrencyVN } from "../../../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "../../../../utils/sweetAlert";
import { QuantityAdjuster } from "../../../common/QuantityAdjuster";
import { MAX_PRODUCTS_PER_PURCHASE } from "../../../../utils/constant";
import { selectProductsSelected, useToggleProductInOrder } from "../../../../redux/orderSelector";
import { removeProductFromOrder, updateProductQuantityInOrder } from "../../../../redux/orderSlice";
import { removeCartItemThunk, updateProductQuantityCartItemThunk } from "../../../../redux/cartThunks";
const imageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
};
const lineClampStyle = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 5,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
};
export const CartItem = ({ cartItem }) => {
    const price = cartItem.product.salePrice;
    const dispatch = useDispatch();
    const productsSelected = useSelector(selectProductsSelected);

    const [quantitySelected, setQuantitySelected] = React.useState(() => cartItem.quantity);

    const totalPrice = () => {
        return quantitySelected * price;
    }

    const handleQuantityChange = React.useCallback((quantity) => {
        setQuantitySelected(quantity);

        dispatch(updateProductQuantityCartItemThunk({ cartItemId: cartItem.id, quantity }));
        dispatch(updateProductQuantityInOrder({ id: cartItem.id, quantity: quantity }));
    }, [dispatch, cartItem.id]);

    React.useEffect(() => {
        if (quantitySelected === 0) {
            confirmAlert(() => {
                dispatch(removeCartItemThunk(cartItem.id));
                dispatch(removeProductFromOrder(cartItem));
            },
                "Bạn có muốn xóa sản phẩm này không ?",
                handleQuantityChange(1)
            )
        }
    }, [dispatch, handleQuantityChange, quantitySelected, cartItem])

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
                <Image src={cartItem.product.thumbnailImage || cartItem.product.listImages[0]?.path} thumbnail className="border-0" style={imageStyle} />
            </td>
            <td className="col-3">
                <strong className="text-uppercase" style={lineClampStyle}>{cartItem.product.name}</strong>
                <p>Size: {cartItem.size.name}</p>
            </td>
            <td className="text-secondary ms-1 col-2"><strong>{formatCurrencyVN(price)}</strong></td>
            <td className="col-2 d-flex justify-content-end">
                <QuantityAdjuster
                    min={0}
                    initialQuantity={quantitySelected}
                    max={Math.min(MAX_PRODUCTS_PER_PURCHASE, (cartItem.size.quantity || 0))}
                    onQuantityChange={handleQuantityChange}
                />
            </td>
            <td className="text-secondary col-2 text-end"><strong>{formatCurrencyVN(totalPrice())}</strong></td>
        </tr>
    )
}