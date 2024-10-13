import React from "react";
import { Button, Container, Dropdown, Image, Nav } from "react-bootstrap";
import { OffcanvasComponent } from "../../../components/common/Offcanvas";
import { SearchBar } from "../../../components/user/search/SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconCart } from "../../../components/user/cart/IconCart";
import { FaSearch, FaUser, FaSearchMinus } from "react-icons/fa";
import { CustomButton } from "../../../components/common/Button";
import { getCartByUserThunk } from "../../../redux/cartThunks";
import { clearSearch } from "../../../redux/searchSlice";
import UserImage from "../../../data/img/user_icon.webp";
import Logo from "../../../data/img/logo/main_logo.png"
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/cartSlice";
import { logout } from "../../../redux/authSlice";
import { TiThMenuOutline } from "react-icons/ti";
import { ROLE } from "../../../utils/constant";
import "./styles.scss";
import { confirmAlert } from "../../../utils/sweetAlert";

const active = {
    backgroundColor: "rgba(245, 245, 245,.2)",
}

const menuItems = [
    { path: "/home", label: "Trang chủ" },
    { path: "#", label: "Giảm giá" },
    { path: "/list-products", label: "Sản phẩm" },
    { path: "#", label: "Blog" },
    { path: "#", label: "Sự kiện" }
];
const SIZE_ICON_HEADER = 21;
export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authentication = useSelector((state) => state.auth);

    const location = useLocation();
    const pathName = location.pathname;

    const [menuOpen, setMenuOpen] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const searchInputRef = React.useRef(null);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleOpenSearch = () => {
        setSearchOpen(!searchOpen);
        if (searchOpen) dispatch(clearSearch());
    };

    React.useEffect(() => {
        if (searchOpen && searchInputRef.current)
            searchInputRef.current.focus();
    }, [searchOpen]);

    React.useEffect(() => {
        const isLogin = !!(authentication?.userId);
        if (isLogin)
            dispatch(getCartByUserThunk())
    }, [authentication.userId, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        localStorage.clear();
        navigate("/login")
        window.history.pushState(null, null, "/login");
    }

    const handleClickCart = () => {
        const isLogin = !!(authentication?.userId);
        if (!isLogin) {
            confirmAlert(() => navigate("/login", { state: { from: "/cart" } }), "Vui lòng đăng nhập trước khi xem giỏ hàng")
            return;
        }
        navigate("/cart")
    }

    return (
        <>
            <div id="header-user" className="mb-3">
                <Container>
                    <Nav className="d-flex justify-content-between pt-3 pb-3 align-items-center flex-nowrap" activeKey="/home">
                        <Nav.Item>
                            <Link to="/home">
                                <Image src={Logo} className="d-none d-sm-block" width="115px" />

                                <Image src={Logo} className="d-block d-sm-none me-1" width="75px" />
                            </Link>
                        </Nav.Item>
                        {!searchOpen
                            ? <div className="d-flex flex-fill justify-content-around main-tab">
                                {menuItems.map((item, index) => (
                                    <Nav.Item key={index}>
                                        <Link
                                            to={item.path}
                                            className="fs-5 py-5 px-2"
                                            style={(pathName === item.path) ? active : {}}>
                                            {item.label}
                                        </Link>
                                    </Nav.Item>
                                ))}
                            </div>
                            : <SearchBar ref={searchInputRef} />
                        }
                        <div className="d-flex justify-content-between align-items-center btn-header ">
                            <Nav.Item>
                                <CustomButton variant="link" onClick={handleOpenSearch} className="p-1 p-md-2">
                                    {searchOpen
                                        ? <FaSearchMinus size={SIZE_ICON_HEADER} />
                                        : <FaSearch size={SIZE_ICON_HEADER} />
                                    }
                                </CustomButton>
                            </Nav.Item>
                            {!searchOpen &&
                                <Nav.Item>
                                    <Button variant="link" className="p-1 p-md-2"
                                        onClick={handleClickCart}>
                                        <IconCart size={SIZE_ICON_HEADER} />
                                    </Button>
                                </Nav.Item>}
                            <Nav.Item className="d-none d-md-block">
                                {
                                    !!(authentication?.userId)
                                        ?
                                        <Dropdown drop="down-centered">
                                            <Dropdown.Toggle as={Button} variant="link">
                                                <FaUser size={SIZE_ICON_HEADER} />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {(authentication?.listRoles || []).includes(ROLE.ADMIN)
                                                    ? <Dropdown.Item as={Link} to="/admin/dashboard" className="text-secondary">Đi đến Dashboard</Dropdown.Item>
                                                    : <>
                                                        <Dropdown.Item as="button" onClick={() => navigate("/profile/customer-account")} className="text-secondary">Trang cá nhân</Dropdown.Item>
                                                        <Dropdown.Item as="button" onClick={() => navigate("/profile/order-history")} className="text-secondary">Đơn hàng của tôi</Dropdown.Item>
                                                        <Dropdown.Item as="button" onClick={handleLogout} className="text-secondary">Đăng xuất</Dropdown.Item>
                                                    </>
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>

                                        : <CustomButton variant="link" onClick={() => {
                                            navigate("/login")
                                        }}>
                                            <FaUser size={SIZE_ICON_HEADER} />
                                        </CustomButton>
                                }

                            </Nav.Item>
                            <Nav.Item className="d-block d-md-none">
                                <CustomButton variant="link" onClick={toggleMenu} className="p-1 p-md-2 align-end">
                                    <TiThMenuOutline size={25} />
                                </CustomButton>
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
                        if (!!(authentication?.userId))
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
                    {(authentication?.listRoles || []).includes(ROLE.ADMIN) &&
                        <Nav.Item key={1000}>
                            <Link to="/admin/dashboard">
                                Đi đến Dashboard
                            </Link>
                        </Nav.Item>
                    }
                    {
                        !!(authentication?.userId)
                            ? <Nav.Item key={1000}>
                                <Link onClick={handleLogout}>
                                    Đăng xuất
                                </Link>
                            </Nav.Item>
                            : <Nav.Item key={1000}>
                                <Link onClick={() => {
                                    navigate("/login")
                                }}>
                                    Đăng nhập
                                </Link>
                            </Nav.Item>
                    }

                </Nav>
            </OffcanvasComponent >
        </>
    );
};
