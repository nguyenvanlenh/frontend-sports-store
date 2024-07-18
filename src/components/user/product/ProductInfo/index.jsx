import { ListSizes } from "../ListSizes"
import { Promotion } from "../Promotion"
import { ButtonAction } from "../../../common/ButtonAction"
import { InputGroup } from "react-bootstrap"
import React from "react"
import { QuantityAdjuster } from "../../../common/QuantityAdjuster"
import { localStorages } from "../../../../utils/localStorage"
import { CART_LS } from "../../../../utils/constant"


export const ProductInfo = () => {

    const [quantitySelected, setQuantitySelected] = React.useState(1)
    const [sizeSelected, setSizeSelected] = React.useState({})
    const handleAddCart = () => {
        localStorages.setDataByKey(CART_LS, ["product"])
    }
    return (
        <>
            <Info />
            <ListSizes
                listSizes={[]}
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
const Info = () => {
    return (
        <>
            <div>
                <h1 className="text-uppercase fs-3">
                    ÁO BÓNG ĐÁ CHÍNH HÃNG LIVERPOOL SÂN NHÀ 2024/25
                </h1>
            </div>
            <div className="d-flex align-items-center">
                <strong>
                    <del className="text-secondary">2,589,000₫</del>
                </strong>
                <strong className="text-danger ms-3 fs-5">
                    1,990,000₫
                </strong>
            </div>
            <div className="product-vairant">
                <p>
                    Nhà cung cấp: <span className="text-uppercase">NIKE</span>
                </p>
                <p className="text-uppercase">SKU: FN8798-688-S</p>
            </div>
        </>
    )
}

