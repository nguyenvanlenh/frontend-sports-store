import React from "react";
import { Button, Container, Image, Nav } from "react-bootstrap";
import UserImage from "../../../data/img/user_icon.webp"
import "./styles.scss";
import { BsAmd } from "react-icons/bs";
import { FaSearch, FaUser } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IconCart } from "../../../components/user/cart/IconCart";
import { OffcanvasComponent } from "../../../components/common/Offcanvas";

export const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);

    const SIZE_ICON_HEADER = 20;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div id="header-user" className="mb-3">
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
                                <Link to="/list-products">Sản phẩm</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link >Blog</Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link disabled>
                                    Sự kiện
                                </Link>
                            </Nav.Item>
                        </div>
                        <div className="d-flex justify-content-between btn-header">
                            <Nav.Item>
                                <Button variant="link" onClick={() => { navigate("/search") }}>
                                    <FaSearch size={SIZE_ICON_HEADER} />
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="link">
                                    <IconCart size={SIZE_ICON_HEADER} />
                                </Button>
                            </Nav.Item>
                            <Nav.Item className="btn-profile">
                                <Button variant="link" >
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
            {/* <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
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
                        <Link onClick={toggleMenu}>Đồ Nam</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link onClick={toggleMenu}>Đồ Nữ</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link onClick={toggleMenu}>Blog</Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link onClick={toggleMenu} disabled>
                            Sự kiện
                        </Link>
                    </Nav.Item>
                </Nav>
            </div> */}
            <OffcanvasComponent
                show={menuOpen}
                handleClose={toggleMenu}
                title="">
                <div className="">
                    <div className="text-center">
                        <Image src={UserImage} roundedCircle height={40} />
                        <h6 className="">Lênh Nguyễn</h6>
                    </div>
                    <Nav className="flex-column text-dark">
                        <Nav.Item>
                            <Link to="/home" onClick={toggleMenu}>Trang chủ</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/home" onClick={toggleMenu}>Giảm giá</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/list-products">Sản phẩm</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link onClick={toggleMenu}>Blog</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link onClick={toggleMenu} disabled>
                                Sự kiện
                            </Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </OffcanvasComponent>
        </>
    );
};
