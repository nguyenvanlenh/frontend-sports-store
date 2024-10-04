import React from "react";
import * as Yup from "yup";
import LogoGithub from "../../../data/img/logo/logoGitBlack.png"
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { OAuthFBConfig, OAuthGGConfig, OAuthGHConfig } from "../../../configurations/configuration";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { authService } from "../../../services/authService";
import { localStorages, setLogin } from "../../../utils/localStorage";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AUTH_TYPE, authType, httpStatus, ROLE } from "../../../utils/constant";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { saveAuthentication } from "../../../redux/authSlice";

const btnLoginStyle = {
    backgroundColor: "#d81f19"
};
const validationSchema = Yup.object({
    username: Yup.string()
        .required("Vui lòng nhập tên đăng nhập")
        .min(8, "Tên đăng nhập phải từ 8 đến 20 ký tự")
        .max(20, "Tên đăng nhập phải từ 8 đến 20 ký tự")
        .matches(/^[^\s]+$/, "Tên đăng nhập không được chứa khoảng trắng")
        .matches(/^[a-zA-Z0-9@.]+$/, "Tên đăng nhập không được chứa ký tự đặc biệt"),

    password: Yup.string()
        .required("Vui lòng nhập mật khẩu")
        .min(8, "Mật khẩu phải từ 8 đến 50 ký tự")
        .max(50, "Mật khẩu phải từ 8 đến 50 ký tự")
        .matches(/^[^\s]+$/, "Mật khẩu không được chứa khoảng trắng"),
});
export const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const from = location.state?.from || "/";

    React.useEffect(() => {
        localStorages.setDataByKey(AUTH_TYPE, "")
    }, [])
    const handleContinueWithGoogle = () => {
        const callbackUrl = OAuthGGConfig.redirectUri;
        const authUrl = OAuthGGConfig.authUri;
        const googleClientId = OAuthGGConfig.clientId;
        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
        localStorages.setDataByKey(AUTH_TYPE, authType.GOOGLE)
        window.location.href = targetUrl;

    }
    const handleContinueWithGithub = () => {
        const callbackUrl = OAuthGHConfig.redirectUri;
        const authUrl = OAuthGHConfig.authUri;
        const githubClientId = OAuthGHConfig.clientId;
        localStorages.setDataByKey(AUTH_TYPE, authType.GITHUB)
        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${githubClientId}&scope=read:user&prompt=select_account`;
        window.location.href = targetUrl;

    }
    const handleContinueWithFacebook = () => {
        const callbackUrl = OAuthFBConfig.redirectUri;
        const authUrl = OAuthFBConfig.authUri;
        const facebookClientId = OAuthFBConfig.clientId;
        localStorages.setDataByKey(AUTH_TYPE, authType.FACEBOOK)
        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&client_id=${facebookClientId}&state=${uuidv4()}`;
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
                setLogin(response?.data)
                dispatch(saveAuthentication(response?.data));
                if (response?.data.listRoles.includes(ROLE.ADMIN)) {
                    navigate("/admin/dashboard");
                    return;
                }
                if (!!from) {
                    navigate(from)
                    return;
                }
                navigate("/home");
            } catch (error) {
                console.log(error);
                if (error.response && error.response.status === httpStatus.LOCKED)
                    setError("Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên qua email  adminsporter@gmail.com để biết thêm thông tin.");
                else
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
                                        onClick={handleContinueWithFacebook}
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
                            <div className="d-flex justify-content-center mt-3">
                                <Link
                                    className="w-100 me-2"
                                    style={{
                                        height: "40px",
                                        maxWidth: "150px"
                                    }}
                                >
                                    <Image
                                        onClick={handleContinueWithGithub}
                                        src={LogoGithub}
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
