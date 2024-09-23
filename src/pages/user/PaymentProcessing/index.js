import React from "react"
import { Loading } from "../../../components/common/Loading"
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../../utils/sweetAlert";
import { useDispatch, useSelector } from "react-redux";
import { orderService } from "../../../services/orderService";
import { useClearOrder } from "../../../hooks/useClearOrder";

export const PaymentProcessing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderIdSaved = useSelector(state => state.order.orderIdSaved);
    const productsIdSelected = useSelector(state => state.order.productsIdSelected);
    const clearOrder = useClearOrder(productsIdSelected);
    React.useEffect(() => {
        const handlePaymentStatus = async () => {
            const status = new URLSearchParams(window.location.search).get("status") || "error";
            if (status === "success") {
                clearOrder();
                successAlert("Thành công", "Tạo đơn hàng thành công", 2000, () => {
                    navigate("/profile/order/history");
                });
            } else {
                try {
                    await orderService.deleteOrder(orderIdSaved);
                } catch (error) {
                    console.error("An error occurred while deleting order: ", error);
                }
                errorAlert("Lỗi", "Tạo đơn hàng thất bại", 3500);
                navigate("/checkout");
            }
        };
        handlePaymentStatus();
    }, [dispatch, navigate, orderIdSaved, productsIdSelected])
    return (
        <Loading />
    )
}
