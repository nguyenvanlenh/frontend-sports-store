import React, { useState } from "react";
import { Button, Container, Image, Nav } from "react-bootstrap";
import UserImage from "../../../data/img/user_icon.webp";
import "./styles.scss";
import { BsAmd } from "react-icons/bs";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IconCart } from "../../../components/user/cart/IconCart";
import { OffcanvasComponent } from "../../../components/common/Offcanvas";

export const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const SIZE_ICON_HEADER = 20;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const menuItems = [
        { path: "/home", label: "Trang chủ" },
        { path: "/home", label: "Giảm giá" },
        { path: "/list-products", label: "Sản phẩm" },
        { path: "#", label: "Blog" },
        { path: "#", label: "Sự kiện" }
    ];

    return (
        <>
            <div id="header-user" className="mb-3">
                <Container>
                    <Nav className="justify-content-between pt-3 pb-3 align-items-center" activeKey="/home">
                        <Nav.Item>
                            <Link to="/home"><BsAmd size={30} /></Link>
                        </Nav.Item>
                        <div className="d-flex flex-fill justify-content-around main-tab">
                            {menuItems.map((item, index) => (
                                <Nav.Item key={index}>
                                    <Link to={item.path} className={item.disabled ? "disabled" : ""}>
                                        {item.label}
                                    </Link>
                                </Nav.Item>
                            ))}
                        </div>
                        <div className="d-flex justify-content-between btn-header">
                            <Nav.Item>
                                <Button variant="link" onClick={() => { navigate("/search") }}>
                                    <FaSearch size={SIZE_ICON_HEADER} />
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="link">
                                    <Link to="/cart">
                                        <IconCart size={SIZE_ICON_HEADER} />
                                    </Link>
                                </Button>
                            </Nav.Item>
                            <Nav.Item className="btn-profile">
                                <Button variant="link">
                                    <FaUser size={SIZE_ICON_HEADER} />
                                </Button>
                            </Nav.Item>
                        </div>
                        <Nav.Item className="menu-icon">
                            <Button variant="link" onClick={toggleMenu}>
                                <IoMenuSharp size={30} />
                            </Button>
                        </Nav.Item>
                    </Nav>
                </Container>
            </div>
            <OffcanvasComponent show={menuOpen} handleClose={toggleMenu} title="">
                <div className="text-center">
                    <Image src={UserImage} roundedCircle height={40} />
                    <h6>Lênh Nguyễn</h6>
                </div>
                <Nav className="flex-column text-dark">
                    {menuItems.map((item, index) => (
                        <Nav.Item key={index}>
                            <Link to={item.path} onClick={toggleMenu}>
                                {item.label}
                            </Link>
                        </Nav.Item>
                    ))}
                </Nav>
            </OffcanvasComponent>
        </>
    );
};
