import React from "react";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ratingService } from "../../../services/ratingService";
import { ratingRequest } from "../../../models/ratingRequest";
import { deliveryStatus, deliveryStatusUpdate, httpStatus, orderStatus, paymentMethod, paymentStatus, paymentStatusUpdate, STATUS_TYPES } from "../../../utils/constant";
import { errorAlert, successAlert } from "../../../utils/sweetAlert";
import * as Yup from "yup";
import { ItemOrderDetail } from "../../user/checkout/ItemOrderDetail";
import { formatCurrencyVN } from "../../../utils/common";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { CustomButton } from "../Button";
const confirmSchema = Yup.object().shape({
    cause: Yup.string()
        .required("Vui lòng nhập lý do"),
});

export const ConfirmModal = ({ show, confirm, onClose, handleOperations, input }) => {
    const handleSubmit = (values) => {
        handleOperations(values.cause); // Gửi lý do hủy đơn
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{confirm}</p>
                {input && (
                    <Formik
                        initialValues={{ cause: "" }}
                        validationSchema={confirmSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit }) => (
                            <FormikForm onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="cause">
                                    <Field
                                        as="textarea"
                                        name="cause"
                                        rows={3}
                                        placeholder="Tại sao bạn muốn hủy đơn?"
                                        className="form-control"
                                    />
                                    <ErrorMessage name="cause" component="div" className="text-danger" />
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={onClose}>
                                        Không
                                    </Button>
                                    <Button variant="danger" type="submit">
                                        Có
                                    </Button>
                                </Modal.Footer>
                            </FormikForm>
                        )}
                    </Formik>
                )}
                {!input && (
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onClose}>
                            Không
                        </Button>
                        <Button variant="danger" onClick={handleOperations}>
                            Có
                        </Button>
                    </Modal.Footer>
                )}
            </Modal.Body>
        </Modal>
    );
};

const RatingStars = ({ rating, onRate }) => {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="d-flex justify-content-center mb-3">
            {stars.map((value) => (
                <span
                    key={value}
                    onClick={() => onRate(value)}
                    style={{ cursor: "pointer" }}
                >
                    {value <= rating ? (
                        <FaStar size={24} color="#f1c40f" />
                    ) : (
                        <FaRegStar size={24} color="#ccc" />
                    )}
                </span>
            ))}
        </div>
    );
};
const ratingSchema = Yup.object().shape({
    content: Yup.string()
        .max(200, "Nội dung không được vượt quá 200 ký tự")
        .required("Vui lòng nhập nội dung nhận xét"),
    star: Yup.number()
        .min(1, "Vui lòng chọn số sao")
        .required("Vui lòng chọn số sao")
});

export const ProductRatingModal = ({
    show,
    handleClose,
    productId,
    userId,
    orderDetailId,
    refetch }) => {

    const handleSubmit = async (values, { resetForm }) => {
        const request = ratingRequest({
            content: values.content,
            star: values.star,
            productId: productId,
            userId: userId,
            orderDetailId: orderDetailId
        });

        const response = await ratingService.addRating(request);
        if (response?.status === httpStatus.CREATED) {
            handleClose();
            refetch();
            successAlert("Thành công", "Đánh giá thành công, cảm ơn sự góp ý chân thành của bạn");
            resetForm();
            return;
        }
        errorAlert("Oops...", "Đánh giá không thành công, đã có lỗi xảy ra!");
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đánh giá Sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Formik
                        initialValues={{ content: "", star: 0 }}
                        validationSchema={ratingSchema}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col className="text-center">
                                        <RatingStars
                                            rating={values.star}
                                            onRate={(value) => setFieldValue('star', value)}
                                        />
                                        {errors.star && touched.star ? (
                                            <div className="text-danger">{errors.star}</div>
                                        ) : null}
                                    </Col>
                                </Row>
                                <Form.Group controlId="formReview">
                                    <Form.Label>Nhận xét</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="content"
                                        value={values.content}
                                        onChange={handleChange}
                                        placeholder="Nhập nhận xét của bạn ở đây"
                                        isInvalid={!!errors.content && touched.content}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.content}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">
                                    Gửi Đánh Giá
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Container>
            </Modal.Body>
        </Modal>
    );
};

export const OrderDetailModal = ({ show, onClose, data }) => {
    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết đơn hàng (#{data?.id})</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    data?.listOrderDetails.map((orderDetail, idx) =>
                        <ItemOrderDetail key={idx} detail={orderDetail} />
                    )
                }
                <Table bordered className="text-end">
                    <tbody>
                        <tr>
                            <td>Tổng tiền hàng</td>
                            <td>{formatCurrencyVN(data.totalPrice)}</td>
                        </tr>
                        <tr>
                            <td>Phí vận chuyển</td>
                            <td>{formatCurrencyVN(data.deliveryFee)}</td>
                        </tr>
                        <tr>
                            <td>Thành tiền</td>
                            <td className="fs-4 text-danger">{formatCurrencyVN(data.totalPrice)}</td>
                        </tr>
                        <tr>
                            <td>Phương thức thanh toán</td>
                            <td>{paymentMethod[data.payment.paymentMethod]?.displayName}</td>
                        </tr>
                        <tr>
                            <td>Trạng thái thanh toán</td>
                            <td className="text-warning">{paymentStatus[data.payment.paymentStatus]?.displayName}</td>
                        </tr>
                        <tr>
                            <td>Trạng thái đơn hàng</td>
                            <td className="text-secondary">{data.orderStatus}</td>
                        </tr>
                        <tr>
                            <td>Trạng thái vận chuyển</td>
                            <td className="text-secondary">
                                {deliveryStatus[data.deliveryStatus].displayName}
                            </td>
                        </tr>
                        <tr>
                            <td>Đơn vị vận chuyển</td>
                            <td className="text-secondary">{data.deliveryMethod}</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}
export const OrderEditModal = ({
    show,
    onClose,
    title,
    typeEdit,
    currentValue,
    handleOperations,
}) => {

    const [selectedValue, setSelectedValue] = React.useState(currentValue);
    const [data, setData] = React.useState({});

    React.useEffect(() => {
        switch (typeEdit) {
            case STATUS_TYPES.ORDER:
                setData(orderStatus);
                break;
            case STATUS_TYPES.PAYMENT:
                setData(paymentStatusUpdate);
                break;
            case STATUS_TYPES.DELIVERY:
                setData(deliveryStatusUpdate);
                break;
            default:
                setData({});
                break;
        }
    }, [typeEdit]);

    React.useEffect(() => {
        setSelectedValue(currentValue);
    }, [currentValue]);

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    }

    const handleSubmit = () => {
        handleOperations(selectedValue);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Select
                    value={selectedValue}
                    onChange={handleChange}>
                    {
                        data && Object.values(data).map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))
                    }
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <CustomButton className="w-100" onClick={handleSubmit}>Cập nhật</CustomButton>
            </Modal.Footer>
        </Modal>
    )
}
export const ProductAttributesModal = ({
    show,
    onClose,
    title,
    type,
    action,
    currentProductAttribute,
    handleOperations }) => {
    const [productAttribute, setProductActive] = React.useState({
        id: "",
        name: "",
        description: "",
        isActive: false,
    });

    React.useEffect(() => {
        if (currentProductAttribute) {
            setProductActive({
                id: currentProductAttribute?.id || "",
                name: currentProductAttribute?.name || "",
                description: currentProductAttribute?.description || "",
                isActive: currentProductAttribute?.isActive || false,
            });
        }
    }, [currentProductAttribute]);

    const handleChangeNameAttribute = (e) => {
        setProductActive(prev => ({ ...prev, name: e.target.value }))
    }
    const handleChangeDescriptionAttribute = (e) => {
        setProductActive(prev => ({ ...prev, description: e.target.value }))
    }
    const handleChangeActiveAttribute = (e) => {
        setProductActive(prev => ({ ...prev, isActive: e.target.checked }))
    }
    const handleEditAttribute = () => {
        handleOperations(productAttribute)
        setProductActive({
            id: "",
            name: "",
            description: "",
            isActive: false,
        })
    }
    return (
        <Modal
            show={show}
            onHide={onClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                        readOnly={action === "view"}
                        type="text"
                        name="name"
                        value={productAttribute.name}
                        onChange={handleChangeNameAttribute}
                        placeholder="Nhập tên"
                    />
                    <Form.Label>Mô tả</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        readOnly={action === "view"}
                        name="description"
                        value={productAttribute.description}
                        onChange={handleChangeDescriptionAttribute}
                        placeholder="Nhập mô tả"
                    />
                    <Form.Check
                        type="switch"
                        disabled={action === "view"}
                        checked={productAttribute.isActive}
                        onChange={handleChangeActiveAttribute}
                        id="active-switch"
                        label={productAttribute.isActive ? "Hoạt động" : "Khóa"}
                    />
                </Form.Group>
            </Modal.Body>
            {action !== "view" &&
                <Modal.Footer>
                    <CustomButton
                        className="w-100"
                        variant="secondary"
                        onClick={handleEditAttribute}>{action === "create" ? "Thêm" : "Cập nhật"}</CustomButton>
                </Modal.Footer>
            }
        </Modal >
    )
}