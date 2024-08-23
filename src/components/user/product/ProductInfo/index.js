import React from "react"
import { ListSizes } from "../ListSizes"
import { Promotion } from "../Promotion"
import { ButtonAction } from "../../../common/ButtonAction"
import { QuantityAdjuster } from "../../../common/QuantityAdjuster"
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux"
import { addProductToCart } from "../../../../redux/cartSlice"
import { formatCurrencyVN } from "../../../../utils/common"


export const ProductInfo = ({ product }) => {

    const dispatch = useDispatch();

    const [quantitySelected, setQuantitySelected] = React.useState(1)
    const [sizeSelected, setSizeSelected] = React.useState(() => product.listSize[0])
    const handleAddCart = () => {
        console.log(sizeSelected);
        dispatch(addProductToCart({
            id: uuidv4(),
            productId: product.id,
            size: sizeSelected,
            quantity: quantitySelected,
            product: product
        }))
    }
    return (
        <>
            <Info product={product} />
            <ListSizes
                listSizes={product.listSize}
                onSizeChange={(size) =>
                    setSizeSelected(size)
                }
            />
            <QuantityAdjuster
                onQuantityChange={(quantity) =>
                    setQuantitySelected(quantity)}
            />
            <div className="d-flex mt-3">
                <ButtonAction
                    content="Mua ngay"
                    color="dark"
                    handleOperations={() => console.log("Mua")}
                />
                <ButtonAction
                    content="Thêm vào giỏ hàng"
                    color="danger"
                    handleOperations={handleAddCart}
                />
            </div>
            <Promotion />

        </>
    )
}
const Info = ({ product }) => {
    return (
        <>
            <div>
                <h1 className="text-uppercase fs-3">
                    {product.name || "ÁO BÓNG ĐÁ CHÍNH HÃNG LIVERPOOL SÂN NHÀ 2024/25"}
                </h1>
            </div>
            <div className="d-flex align-items-center">
                <strong>
                    <del className="text-secondary">{formatCurrencyVN(product.price)}</del>
                </strong>
                <strong className="text-danger ms-3 fs-5">
                    {formatCurrencyVN(product.price)}
                </strong>
            </div>
            <div className="product-vairant">
                <p>
                    Nhà cung cấp: <span className="text-uppercase">{product.brand.name}</span>
                </p>
                <p className="text-uppercase">SKU: FN8798-688-S</p>
            </div>
        </>
    )
}

