import React from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import UserImage from "../../../data/img/user_icon.webp"
import './style.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { TbBrandSnowflake } from "react-icons/tb";
import { ConfirmModal } from '../../../components/common/Modal';
import { IoMdResize } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const menuItems = [
    {
        to: "/admin/dashboard",
        icon: <MdDashboardCustomize />,
        title: "Dashboard"
    },
    {
        to: "/admin/products",
        icon: <AiFillProduct />,
        title: "Quản lý sản phẩm"
    },
    {
        to: "/admin/users",
        icon: <FaUserGroup />,
        title: "Quản lý người dùng"
    },
    {
        to: "/admin/categories",
        icon: <MdCategory />,
        title: "Quản lý danh mục"
    },
    {
        to: "/admin/brands",
        icon: <TbBrandSnowflake />,
        title: "Quản lý nhãn hàng"
    },
    {
        to: "/admin/sizes",
        icon: <IoMdResize />,
        title: "Quản lý kích cỡ"
    },
    {
        to: "/admin/profiles",
        icon: <FaUser />,
        title: "Cá nhân"
    },
]
export const SideBar = () => {

    const [confirm, setConfirm] = React.useState(false)
    const navigation = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigation("/login")
    }

    return (
        <>
            <Row className="sidebar">
                <Col md={12} className="p-0">
                    <div className="sidebar-header">
                        <Image src={UserImage} roundedCircle height={60} />
                        <h3>Admin</h3>
                    </div>
                    <div className="sidebar-content">
                        <ul className="sidebar-menu">
                            {menuItems.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <NavLink
                                            className="d-flex justify-content-center align-items-center"
                                            to={item.to}
                                            title={item.title}>
                                            <span className="icon">{item.icon}</span>
                                            <span className="text d-none d-md-block">{item.title}</span>
                                        </NavLink>
                                    </li>
                                )
                            })}
                            <li>
                                <Button
                                    variant="link"
                                    className="w-100 d-flex justify-content-center"
                                    onClick={() => setConfirm(true)}
                                >
                                    <span className="icon"><RiLogoutBoxLine /></span>
                                    <span className="text d-none d-md-block text-start">Đăng xuất</span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="p-2 bg-light">
                        <p className="text-center text-dark">SPORTER</p>
                    </div>
                </Col>
            </Row>
            <ConfirmModal
                show={confirm}
                confirm={"Bạn muốn đăng xuất không"}
                onClose={() => setConfirm(false)}
                handleOperations={handleLogout}
            />
        </>
    );
};