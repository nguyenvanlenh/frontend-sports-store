import { Button, Form, Image, Row } from "react-bootstrap"
import { formatCurrencyVN } from "../../../../utils/common"
import PaymentMethod from "../../../../data/img/footer_trustbadge.webp"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { confirmAlert } from "../../../../utils/sweetAlert"
const buttonCheckout = {
    backgroundColor: "#d81f19",
}
export const CartPrice = ({ totalPrice }) => {
    const isLogin = useSelector(state => state.auth)?.userId;
    const navigate = useNavigate();
    const handleContinueCheckout = () => {
        if (!isLogin) {
            confirmAlert(() => navigate("/login", { state: { from: "/cart" } }), "Bạn phải đăng nhập trước khi thanh toán")
            return;
        }
        navigate("/checkout")
    }
    return (
        <Row className="shadow-none p-4 m-1 bg-light rounded">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        id="r-bill"
                        label="Xuất hóa đơn công ty"
                        className="text-secondary text-uppercase"
                    />
                </Form.Group>
            </Form>
            <div className="d-flex justify-content-between">
                <p className="text-uppercase">Tổng cộng</p>
                <strong className="text-secondary"> {formatCurrencyVN(totalPrice)}</strong>
            </div>
            <i className="text-end text-secondary">(Đã bao gồm VAT nếu có)</i>
            <Button
                variant="danger"
                style={buttonCheckout}
                className="mt-2"
                onClick={handleContinueCheckout}>Thanh toán</Button>
            <Image src={PaymentMethod} fluid className="p-0" />
        </Row>
    )
}