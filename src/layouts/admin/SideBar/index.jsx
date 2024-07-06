import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Button } from 'react-bootstrap';
import UserImage from "../../../data/img/user_icon.webp"
import './style.scss'
import { NavLink, useNavigate } from 'react-router-dom';
import { MdDashboardCustomize } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaUserGroup } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { MdReport } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { FaHouseUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { ConfirmModal } from '../../../components/common/Modal';
export const SideBar = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1200);

    const [confirm, setConfirm] = useState(false)
    const navigation = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigation("/login")
    }

    const handleResize = () => {
        setIsOpen(window.innerWidth >= 1200);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <Row className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <Col md={12} className="p-0">
                    <div className="sidebar-header">
                        {isOpen ?
                            <>
                                <Image src={UserImage} roundedCircle height={60} />
                                <h3>Admin</h3>
                            </>
                            :
                            <>
                                <Image src={UserImage} roundedCircle height={40} />
                                <h6>Admin</h6>
                            </>
                        }
                    </div>
                    <div className="sidebar-content">
                        <ul className="sidebar-menu">
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/dashboard"
                                    title='Dashboard'>
                                    <span className="icon"><MdDashboardCustomize /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/exams"
                                    title='Quản lý sản phẩm'>
                                    <span className="icon"><AiFillProduct /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Quản lý sản phẩm</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/users"
                                    title='Quản lý người dùng'>
                                    <span className="icon"><FaUserGroup /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Quản lý người dùng</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/reports">
                                    <span className="icon"><BiSolidReport /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Báo cáo</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/logging">
                                    <span className="icon"><MdReport /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Quản lý nhật ký</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/logging">
                                    <span className="icon"><IoNotificationsSharp /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Thông báo</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="d-flex justify-content-center"
                                    to="/admin/logging">
                                    <span className="icon"><FaHouseUser /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Cá nhân</span>
                                </NavLink>
                            </li>
                            <li>
                                <Button
                                    variant="link"
                                    className={`${isOpen ? '' : 'w-100 d-flex justify-content-center'}`}
                                    onClick={() => setConfirm(true)}
                                >
                                    <span className="icon"><RiLogoutBoxLine /></span>
                                    <span className={`text ${isOpen ? '' : 'hidden-xs'}`}>Đăng xuất</span>
                                </Button>
                            </li>
                        </ul>
                    </div>
                    <div className="sidebar-footer">
                        <p>STUDY ADMIN</p>
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