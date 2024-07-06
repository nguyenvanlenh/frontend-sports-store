import React from "react";
import { Button, Container, Image, Nav } from "react-bootstrap";
import UserImage from "../../../data/img/user_icon.webp"
import "./styles.scss";
import { BsAmd } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div id="header-user">
                <Container>
                    <Nav className="justify-content-between pt-3 pb-3 align-items-center" activeKey="/home">
                        <Nav.Item>
                            <Link to="/home"><BsAmd size={30} /></Link>
                        </Nav.Item>
                        <div className="d-flex flex-fill justify-content-around main-tab">
                            <Nav.Item>
                                <Link to="/home">Trang chủ</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/home">Giảm giá</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link eventKey="link-1">Đồ Nam</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link eventKey="link-2">Đồ Nữ</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link eventKey="link-2">Blog</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link eventKey="disabled" disabled>
                                    Sự kiện
                                </Link>
                            </Nav.Item>
                        </div>
                        <div className="d-flex justify-content-between btn-header">
                            <Nav.Item>
                                <Button variant="link" onClick={() => { navigate("/search") }}>
                                    <FaSearch />
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="link">
                                    <FaShoppingBag />
                                </Button>
                            </Nav.Item>
                            <Nav.Item className="btn-profile">
                                <Button variant="link" >
                                    <FaUser />
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
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <div className="close-btn" onClick={toggleMenu}>&times;</div>
                <div className="text-center">
                    <Image src={UserImage} roundedCircle height={40} />
                    <h6 className="text-white">Lênh Nguyễn</h6>
                </div>
                <Nav className="flex-column">
                    <Nav.Item>
                        <Link to="/home" onClick={toggleMenu}>Trang chủ</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to="/home" onClick={toggleMenu}>Giảm giá</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link eventKey="link-1" onClick={toggleMenu}>Đồ Nam</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link eventKey="link-2" onClick={toggleMenu}>Đồ Nữ</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link eventKey="link-2" onClick={toggleMenu}>Blog</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link eventKey="disabled" onClick={toggleMenu} disabled>
                            Sự kiện
                        </Link>
                    </Nav.Item>
                </Nav>
            </div>
        </>
    );
};
