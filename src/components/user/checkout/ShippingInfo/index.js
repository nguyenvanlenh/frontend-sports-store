import axios from "axios";
import React from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PaymentMethod } from "../PaymentMethod";
import { COUNTRY, deliveryMethod, deliveryStatus, orderStatus, paymentMethod, paymentStatus, URL_LOCATION } from "../../../../utils/constant";
import { orderAddressRequest } from "../../../../models/orderAddressRequest";
import { orderRequest } from "../../../../models/orderRequest";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailRequest } from "../../../../models/orderDetailRequest";
import { orderService } from "../../../../services/orderService";
import { errorAlert, successAlert } from "../../../../utils/sweetAlert";
import { paymentService } from "../../../../services/paymentService";
import { paymentRequest } from "../../../../models/paymentRequest";
import { clearCart } from "../../../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { FaWindowMinimize } from "react-icons/fa";
const validationSchema = Yup.object({
    fullName: Yup.string().required("Họ và tên không được để trống"),
    email: Yup.string().email("Email không hợp lệ").required("Email không được để trống"),
    phoneNumber: Yup.string().required("Số điện thoại không được để trống")
        .matches(/^0[0-9]{9,10}$/, "Số điện thoại không hợp lệ. Phải bắt đầu bằng 0 và có 10 hoặc 11 chữ số"),
    address: Yup.string().required("Địa chỉ không được để trống"),
    province: Yup.string().required("Vui lòng chọn tỉnh/thành phố"),
    district: Yup.string().required("Vui lòng chọn quận/huyện"),
    commune: Yup.string().required("Vui lòng chọn phường/xã")
});

export const ShippingInfo = () => {
    const [selectedMethod, setSelectedMethod] = React.useState(() => paymentMethod.BANKING);
    const [data, setData] = React.useState({ province: [], district: [], commune: [] });
    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [communes, setCommunes] = React.useState([]);
    const cartItems = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const totalPrice = React.useMemo(() => {
        return cartItems.reduce((total, item) => {
            return total + item.quantity * item.product.price;
        }, 0);
    }, [cartItems]);

    React.useEffect(() => {
        axios.get(URL_LOCATION)
            .then(response => {
                setData(response.data);
                setProvinces(response.data.province);
            })
            .catch(error => console.error("Error fetching the JSON data:", error));
    }, []);

    const handlePaymentMethodChange = (e) => {
        setSelectedMethod(e.target.id);
    };

    const handleProvinceChange = (e, setFieldValue) => {
        const provinceName = e.target.value;

        const provinceId = data.province.filter(p => p.name === provinceName)
            .map(i => i.idProvince).toString();
        const filteredDistricts = data.district.filter(d => d.idProvince === provinceId);
        setDistricts(filteredDistricts);
        setCommunes([]);
        setFieldValue("district", "");
        setFieldValue("commune", "");
    };

    const handleDistrictChange = (e, setFieldValue) => {
        const districtName = e.target.value;
        const districtId = data.district.filter(d => d.name === districtName)
            .map(i => i.idDistrict).toString();
        const filteredCommunes = data.commune.filter(c => c.idDistrict === districtId);
        setCommunes(filteredCommunes);
        setFieldValue("commune", "");
    };
    const formik = useFormik({
        initialValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            address: "",
            province: "",
            district: "",
            commune: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const orderAddress = orderAddressRequest({
                addressLine: values.address,
                commune: values.commune,
                district: values.district,
                province: values.province,
                country: COUNTRY,
            });
            const orderDetails = cartItems?.map((item) => {
                return orderDetailRequest({
                    idProduct: item.productId,
                    quantity: item.quantity,
                    price: item.quantity * item.product.price,
                    size: item.size.id,
                    category: item.product.category.id,
                    brand: item.product.brand.id
                })
            })
            const order = orderRequest({
                address: orderAddress,
                nameCustomer: values.fullName,
                emailCustomer: values.email,
                phoneNumberCustomer: values.phoneNumber,
                totalPrice: totalPrice,
                orderStatus: orderStatus.PENDING,
                deliveryStatus: deliveryStatus.PREPARING.key,
                deliveryMethod: deliveryMethod.SPORTER_EXPRESS,
                listOrderDetails: orderDetails
            })
            try {
                const orderResult = await orderService.createOrder(order);

                const payment = paymentRequest({
                    orderId: orderResult.data.id,
                    amount: orderResult.data.totalPrice,
                    paymentFee: orderResult.data.deliveryFee,
                    paymentMethod: selectedMethod,
                    paymentStatus: paymentStatus.PENDING
                });

                if (selectedMethod !== paymentMethod.PAYPAL) {
                    await paymentService.createPayment(payment);
                    dispatch(clearCart())
                    successAlert("Thành công", "Tạo đơn hàng thành công", 2000,
                        () => navigation("/profile/order/history"));
                    return;
                }
                const paypalUrl = await paymentService.paypal.createPayment(payment);
                console.log(paypalUrl);

                window.location.href = paypalUrl.data.url;

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const errorMessage = error.response?.data?.message || error.message;
                    errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`);
                } else if (error.response?.status < 500) {
                    errorAlert("Lỗi", "Tạo đơn hàng thất bại");
                } else {
                    errorAlert("Xin lỗi", "Hệ thống hiện đang bảo trì. Vui lòng quay lại và đặt hàng sau.");
                }
                console.error(error.response?.data?.message || error.message);
            }

        }
    });

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="shipping-info">
                <h4>Thông tin giao hàng</h4>
                <InputGroupField
                    name="fullName"
                    placeholder="Họ và Tên"
                    values={formik.values.fullName}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    errors={formik.errors}
                    touched={formik.touched}
                />
                <Row>
                    <Col lg={8} xs={8}>
                        <InputGroupField
                            name="email"
                            placeholder="Email"
                            values={formik.values.email}
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                        />
                    </Col>
                    <Col lg={4} xs={4}>
                        <InputGroupField
                            name="phoneNumber"
                            placeholder="Số điện thoại"
                            values={formik.values.phoneNumber}
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                        />
                    </Col>
                </Row>
                <InputGroupField
                    name="address"
                    placeholder="Địa chỉ"
                    values={formik.values.address}
                    handleChange={formik.handleChange}
                    handleBlur={formik.handleBlur}
                    errors={formik.errors}
                    touched={formik.touched}
                />
                <Row>
                    <Col lg={4} xs={4}>
                        <SelectField
                            name="province"
                            options={provinces}
                            placeholder="Tỉnh/Thành phố"
                            values={formik.values.province}
                            handleChange={(e) => {
                                handleProvinceChange(e, formik.setFieldValue);
                                formik.handleChange(e);
                            }}
                            handleBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                            idKey="idProvince"
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.province}
                        </Form.Control.Feedback>
                    </Col>
                    <Col lg={4} xs={4}>
                        <SelectField
                            name="district"
                            options={districts}
                            placeholder="Quận / Huyện"
                            values={formik.values.district}
                            handleChange={(e) => {
                                handleDistrictChange(e, formik.setFieldValue);
                                formik.handleChange(e);
                            }}
                            handleBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                            idKey="idDistrict"
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.district}
                        </Form.Control.Feedback>
                    </Col>
                    <Col lg={4} xs={4}>
                        <SelectField
                            name="commune"
                            options={communes}
                            placeholder="Phường / Xã"
                            values={formik.values.commune}
                            handleChange={formik.handleChange}
                            handleBlur={formik.handleBlur}
                            errors={formik.errors}
                            touched={formik.touched}
                            idKey="idCommune"
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.commune}
                        </Form.Control.Feedback>
                    </Col>
                </Row>
            </div>
            <div className="method-payment">
                <h4>Phương thức thanh toán</h4>
                <PaymentMethod
                    selectedMethod={selectedMethod}
                    onMethodChange={handlePaymentMethodChange}
                />
            </div>
            <div className="d-flex justify-content-between mt-3">
                <Button onClick={() => navigation("/cart")} variant="light">Giỏ hàng</Button>
                <Button variant="secondary" type="submit">Hoàn tất đơn hàng</Button>
            </div>
        </Form>
    );
};

const InputGroupField = ({
    name,
    placeholder,
    values,
    handleChange,
    handleBlur,
    errors,
    touched }) => (
    <InputGroup className="mb-3">
        <Form.Control
            name={name}
            placeholder={placeholder}
            value={values[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched[name] && !!errors[name]}
        />
        <Form.Control.Feedback type="invalid">
            {errors[name]}
        </Form.Control.Feedback>
    </InputGroup>
);

const SelectField = ({
    name,
    options,
    placeholder,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    idKey,
}) => (
    <Form.Select
        className="mb-3"
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={touched[name] && !!errors[name]}
    >
        <option value="">{placeholder}</option>
        {options.map(option => (
            <option key={option[idKey]} value={option.name}>
                {option.name}
            </option>
        ))}
    </Form.Select>
);


