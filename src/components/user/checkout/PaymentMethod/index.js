import { Form } from "react-bootstrap";

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
            id="bankTransfer"
            label="Chuyển khoản ngân hàng"
            name="paymentMethod"
            className="p-3"
            checked={selectedMethod === "bankTransfer"}
            onChange={onMethodChange}
        />
        {selectedMethod === "bankTransfer" && (
            <PaymentMethodInfo>
                Khách hàng chọn thanh toán chuyển khoản sẽ nhận được hàng sớm nhất có thể. Khách hàng chuyển khoản vào tài khoản của Shop trong phần Thông Tin Tài Khoản. SPORTER hỗ trợ Freeship toàn quốc với đơn hàng từ 1.000.000vnd trở lên. Nhân viên của shop sẽ gọi điện cho quý khách để xác nhận đơn hàng chuyển khoản. Bạn vui lòng để ý điện thoại ngay khi đặt hàng thành công nhé.
            </PaymentMethodInfo>
        )}

        <Form.Check
            type="radio"
            id="cod"
            label="Thanh Toán Tại Nhà (COD)"
            name="paymentMethod"
            className="p-3"
            checked={selectedMethod === "cod"}
            onChange={onMethodChange}
        />
        {selectedMethod === "cod" && (
            <PaymentMethodInfo>
                Hình thức THANH TOÁN TẠI NHÀ (COD) khách hàng sẽ đặt cọc trước 100.000vnd, tiền cọc được trừ vào giá sản phẩm. Khách nhận hàng được KIỂM TRA SẢN PHẨM, THỬ GIÀY và sau đó thanh toán cho shipper. Trong trường hợp khách không nhận hàng, tiền cọc được tính là chi phí vận chuyển 2 chiều và sẽ không hoàn lại. Nhân viên của shop sẽ gọi điện cho quý khách để xác nhận đơn hàng COD. Bạn vui lòng để ý điện thoại ngay khi đặt hàng thành công nhé.
            </PaymentMethodInfo>
        )}

        <Form.Check
            type="radio"
            id="paypal"
            label="Thanh toán với Paypal"
            name="paymentMethod"
            className="p-3 pb-3"
            checked={selectedMethod === "paypal"}
            onChange={onMethodChange}
        />
        {selectedMethod === "paypal" && (
            <PaymentMethodInfo>
                Thông tin thanh toán với Paypal
            </PaymentMethodInfo>
        )}
    </div>
);

const PaymentMethodInfo = ({ children }) => (
    <div className="bg-light p-3 text-center" style={paymentMethodItemStyles}>
        {children}
    </div>
);
