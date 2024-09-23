import { Form } from "react-bootstrap";
import { paymentMethod } from "../../../../utils/constant";

const paymentMethodStyles = {
    boxShadow: "0 0 0 1px #d9d9d9",
    borderRadius: "4px",
    background: "#fff",
    color: "#737373"
};

const paymentMethodItemStyles = {
    borderTop: "1px solid #d9d9d9",
    borderBottom: "1px solid #d9d9d9"
};
export const PaymentMethod = ({ selectedMethod, onMethodChange }) => (
    <div style={paymentMethodStyles} className="mt-3">
        <Form.Check
            type="radio"
            id={paymentMethod.BANKING.key}
            label="Chuyển khoản ngân hàng"
            name="paymentMethod"
            className="p-3"
            checked={selectedMethod === paymentMethod.BANKING.key}
            onChange={onMethodChange}
        />
        {selectedMethod === paymentMethod.BANKING.key && (
            <PaymentMethodInfo>
                Khách hàng chọn thanh toán chuyển khoản sẽ nhận được hàng sớm nhất có thể. Khách hàng chuyển khoản vào tài khoản của Shop trong phần Thông Tin Tài Khoản. SPORTER hỗ trợ Freeship toàn quốc với đơn hàng từ 1.000.000vnd trở lên. Nhân viên của shop sẽ gọi điện cho quý khách để xác nhận đơn hàng chuyển khoản. Bạn vui lòng để ý điện thoại ngay khi đặt hàng thành công nhé.
            </PaymentMethodInfo>
        )}

        <Form.Check
            type="radio"
            id={paymentMethod.COD.key}
            label="Thanh Toán Tại Nhà (COD)"
            name="paymentMethod"
            className="p-3"
            checked={selectedMethod === paymentMethod.COD.key}
            onChange={onMethodChange}
        />
        {selectedMethod === paymentMethod.COD.key && (
            <PaymentMethodInfo>
                Hình thức THANH TOÁN TẠI NHÀ (COD) khách hàng sẽ đặt cọc trước 100.000vnd, tiền cọc được trừ vào giá sản phẩm. Khách nhận hàng được KIỂM TRA SẢN PHẨM, THỬ GIÀY và sau đó thanh toán cho shipper. Trong trường hợp khách không nhận hàng, tiền cọc được tính là chi phí vận chuyển 2 chiều và sẽ không hoàn lại. Nhân viên của shop sẽ gọi điện cho quý khách để xác nhận đơn hàng COD. Bạn vui lòng để ý điện thoại ngay khi đặt hàng thành công nhé.
            </PaymentMethodInfo>
        )}

        <Form.Check
            type="radio"
            id={paymentMethod.PAYPAL.key}
            label="Thanh toán với Paypal"
            name="paymentMethod"
            className="p-3 pb-3"
            checked={selectedMethod === paymentMethod.PAYPAL.key}
            onChange={onMethodChange}
        />
        {selectedMethod === paymentMethod.PAYPAL.key && (
            <PaymentMethodInfo>
                Bạn sẽ được chuyển hướng đến PayPal để hoàn tất thanh toán một cách an toàn. Sau khi giao dịch thành công, bạn sẽ được chuyển trở lại trang web của chúng tôi để xác nhận đơn hàng. Vui lòng đảm bảo tất cả thông tin thanh toán chính xác trước khi tiếp tục.
            </PaymentMethodInfo>
        )}
    </div>
);

const PaymentMethodInfo = ({ children }) => (
    <div className="bg-light p-3 text-center" style={paymentMethodItemStyles}>
        {children}
    </div>
);
