import { ListSizes } from "../ListSizes"
import { Promotion } from "../Promotion"
import { ButtonAction } from "../../../common/ButtonAction"
import { InputGroup } from "react-bootstrap"
import React from "react"


export const ProductInfo = () => {

    const [quantitySelected, setQuantitySelected] = React.useState(1)
    const [sizeSelected, setSizeSelected] = React.useState({})

    const memoizedListSizes = React.useMemo(() =>
        <ListSizes
            listSizes={[]}
            onSizeChange={(size) =>
                setSizeSelected(size)
            }
        />, [sizeSelected]);

    const memoizedQuantityAdjuster = React.useMemo(() =>
        <QuantityAdjuster
            onQuantityChange={(quantity) =>
                setQuantitySelected(quantity)}
        />
        , [quantitySelected])
    return (
        <>
            <Info />
            {memoizedListSizes}
            {memoizedQuantityAdjuster}
            <div className="d-flex mt-3">
                <ButtonAction
                    content="Mua ngay"
                    color="dark"
                    handleOperations={() => console.log("Mua")}
                />
                <ButtonAction
                    content="Thêm vào giỏ hàng"
                    color="danger"
                    handleOperations={() => console.log("Thêm vào giỏ")}
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

const QuantityAdjuster = ({ initialQuantity = 1, max = 20, onQuantityChange }) => {
    const [quantity, setQuantity] = React.useState(initialQuantity);
    const handleIncrease = () => {
        if (quantity < max) {
            setQuantity(prevQuantity => prevQuantity + 1);
            onQuantityChange(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
            onQuantityChange(quantity - 1);
        }
    };

    return (
        <div className="mt-3 mb-3">
            <InputGroup className="mb-3">
                <InputGroup.Text
                    aria-readonly
                    className="bg-white user-select-none"
                    onClick={handleDecrease}
                    style={{
                        cursor: 'pointer',
                    }}>
                    -
                </InputGroup.Text>
                <InputGroup.Text
                    aria-readonly
                    className="bg-white user-select-none">
                    {quantity}
                </InputGroup.Text>
                <InputGroup.Text
                    aria-readonly
                    className="bg-white user-select-none"
                    onClick={handleIncrease}
                    style={{
                        cursor: 'pointer',
                    }} >
                    +
                </InputGroup.Text>
            </InputGroup>
        </div>
    )
}
