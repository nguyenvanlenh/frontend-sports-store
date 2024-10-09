import React from "react"
import { Loading } from "../../../components/common/Loading"
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../../utils/sweetAlert";
import { useDispatch, useSelector } from "react-redux";
import { orderService } from "../../../services/orderService";
import { useClearOrder } from "../../../hooks/useClearOrder";
import { selectProductsSelected } from "../../../redux/orderSelector";
import { clearOrderIdSaved } from "../../../redux/orderSlice";

export const PaymentProcessing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderIdSaved = useSelector(state => state.order.orderIdSaved);
    const productsSelected = useSelector(selectProductsSelected);
    const clearOrder = useClearOrder(productsSelected);

    React.useEffect(() => {
        const handlePaymentStatus = async () => {
            const status = new URLSearchParams(window.location.search).get("status") || "error";
            const orderId = new URLSearchParams(window.location.search).get("orderId") || 0

            if (status === "success") {
                successAlert("Thành công", "Tạo đơn hàng thành công", 2000, () => {
                    navigate("/profile/order-history");
                });
                clearOrder();
            } else {
                try {
                    if (orderIdSaved === Number(orderId)) {
                        await orderService.deleteOrder(orderIdSaved);
                        dispatch(clearOrderIdSaved())
                    }
                } catch (error) {
                    console.error("An error occurred while deleting order: ", error);
                }
                errorAlert("Lỗi", "Tạo đơn hàng thất bại", 3500);
                navigate("/checkout");
            }
        };
        handlePaymentStatus();
    }, [dispatch, navigate, orderIdSaved]) // eslint-disable-line
    return (
        <Loading />
    )
}
