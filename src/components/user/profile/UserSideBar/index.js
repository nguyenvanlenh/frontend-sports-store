import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
    FaRegCreditCard,
    FaUser,
    FaRegNewspaper,
    FaStarHalfAlt,
    FaHeart,
    FaRegEye,
    FaHeadphones
} from "react-icons/fa";
import UserImage from "../../../../data/img/user_icon.webp";
import "./style.scss";
import { useSelector } from "react-redux";

const menuItems = [
    {
        to: "/profile/customer/account",
        icon: <FaUser />,
        title: "Thông tin tài khoản"
    },
    {
        to: "/profile/order/history",
        icon: <FaRegNewspaper />,
        title: "Quản lý đơn hàng"
    },
    {
        to: "/profile/payment/info",
        icon: <FaRegCreditCard />,
        title: "Thông tin thanh toán"
    },
    {
        to: "/profile/product/rating",
        icon: <FaStarHalfAlt />,
        title: "Đánh giá sản phẩm"
    },
    {
        to: "/profile/product/favourite",
        icon: <FaHeart />,
        title: "Sản phẩm yêu thích"
    },
    {
        to: "/profile/product/viewed",
        icon: <FaRegEye />,
        title: "Sản phẩm đã xem"
    },
    {
        to: "/profile/customer/support",
        icon: <FaHeadphones />,
        title: "Hỗ trợ khách hàng"
    }
];

export const UserSideBar = () => {
    const authentication = useSelector((state) => state.auth);
    React.useEffect(() => { }, [authentication])
    return (
        <Row className="sidebar-profile bg-light pe-1 pt-2 rounded">
            <Col md={12} className="p-0">
                <div className="d-flex align-items-center justify-content-around flex-wrap mb-2">
                    <Image src={authentication?.avatar || UserImage} roundedCircle height={50} />
                    <div className="ms-2">
                        <p className="m-0">Tài khoản của</p>
                        <p className="m-0 fs-5">Nguyễn Văn Lênh</p>
                    </div>
                </div>
                <div className="sidebar-content">
                    <ul className="sidebar-menu">
                        {menuItems.map(({ to, icon, title }, index) => (
                            <li key={index}>
                                <NavLink
                                    className="d-flex justify-content-center align-items-center"
                                    to={to}
                                    title={title}>
                                    <span className="icon">{icon}</span>
                                    <span className="text d-none d-md-block">{title}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </Col>
        </Row>
    )
};
