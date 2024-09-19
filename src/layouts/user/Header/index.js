import React from "react";
import { Button, Container, Dropdown, Image, Nav } from "react-bootstrap";
import UserImage from "../../../data/img/user_icon.webp";
import "./styles.scss";
import { BsAmd } from "react-icons/bs";
import { FaSearch, FaUser, FaSearchMinus } from "react-icons/fa";
import { IoMenuSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IconCart } from "../../../components/user/cart/IconCart";
import { OffcanvasComponent } from "../../../components/common/Offcanvas";
import { SearchBar } from "../../../components/user/search/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch } from "../../../redux/searchSlice";
import { logout } from "../../../redux/authSlice";

export const Header = () => {
    const authentication = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const searchInputRef = React.useRef(null);
    const SIZE_ICON_HEADER = 20;

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleOpenSearch = () => {
        setSearchOpen(!searchOpen);
        if (searchOpen) dispatch(clearSearch());
    };

    React.useEffect(() => {
        if (searchOpen && searchInputRef.current)
            searchInputRef.current.focus();
    }, [searchOpen]);

    const menuItems = [
        { path: "/home", label: "Trang chủ" },
        { path: "/home", label: "Giảm giá" },
        { path: "/list-products", label: "Sản phẩm" },
        { path: "#", label: "Blog" },
        { path: "#", label: "Sự kiện" }
    ];
    const handleLogout = () => {
        dispatch(logout());
        localStorage.clear();
        navigate("/login")
        window.history.pushState(null, null, "/login");
    }

    return (
        <>
            <div id="header-user" className="mb-3">
                <Container>
                    <Nav className="d-flex justify-content-between pt-3 pb-3 align-items-center flex-nowrap" activeKey="/home">
                        <Nav.Item>
                            <Link to="/home"><BsAmd size={30} /></Link>
                        </Nav.Item>
                        {!searchOpen
                            ? <div className="d-flex flex-fill justify-content-around main-tab">
                                {menuItems.map((item, index) => (
                                    <Nav.Item key={index}>
                                        <Link to={item.path} className={item.disabled ? "disabled" : ""}>
                                            {item.label}
                                        </Link>
                                    </Nav.Item>
                                ))}
                            </div>
                            : <SearchBar className="d-none d-md-block" ref={searchInputRef} />
                        }
                        {<SearchBar className="d-block d-md-none" />}
                        <div className="d-flex justify-content-between btn-header">
                            <Nav.Item className="d-none d-md-block">
                                <Button variant="link" onClick={handleOpenSearch}>
                                    {searchOpen
                                        ? <FaSearchMinus size={SIZE_ICON_HEADER} />
                                        : <FaSearch size={SIZE_ICON_HEADER} />
                                    }
                                </Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="link">
                                    <Link to="/cart">
                                        <IconCart size={SIZE_ICON_HEADER} />
                                    </Link>
                                </Button>
                            </Nav.Item>
                            <Nav.Item className="d-none d-md-block">
                                {
                                    !!(authentication?.userId)
                                        ? <Dropdown drop="down-centered">
                                            <Dropdown.Toggle as={Button} variant="link">
                                                <FaUser size={SIZE_ICON_HEADER} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to="/profile/customer-account" className="text-secondary">Trang cá nhân</Dropdown.Item>
                                                <Dropdown.Item as={Link} to="/profile/order-history" className="text-secondary">Đơn hàng của tôi</Dropdown.Item>
                                                <Dropdown.Item as={Button} onClick={handleLogout} className="text-secondary">Đăng xuất</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        : <Button variant="link" onClick={() => {
                                            navigate("/login")
                                        }}>
                                            <FaUser size={SIZE_ICON_HEADER} />
                                        </Button>
                                }

                            </Nav.Item>
                            <Nav.Item className="d-block d-md-none">
                                <Button variant="link" onClick={toggleMenu}>
                                    <IoMenuSharp size={30} />
                                </Button>
                            </Nav.Item>
                        </div>
                    </Nav>
                </Container>
            </div>
            <OffcanvasComponent show={menuOpen} handleClose={toggleMenu} title="">
                <div className="text-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        toggleMenu()
                        navigate("/profile/customer-account")
                    }}>
                    < Image src={authentication?.avatar || UserImage} roundedCircle height={40} />
                    <h6>{authentication.firstName ||
                        authentication.lastName ||
                        authentication.email}</h6>
                </div>
                <Nav className="flex-column text-dark">
                    {menuItems.map((item, index) => (
                        <Nav.Item key={index}>
                            <Link to={item.path} onClick={toggleMenu}>
                                {item.label}
                            </Link>
                        </Nav.Item>
                    ))}
                    <Nav.Item key={1000}>
                        <Link onClick={handleLogout}>
                            Đăng xuất
                        </Link>
                    </Nav.Item>
                </Nav>
            </OffcanvasComponent >
        </>
    );
};
