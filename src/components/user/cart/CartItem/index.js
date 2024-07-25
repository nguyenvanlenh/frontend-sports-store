import { Image } from "react-bootstrap";
import ImageLiver from "../../../../data/img/liver.webp";
import { formatCurrencyVN } from "../../../../utils/common";
import { QuantityAdjuster } from "../../../common/QuantityAdjuster";
import { RxCross2 } from "react-icons/rx";
import React from "react";
import { useDispatch } from "react-redux";
import { updateProductQuantityInCart } from "../../../../redux/cartSlice";
const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
};
export const CartItem = ({ item, onDelete }) => {
    const dispatch = useDispatch();
    const [quantitySelected, setQuantitySelected] = React.useState(() => item.quantity);
    const price = item.product.price;
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
            <td className="text-center"
                style={{
                    cursor: 'pointer',
                }}
            ><RxCross2 onClick={handleDelete} /></td>
            <td>
                <Image src={item.product.listImages[0]?.path} rounded style={imageStyle} />
            </td>
            <td>
                <strong className="text-uppercase">{item.product.name}</strong>
                <p>Size: {item.size}</p>
            </td>
            <td className="text-secondary"><strong>{formatCurrencyVN(price)}</strong></td>
            <td><QuantityAdjuster
                initialQuantity={quantitySelected}
                onQuantityChange={handleQuantityChange}
            /></td>
            <td className="text-secondary"><strong>{formatCurrencyVN(totalPrice())}</strong></td>
        </tr>
    )
}