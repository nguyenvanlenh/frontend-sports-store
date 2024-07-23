import { Image } from "react-bootstrap";
import ImageLiver from "../../../../data/img/liver.webp";
import { formatCurrencyVN } from "../../../../utils/common";
import { QuantityAdjuster } from "../../../common/QuantityAdjuster";
import { RxCross2 } from "react-icons/rx";
import React from "react";
const imageStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
};
export const CartItem = ({ product, size, }) => {
    const [quantitySelected, setQuantitySelected] = React.useState(1);
    const [price] = React.useState(250000);

    const totalPrice = React.useMemo(() => {
        return quantitySelected * price;
    }, [quantitySelected]);


    return (
        <>
            <tr className="d-flex align-items-center justify-content-between p-2">
                <td className="text-center"><RxCross2 onClick={() => alert('Delete')} /></td>
                <td>
                    <Image src={ImageLiver} rounded style={imageStyle} />
                </td>
                <td>M</td>
                <td className="text-secondary"><strong>{formatCurrencyVN(totalPrice)}</strong></td>
                <td><QuantityAdjuster
                    onQuantityChange={(quantity) =>
                        setQuantitySelected(quantity)}
                /></td>
            </tr>
        </>
    )
}