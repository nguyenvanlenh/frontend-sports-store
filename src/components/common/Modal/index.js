import React from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ratingService } from "../../../services/ratingService";
import { ratingRequest } from "../../../models/ratingRequest";
import { httpStatus } from "../../../utils/constant";
import { errorAlert, successAlert } from "../../../utils/sweetAlert";
import * as Yup from "yup";
import { Formik } from "formik";
export const ConfirmModal = ({ show, confirm, onClose, handleOperations }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{confirm}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Không
                </Button>
                <Button variant="danger" onClick={handleOperations}>
                    Có
                </Button>
            </Modal.Footer>
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

export const ProductReviewModal = ({
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