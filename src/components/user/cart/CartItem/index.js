import { Image } from "react-bootstrap";
import { formatCurrencyVN } from "../../../../utils/common";
import { QuantityAdjuster } from "../../../common/QuantityAdjuster";
import { RxCross2 } from "react-icons/rx";
import React from "react";
import { useDispatch } from "react-redux";
import { updateProductQuantityInCart } from "../../../../redux/cartSlice";
const imageStyle = {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
};
export const CartItem = ({ item, onDelete }) => {
    const dispatch = useDispatch();
    const [quantitySelected, setQuantitySelected] = React.useState(() => item.quantity);
    const price = item.product.salePrice;
    const handleQuantityChange = (quantity) => {
        setQuantitySelected(quantity);
        dispatch(updateProductQuantityInCart({
            id: item.id,
            quantity: quantity
        }));
    };
    const totalPrice = () => {
        return quantitySelected * price;
    }
    const handleDelete = () => {
        onDelete(item)
    };
    return (
        <tr className="d-flex align-items-center justify-content-between p-2">
            <td className="text-center col-1"
                style={{
                    cursor: 'pointer',
                }}
            ><RxCross2 onClick={handleDelete} /></td>
            <td className="col-2">
                <Image src={item.product.thumbnailImage || item.product.listImages[0]?.path} rounded style={imageStyle} />
            </td>
            <td className="col-3">
                <strong className="text-uppercase">{item.product.name}</strong>
                <p>Size: {item.size.name}</p>
            </td>
            <td className="text-secondary text-center col-2"><strong>{formatCurrencyVN(price)}</strong></td>
            <td className="col-2 d-flex justify-content-end"><QuantityAdjuster
                initialQuantity={quantitySelected}
                onQuantityChange={handleQuantityChange}
            /></td>
            <td className="text-secondary col-2 text-end"><strong>{formatCurrencyVN(totalPrice())}</strong></td>
        </tr>
    )
}