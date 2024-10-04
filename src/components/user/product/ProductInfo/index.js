import React from "react"
import { ListSizes } from "../ListSizes"
import { Promotion } from "../Promotion"
import { QuantityAdjuster } from "../../../common/QuantityAdjuster"
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux"
import { addProductToCart } from "../../../../redux/cartSlice"
import { formatCurrencyVN } from "../../../../utils/common"
import { CustomButton } from "../../../common/Button"
import { setOneProductToOrder } from "../../../../redux/orderSlice";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "../../../../utils/sweetAlert";
import { MAX_PRODUCTS_PER_PURCHASE } from "../../../../utils/constant";


export const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLogin = useSelector(state => state.auth)?.userId;

    const [quantitySelected, setQuantitySelected] = React.useState(1);
    const [sizeSelected, setSizeSelected] = React.useState(product.listSize[0]);

    const handleAddCart = () => {
        dispatch(addProductToCart({
            id: uuidv4(),
            productId: product.id,
            size: sizeSelected,
            quantity: quantitySelected,
            product: product
        }));
    };

    const handleBuyNow = () => {


        dispatch(setOneProductToOrder([{
            id: uuidv4(),
            productId: product.id,
            size: sizeSelected,
            quantity: quantitySelected,
            product: product
        }]));
        if (!isLogin) {
            confirmAlert(() => navigate("/login", { state: { from: `/product/${product.id}` } }), "Bạn phải đăng nhập trước khi thanh toán")
            return;
        }
        navigate("/checkout");
    };
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
                max={Math.min(MAX_PRODUCTS_PER_PURCHASE, (sizeSelected?.quantity || 0))}
                onQuantityChange={(quantity) =>
                    setQuantitySelected(quantity)}
            />
            <div className="d-flex mt-3">
                <CustomButton
                    variant="dark"
                    className="me-3"
                    onClick={handleBuyNow}
                >Mua ngay</CustomButton>
                <CustomButton
                    variant="danger"
                    onClick={handleAddCart}
                >Thêm vào giỏ hàng
                </CustomButton>
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
                    {product.name || "ÁO BÓNG ĐÁ CHÍNH HÃNG"}
                </h1>
            </div>
            <div className="d-flex align-items-center">
                {
                    (product.salePrice !== product.regularPrice) &&
                    <strong>
                        <del className="text-secondary fs-6 me-3">{formatCurrencyVN(product.regularPrice)} </del>
                    </strong>
                }
                <strong className="text-danger fs-5">
                    {formatCurrencyVN(product.salePrice)}
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

