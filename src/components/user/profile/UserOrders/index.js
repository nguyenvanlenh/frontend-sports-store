import React from "react";
import { Button, Form, InputGroup, Nav } from "react-bootstrap";
import { deliveryStatus, orderStatus } from "../../../../utils/constant";
import { formatCurrencyVN } from "../../../../utils/common";
import { ScrollToTop } from "../../../../routes/ScrollToTop";
import { useFetchData } from "../../../../hooks/useFetchData";
import { Loading } from "../../../common/Loading";
import { ItemOrderDetail } from "../../checkout/ItemOrderDetail";
import { ConfirmModal, OrderDetailModal, ProductRatingModal } from "../../../common/Modal";
import { useSelector } from "react-redux";
import { orderService } from "../../../../services/orderService";
import { errorAlert, successAlert } from "../../../../utils/sweetAlert";
import { CustomButton } from "../../../common/Button";
const tabContentStyle = { minHeight: "500px" };


export const UserOrders = () => {
    const authentication = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = React.useState(deliveryStatus.ALL.key);
    const [isSticky, setIsSticky] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const navRef = React.useRef(null);
    const headerHeight = React.useRef(0);
    const {
        data: orders,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData(`orders${authentication?.userId}`, () => orderService.getOrdersByUserId(authentication?.userId));

    React.useEffect(() => {
        const header = document.querySelector("#header-user");
        headerHeight.current = header?.offsetHeight || 0;
    }, []);

    const handleScroll = React.useCallback(() => {
        const navTop = navRef.current?.getBoundingClientRect()?.top;
        if (navTop >= headerHeight.current) return;
        if (navRef.current) setIsSticky(navTop < headerHeight.current);
    }, []);
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleSearch = () => setSearchTerm(searchTerm.trim().toLowerCase());


    const filterDataByStatusAndSearch = (status) => {
        const filteredData = status === deliveryStatus.ALL.key
            ? orders?.content
            : orders?.content?.filter(order => order.deliveryStatus === status);

        return filteredData?.filter(order =>
            String(order.id).includes(searchTerm.toLowerCase()) ||
            order.listOrderDetails.some(orderDetail =>
                orderDetail.product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    };

    const tabContent = {
        [deliveryStatus.ALL.key]: <ItemOrderList
            data={filterDataByStatusAndSearch(deliveryStatus.ALL.key)}
            refetch={refetch} />,
        [deliveryStatus.PREPARING.key]: <ItemOrderList
            data={filterDataByStatusAndSearch(deliveryStatus.PREPARING.key)}
            refetch={refetch} />,
        [deliveryStatus.DELIVERING.key]: <ItemOrderList
            data={filterDataByStatusAndSearch(deliveryStatus.DELIVERING.key)}
            refetch={refetch} />,
        [deliveryStatus.DELIVERED.key]: <ItemOrderList
            data={filterDataByStatusAndSearch(deliveryStatus.DELIVERED.key)}
            refetch={refetch} />,
        [deliveryStatus.CANCELLED.key]: <ItemOrderList
            data={filterDataByStatusAndSearch(deliveryStatus.CANCELLED.key)}
            refetch={refetch} />
    };
    if (isLoading) {
        return <Loading />;
    }
    if (isError) {
        return (
            <div>
                {isError && <div>Error loading list orders: {error.message}</div>}
            </div>
        );
    }
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
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text onClick={handleSearch}
                    style={{
                        cursor: "pointer",
                        color: "#d81f19"
                    }}>Tìm kiếm</InputGroup.Text>
            </InputGroup>

            <div className="mt-3">
                {tabContent[activeTab]}
                <ScrollToTop trigger={activeTab} />
            </div>
        </>
    );
};

const ItemOrderList = ({ data, refetch }) => {
    const hasData = Array.isArray(data) && data.length > 0;

    return (
        <div style={tabContentStyle}>
            {hasData ? (
                data.map((order, idx) => (
                    <ItemOrder key={idx} data={order} refetch={refetch} />
                ))
            ) : (
                <div className="d-flex align-items-center justify-content-center">
                    <i>Không có đơn hàng nào</i>
                </div>
            )}
        </div>
    );
};


const ItemOrder = ({ data, refetch }) => {
    const [showModalRating, setShowModal] = React.useState(false);
    return (
        data.listOrderDetails.map((orderDetail, idx) =>
            <React.Fragment key={idx}>
                <div className="bg-light p-3 rounded">
                    <OrderHeader
                        id={data.id}
                        status={data.deliveryStatus} />
                    <hr className="m-0 mt-1" />
                    <ItemOrderDetail key={idx} detail={orderDetail} onClick={() => setShowModal(true)} />
                </div>
                <OrderFooter
                    amount={data.payment.amount}
                    status={data.deliveryStatus}
                    order={data}
                    productId={orderDetail.product.id}
                    orderDetailId={orderDetail.id}
                    isRating={orderDetail.isRating}
                    refetch={refetch} />
                <OrderDetailModal
                    show={showModalRating}
                    onClose={() => setShowModal(false)}
                    data={data}
                />
            </React.Fragment>
        )
    )
}

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


const OrderFooter = ({
    amount,
    status,
    order,
    productId,
    orderDetailId,
    isRating = true,
    refetch }) => {
    const [showModalRating, setShowModal] = React.useState(false);
    const [showModalCancel, setShowModalCancel] = React.useState(false);
    const authentication = useSelector((state) => state.auth);

    const handleCancelOrder = async (rejectReason) => {
        try {
            await orderService.updateOrderStatus(order.id,
                {
                    status: orderStatus.CANCELLED,
                    rejectReason: rejectReason
                });
            successAlert(
                "Thành công",
                "Hủy đơn hàng thành công",
                3000,
                () => {
                    refetch()
                    setShowModalCancel(false)
                })
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`, 3500);
        }

    }
    const renderActions = () => {
        if (status === deliveryStatus.DELIVERED.key) {
            return renderDeliveredActions();
        }
        if (order.orderStatus === orderStatus.CANCELLED) {
            return <CustomButton
                variant="danger" style={{
                    backgroundColor: "#d81f19"
                }} className="px-5 me-2 my-2">Mua lại</CustomButton>;
        }
        return (
            <CustomButton
                variant="danger"
                onClick={() => setShowModalCancel(true)}
                style={{
                    backgroundColor: "#d81f19"
                }} className="px-5 my-2 me-2"
            >
                Hủy đơn hàng
            </CustomButton>
        );
    };

    const renderDeliveredActions = () => (
        <>
            {!isRating &&
                <Button
                    variant="warning"
                    className="px-5 me-2 my-2"
                    onClick={() => setShowModal(true)}
                >Đánh giá</Button>}
            <CustomButton variant="danger"
                style={{
                    backgroundColor: "#d81f19"
                }}
                className="px-5 me-2 my-2">Mua lại</CustomButton>
        </>
    );
    return (
        <>
            <div className="d-flex justify-content-end bg-light p-3 mb-3 rounded" style={{ borderTop: "1px dotted rgba(0, 0, 0, .2)" }}>
                <div>
                    <div className="d-flex justify-content-end align-items-center mb-2">
                        <span>Thành tiền:</span>
                        <span className="fs-4 ms-2">{formatCurrencyVN(amount)}</span>
                    </div>
                    <div>
                        {renderActions()}
                        <CustomButton variant="outline-secondary" className="px-5 my-2">Liên hệ shop</CustomButton>
                    </div>
                </div>
            </div>
            <ProductRatingModal
                show={showModalRating}
                handleClose={() => setShowModal(false)}
                productId={productId}
                userId={authentication?.userId}
                orderDetailId={orderDetailId}
                refetch={refetch}
            />
            <ConfirmModal
                show={showModalCancel}
                confirm="Bạn có muốn hủy đơn hàng này không?"
                onClose={() => setShowModalCancel(false)}
                handleOperations={handleCancelOrder}
                input="cause"
            />
        </>
    )
}

