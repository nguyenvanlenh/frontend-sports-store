import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { authService } from "../../../services/authService";
import { localStorages } from "../../../utils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LS } from "../../../utils/constant";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { OAuthGGConfig } from "../../../configurations/configuration";

const btnLoginStyle = {
    backgroundColor: "#d81f19"
};

export const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const navigation = useNavigate();
    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Vui lòng nhập tên đăng nhập")
            .min(8, "Tên đăng nhập phải từ 8 đến 20 ký tự")
            .max(20, "Tên đăng nhập phải từ 8 đến 20 ký tự"),
        password: Yup.string()
            .required("Vui lòng nhập mật khẩu")
            .min(8, "Mật khẩu phải từ 8 đến 50 ký tự")
            .max(50, "Mật khẩu phải từ 8 đến 50 ký tự"),
    });

    const handleContinueWithGoogle = () => {
        const callbackUrl = OAuthGGConfig.redirectUri;
        const authUrl = OAuthGGConfig.authUri;
        const googleClientId = OAuthGGConfig.clientId;

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

        console.log(targetUrl);

        window.location.href = targetUrl;

    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            setError("");
            try {
                const response = await authService.login(values);
                localStorages.setDataByKey(ACCESS_TOKEN, response.data.accessToken);
                localStorages.setDataByKey(REFRESH_TOKEN, response.data.refreshToken);
                localStorages.setDataByKey(USER_LS, response.data);
                navigation("/home");
            } catch (error) {
                setError("Đăng nhập không thành công. Vui lòng kiểm tra thông tin đăng nhập và thử lại.");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Container className="mt-5">
            <Row className="">
                <div className="d-flex justify-content-center">
                    <Col lg={5} md={6} sm={12} className="p-5 bg-light rounded">
                        <div className="text-center mb-5">
                            <h1>Đăng nhập</h1>
                        </div>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group controlId="customer_username" className="mb-4">
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
                            <Form.Group controlId="customer_password" className="mb-4 position-relative">
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
                            <Button
                                type="submit"
                                className="w-100 mb-3"
                                variant="danger"
                                size="md"
                                style={btnLoginStyle}
                                disabled={loading}
                            >
                                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                            </Button>
                            {error && <div className="text-danger text-center mt-3">{error}</div>}
                            <div className="d-flex justify-content-between">
                                <Link to={"/forgot-password"} className="text-muted">
                                    Quên mật khẩu?
                                </Link>
                                <Link to={"/register"} className="text-muted">
                                    Đăng ký tại đây
                                </Link>
                            </div>
                        </Form>
                        <div className="text-center mt-4">
                            <span>hoặc đăng nhập qua</span>
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
                                        onClick={handleContinueWithGoogle}
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
