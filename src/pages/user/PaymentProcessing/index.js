import React from "react"
import { Loading } from "../../../components/common/Loading"
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../../utils/sweetAlert";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/cartSlice";

export const PaymentProcessing = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    React.useEffect(() => {
        const statusRegex = /status=([^&]+)/;
        const isMatch = window.location.href.match(statusRegex) || "error";
        const status = isMatch ? isMatch[1] : "error";
        switch (status) {
            case "success":
                dispatch(clearCart());
                successAlert("Thành công", "Tạo đơn hàng thành công", 2000,
                    () => navigate("/profile/order/history"));
                break;
            default:
                errorAlert("Lỗi", "Tạo đơn hàng thất bại", 3500);
                navigate("/checkout")
                break;
        }
    }, [dispatch, navigate])
    return (
        <Loading />
    )
}
