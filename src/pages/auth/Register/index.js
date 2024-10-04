import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import React from "react";
import { authService } from "../../../services/authService";
import { successAlert } from "../../../utils/sweetAlert";
const btnRegisterStyle = {
    backgroundColor: "#d81f19"
};

export const Register = () => {
    const navigation = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Vui lòng nhập tên đăng nhập")
            .min(8, "Tên đăng nhập phải từ 8 đến 20 ký tự")
            .max(20, "Tên đăng nhập phải từ 8 đến 20 ký tự")
            .matches(/^[^\s]+$/, "Tên đăng nhập không được chứa khoảng trắng")
            .matches(/^[a-zA-Z0-9]+$/, "Tên đăng nhập không được chứa ký tự đặc biệt"),
        email: Yup.string()
            .required("Vui lòng nhập email")
            .email("Email không hợp lệ")
            .matches(/^[^\s]+$/, "Email nhập không được chứa khoảng trắng")
            .matches(/^[a-zA-Z0-9@.]+$/, "Email nhập không được chứa ký tự đặc biệt"),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .min(8, "Mật khẩu phải từ 8 đến 50 ký tự")
            .max(50, "Mật khẩu phải từ 8 đến 50 ký tự")
            .matches(/^[^\s]+$/, "Mật khẩu không được chứa khoảng trắng"),
        rePassword: Yup.string()
            .required("Vui lòng nhập lại mật khẩu")
            .oneOf([Yup.ref('password'), null], "Mật khẩu nhập không khớp")
    });

    const handleRegistration = async (values, setErrors) => {
        setLoading(true);
        setError("");

        try {
            await authService.register({
                username: values.username,
                email: values.email,
                password: values.password,
                listRoles: [],
            });

            successAlert(
                "Đăng ký thành công",
                "Vui lòng kiểm tra email để xác thực tài khoản",
                4500,
                () => navigation("/login")
            );
        } catch (error) {
            const responseError = error.response.data;

            if (responseError.status === 409) {
                const errorMessage = responseError.message;
                if (errorMessage.includes("username")) {
                    setErrors({ username: "Tên đăng nhập này đã được đăng ký" });
                } else if (errorMessage.includes("email")) {
                    setErrors({ email: "Email này đã được đăng ký" });
                } else {
                    setError("Đã xảy ra lỗi khi đăng ký");
                }
            } else {
                setError("Đã xảy ra lỗi khi đăng ký");
            }
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            rePassword: "",
        },
        validationSchema,
        onSubmit: (values) => handleRegistration(values, formik.setErrors),
    });

    return (
        <Container className="mt-5">
            <Row className="">
                <div className="d-flex justify-content-center">
                    <Col lg={5} md={6} sm={12} className="p-5 bg-light rounded">
                        <div className="text-center mb-5">
                            <h1>Đăng ký</h1>
                        </div>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="username" className="mb-4">
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Tên đăng nhập"
                                    required
                                    className="form-control-md"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    isInvalid={formik.touched.username && formik.errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.username}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="email" className="mb-4">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="form-control-md"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="password" className="mb-4 position-relative">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Mật khẩu"
                                    required
                                    className="form-control-md"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                    }}
                                >
                                    {!formik.errors.password && (showPassword ? <FaRegEyeSlash /> : <FaRegEye />)}

                                </div>
                            </Form.Group>
                            <Form.Group controlId="repassword" className="mb-4">
                                <Form.Control
                                    type="password"
                                    name="rePassword"
                                    placeholder="Xác nhận mật khẩu"
                                    required
                                    className="form-control-md"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.rePassword}
                                    isInvalid={formik.touched.rePassword && formik.errors.rePassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.rePassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button
                                type="submit"
                                className="w-100 mb-3"
                                variant="danger"
                                size="md"
                                style={btnRegisterStyle}
                            >
                                {loading
                                    ? "Đang đăng ký..."
                                    : "Đăng ký"}
                            </Button>
                            {error
                                && <div className="text-danger text-center mt-2 mb-1">{error}</div>}
                            <div className="text-center">
                                <Link to={"/login"} className="text-muted">
                                    Đã có tài khoản? Đăng nhập tại đây
                                </Link>
                            </div>
                        </Form>
                        <div className="text-center mt-4">
                            <span>hoặc đăng ký qua</span>
                            <div className="d-flex justify-content-center mt-3">
                                <Link
                                    className="w-100 me-2"
                                    style={{
                                        height: "40px"
                                    }}
                                >
                                    <Image
                                        src={"https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg"}
                                        style={{ height: "100%", width: "100%", objectFit: "contain" }} />
                                </Link>
                                <Link
                                    className="w-100"
                                    style={{
                                        height: "40px"
                                    }}
                                >
                                    <Image
                                        src={"https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg"}
                                        style={{ height: "100%", width: "100%", objectFit: "contain" }} />
                                </Link>
                            </div>
                        </div>
                    </Col>
                </div>
            </Row>
        </Container>
    );
};
