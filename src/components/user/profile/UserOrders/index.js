import React from "react";
import { Badge, Button, Col, Form, Image, InputGroup, Nav, Row } from "react-bootstrap";
import { deliveryStatus, USER_LS } from "../../../../utils/constant";
import { formatCurrencyVN } from "../../../../utils/common";
import ImageLiver from "../../../../data/img/liver.webp";
import { ScrollToTop } from "../../../../routes/ScrollToTop";
import { useFetchData } from "../../../../hooks/useFetchData";
import { paymentService } from "../../../../services/paymentService";
import { localStorages } from "../../../../utils/localStorage";
import { Loading } from "../../../common/Loading";
import { ItemOrderDetail } from "../../checkout/ItemOrderDetail";
const tabContentStyle = { minHeight: "500px" };
export const UserOrders = () => {
    const [activeTab, setActiveTab] = React.useState(deliveryStatus.ALL.key);
    const [isSticky, setIsSticky] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState(""); // State để lưu từ khóa tìm kiếm
    const navRef = React.useRef(null);
    const headerHeight = React.useRef(0);
    const userId = localStorages.getDataByKey(USER_LS)?.userId;
    const {
        data: payments,
        isLoading,
        isError,
        error
    } = useFetchData("payments", () => paymentService.getPaymentsByUserId(userId));

    React.useEffect(() => {
        const header = document.querySelector("#header-user");
        headerHeight.current = header?.offsetHeight || 0;
    }, []);

    const handleScroll = React.useCallback(() => {
        const navTop = navRef.current.getBoundingClientRect().top;
        if (navTop >= headerHeight.current) return;
        if (navRef.current) {
            setIsSticky(navTop < headerHeight.current);
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleSearch = () => {
        setSearchTerm(searchTerm.trim().toLowerCase());
    };

    const filterDataByStatusAndSearch = (status) => {
        const filteredData = status === deliveryStatus.ALL.key
            ? payments?.content
            : payments?.content?.filter(payment => payment.order.deliveryStatus === status);

        return filteredData?.filter(payment =>
            payment.order.id == searchTerm ||
            payment.order.listOrderDetails.some(orderDetail =>
                orderDetail.product.name.toLowerCase().includes(searchTerm)
            )
        );
    };

    const tabContent = {
        [deliveryStatus.ALL.key]: <ItemOrderList data={filterDataByStatusAndSearch(deliveryStatus.ALL.key)} />,
        [deliveryStatus.PREPARING.key]: <ItemOrderList data={filterDataByStatusAndSearch(deliveryStatus.PREPARING.key)} />,
        [deliveryStatus.DELIVERING.key]: <ItemOrderList data={filterDataByStatusAndSearch(deliveryStatus.DELIVERING.key)} />,
        [deliveryStatus.DELIVERED.key]: <ItemOrderList data={filterDataByStatusAndSearch(deliveryStatus.DELIVERED.key)} />,
        [deliveryStatus.CANCELLED.key]: <ItemOrderList data={filterDataByStatusAndSearch(deliveryStatus.CANCELLED.key)} />
    };

    return (
        <>
            <h1 className="fs-3">Đơn hàng của tôi</h1>
            <Nav
                ref={navRef}
                className="bg-light"
                style={isSticky ? { position: "sticky", top: headerHeight.current, zIndex: 999 } : {}}
                variant="underline"
                activeKey={activeTab}
                fill
                onSelect={setActiveTab}
            >
                {Object.values(deliveryStatus).map((status, idx) => (
                    <Nav.Item key={idx}>
                        <Nav.Link
                            eventKey={status.key}
                            className="text-secondary"
                        >
                            {status.displayName}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>

            <InputGroup className="my-3">
                <Form.Control
                    placeholder="Nhập mã đơn hàng hoặc tên sản phẩm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật từ khóa khi nhập
                />
                <InputGroup.Text onClick={handleSearch} className="text-primary">Tìm kiếm</InputGroup.Text>
            </InputGroup>

            <div className="mt-3">
                {tabContent[activeTab]}
                <ScrollToTop trigger={activeTab} />
            </div>
        </>
    );
};

const ItemOrderList = ({ data }) => (
    <div style={tabContentStyle}>

        {data.length > 0 ?
            data?.map((payment, idx) =>
                <ItemOrder key={idx} data={payment} />
            )
            : <div className="d-flex align-items-center justify-content-center">
                <i>Không có đơn hàng nào</i>
            </div>
        }
    </div>
);

const ItemOrder = ({ data }) => (
    <>
        <div className="bg-light p-3 rounded">
            <OrderHeader
                id={data.order.id}
                status={data.order.deliveryStatus} />
            <hr className="m-0 mt-1" />
            {data.order.listOrderDetails.map((orderDetail, idx) =>
                <ItemOrderDetail key={idx} detail={orderDetail} />)}

        </div>
        <OrderFooter amount={data.amount} status={data.order.deliveryStatus} />
    </>
);

const OrderHeader = ({ id, status }) => (
    <div className="d-flex justify-content-between align-items-center">
        <span>MÃ ĐƠN: {id}</span>
        <div>
            {status === deliveryStatus.CANCELLED.key && (
                <span className="text-uppercase text-warning">{deliveryStatus.CANCELLED.displayName}</span>
            )}
            {status === deliveryStatus.DELIVERING.key && (
                <span className="text-uppercase text-warning">{deliveryStatus.DELIVERING.displayName}</span>
            )}
            {status === deliveryStatus.DELIVERED.key && (
                <>
                    <span className="text-success">{deliveryStatus.DELIVERED.displayName}</span>
                    <span className="mx-1 text-secondary">|</span>
                    <span className="text-uppercase text-warning">Hoàn thành</span>
                </>
            )}
            {status === deliveryStatus.PREPARING.key && (
                <span className="text-uppercase text-warning">{deliveryStatus.PREPARING.displayName}</span>
            )}
        </div>
    </div>
);


const OrderFooter = ({ amount, status }) => (
    <div className="d-flex justify-content-end bg-light p-3 mb-3 rounded" style={{ borderTop: "1px dotted rgba(0, 0, 0, .2)" }}>
        <div>
            <div className="d-flex justify-content-end align-items-center mb-2">
                <span>Thành tiền:</span>
                <span className="fs-4 ms-2">{formatCurrencyVN(amount)}</span>
            </div>
            <div>
                {
                    status === deliveryStatus.DELIVERED.key
                        ? <Button variant="danger" className="px-5">Mua lại</Button>
                        : <Button variant="danger" className="px-5">Hủy đơn hàng</Button>
                }
                <Button variant="outline-secondary" className="px-5 ms-2">Liên hệ shop</Button>
            </div>
        </div>
    </div>
);

