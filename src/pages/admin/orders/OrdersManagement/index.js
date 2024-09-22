import { Col, Row, Table } from "react-bootstrap"
import { CustomButton } from "../../../../components/common/Button"
import { useFetchData } from "../../../../hooks/useFetchData"
import { orderService } from "../../../../services/orderService"
import { Loading } from "../../../../components/common/Loading"
import { PaginationComponent } from "../../../../components/common/Pagination"
import React from "react"
import { formatCurrencyVN, formatDateTimeVN } from "../../../../utils/common"
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom"
const paymentStatusMap = {
    PENDING: { icon: <FaClock className="me-2" />, className: "text-warning" },
    COMPLETED: { icon: <FaCheckCircle className="me-2" />, className: "text-success" },
    CANCELLED: { icon: <FaTimesCircle className="me-2" />, className: "text-muted text-decoration-line-through" }
}
const paymentMethodMap = {
    COD: { className: "bg-warning" },
    BANKING: { className: "bg-success" },
    PAYPAL: { className: "bg-primary" },
}

export const OrdersManagement = () => {
    return (
        <>
            <Header />
            <hr />
            <OrdersData />
        </>
    )
}
const Header = () => {
    return (
        <div
            className="position-sticky bg-white pb-1"
            style={{
                top: 0,
                zIndex: 1000
            }}>
            <h1 className="fs-3">Quản lý sản phẩm</h1>
            <Row className="align-items-center">
                <Col><span>Tất cả (300)</span></Col>
                <Col><span>Công khai (300)</span></Col>
                <Col><span>Nội bộ (0)</span></Col>
                <Col><span>Nháp (0)</span></Col>
            </Row>
            <Row className="mt-3">
                <Col lg={3} xs={4}>
                    <CustomButton variant="success" >+ Thêm phương thức vận chuyển</CustomButton>
                </Col>
                <Col lg={1} xs={4}>
                    <CustomButton variant="white">Export</CustomButton>
                </Col>
            </Row>


        </div>
    )
}
const OrdersData = () => {
    const [currentPage, setCurrentPage] = React.useState(() => 0);

    const {
        data: orders,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("getOrders", () => orderService.getOrders(currentPage));
    const totalPage = orders?.totalPage || 0;

    React.useEffect(() => {
        refetch();
    }, [currentPage, refetch]);

    const handleChangePage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPage) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            {isLoading ? (<Loading />)
                : isError ? (<div>Error: {error.message}</div>)
                    : (<>
                        <Table>
                            <thead>
                                <tr className="align-middle">
                                    <th className="col-1">Mã</th>
                                    <th className="col-2">Tên khách hàng</th>
                                    <th className="col-2">Tổng tiền</th>
                                    <th className="col-2">Trạng thái thanh toán</th>
                                    <th className="col-2 text-center">Phương thức thanh toán</th>
                                    <th className="col-2 text-center">Trạng thái vận chuyển</th>
                                    <th className="col-1">Ngày</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.content?.map((order, idx) => {
                                    const paymentStatus = paymentStatusMap[order.payment.paymentStatus] || {};
                                    const paymentMethod = paymentMethodMap[order.payment.paymentMethod] || {};
                                    return (
                                        <tr key={idx} className="align-middle">
                                            <td className="col-1">
                                                <Link to="" className="text-primary">
                                                    #{order.id}
                                                </Link>
                                            </td>
                                            <td className="col-2 fw-bold text-secondary">{order.nameCustomer}</td>
                                            <td className="col-2 fs-5 fw-bold text-danger">{formatCurrencyVN(order.totalPrice)}</td>
                                            <td className={`col-2 ${paymentStatus.className}`}>
                                                {paymentStatus.icon}
                                                {order.payment.paymentStatus}
                                            </td>
                                            <td className="col-2 text-center">
                                                <span
                                                    className={`p-1 text-white rounded ${paymentMethod.className}`}>{order.payment.paymentMethod}
                                                </span></td>
                                            <td className="col-2 text-center">
                                                <span className="text-secondary">
                                                    {order.deliveryStatus}
                                                </span>
                                            </td>
                                            <td className="col-1 text-secondary">{formatDateTimeVN(order.createdOn)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPage}
                            onPageChange={handleChangePage} />
                    </>
                    )}
        </>
    )
}