import { Button, Col, FloatingLabel, Form, Image, Row } from "react-bootstrap"
import UserImage from "../../../../data/img/user_icon.webp";
import { localStorages } from "../../../../utils/localStorage";
import { authType, USER_LS } from "../../../../utils/constant";
import React from "react";
import { useSelector } from "react-redux";
export const Account = () => {
    const authentication = useSelector((state) => state.auth);
    const [fullName, setFullName] = React.useState(() => {
        const firstName = authentication?.firstName || "";
        const lastName = authentication?.lastName || "";
        return firstName || lastName ? firstName + " " + lastName : "";
    });
    React.useEffect(() => { }, [authentication])

    return (
        <>
            <Row>
                <Col lg={8} sm={12} xs={12} className="mb-3">
                    <Row>
                        <h2 className="fs-5">Thông tin cá nhân</h2>
                        <div className="d-flex justify-content-between">
                            <Image src={authentication?.avatar || UserImage} roundedCircle height={110} />
                            <div className="flex-fill ms-5 d-flex flex-column justify-content-around">
                                <div className="d-flex justify-content-between align-items-center flex-nowrap">
                                    <span style={{
                                        minWidth: "140px"
                                    }}>Họ và Tên</span>
                                    <Form.Group controlId="customer_fullname"
                                        className="flex-fill">
                                        <Form.Control
                                            type="text"
                                            name="fullname"
                                            placeholder="Họ và Tên của bạn"
                                            value={fullName}

                                        />
                                    </Form.Group>
                                </div>
                                <div className="d-flex justify-content-between align-items-center flex-nowrap">
                                    <span style={{
                                        minWidth: "140px"
                                    }}>Nickname</span>
                                    <Form.Group controlId="customer_nickname"
                                        className="flex-fill">
                                        <Form.Control
                                            type="text"
                                            name="nickname"
                                            placeholder="Nickname của bạn"

                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex justify-content-between align-items-center flex-nowrap mb-3">
                                <span style={{
                                    minWidth: "155px"
                                }}>Địa chỉ</span>
                                <Form.Group controlId="customer_address" className="flex-fill">
                                    <Form.Control

                                        type="text"
                                        name="address"
                                        placeholder="Địa chỉ của bạn"

                                    />
                                </Form.Group>
                            </div>
                            <div className="d-flex justify-content-between align-items-start flex-nowrap">
                                <span style={{
                                    minWidth: "155px"
                                }}>Giới thiệu bản thân</span>

                                <Form.Group className="flex-fill" controlId="introduce">
                                    <FloatingLabel
                                        label="Giới thiệu về bạn"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            as="textarea"
                                            style={{
                                                height: "100px",
                                                maxHeight: "150px",
                                            }}
                                            placeholder="Giới thiệu về bạn"
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <Button className="px-5">Lưu thay đổi</Button>
                        </div>
                    </Row>
                </Col>
                <Col lg={4} sm={12} xs={12} style={{
                    borderLeft: "1px solid rgb(235, 235, 240)"
                }}>
                    <h2 className="fs-5">Số điện thoại và Email</h2>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-column">
                            <span>Số điện thoại</span>
                            <span>{authentication?.phone}</span>
                        </div>
                        <Button variant="outline-primary">Cập nhật</Button>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <span>Email</span>
                            <span>{authentication?.email}</span>
                        </div>
                        <Button variant="outline-primary">Cập nhật</Button>
                    </div>
                    <h2 className="fs-5 mt-4">Bảo mật</h2>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-column">
                            <span>Mật khẩu</span>
                        </div>
                        <Button variant="outline-primary">Cập nhật</Button>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <span>Xóa tài khoản</span>
                        </div>
                        <Button variant="outline-primary">Xóa</Button>
                    </div>
                    <h2 className="fs-5 mt-4">Liên kết mạng xã hội</h2>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-column">
                            <span>Facebook</span>
                        </div>
                        <Button variant={authentication.typeAccount === authType.FACEBOOK ?
                            "primary" : "outline-primary"}>{authentication.typeAccount === authType.FACEBOOK ? "Đã liên kết" : "Liên kết"}</Button>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex flex-column">
                            <span>Google</span>
                        </div>
                        <Button
                            variant={authentication.typeAccount === authType.GOOGLE ?
                                "primary" : "outline-primary"}>{authentication.typeAccount === authType.GOOGLE ? "Đã liên kết" : "Liên kết"}</Button>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-column">
                            <span>Github</span>
                        </div>
                        <Button
                            variant={authentication.typeAccount === authType.GITHUB ?
                                "primary" : "outline-primary"}>{authentication.typeAccount === authType.GITHUB ? "Đã liên kết" : "Liên kết"}</Button>
                    </div>
                </Col>
            </Row >
        </>
    )
}