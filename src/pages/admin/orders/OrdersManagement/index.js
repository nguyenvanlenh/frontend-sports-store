import React from "react"
import { Col, Row } from "react-bootstrap"
import { CustomButton } from "../../../../components/common/Button"
import { useFetchData } from "../../../../hooks/useFetchData"
import { orderService } from "../../../../services/orderService"
import { Loading } from "../../../../components/common/Loading"
import DataTable from "react-data-table-component"
import { customStyles, orderColumns, paginationOptions } from "../../../../utils/dataTable"
import { OrderDetailModal, OrderEditModal } from "../../../../components/common/Modal"
import { STATUS_TYPES } from "../../../../utils/constant"
import { paymentService } from "../../../../services/paymentService"
import { errorAlert, successAlert } from "../../../../utils/sweetAlert"

export const OrdersManagement = () => {
    return (
        <>
            <OrdersManagementHeader />
            <hr />
            <OrdersManagementData />
        </>
    )
}
const OrdersManagementHeader = () => {
    return (
        <div
            className="position-sticky bg-white pb-1"
            style={{
                top: 0,
                zIndex: 1000
            }}>
            <h1 className="fs-3">Quản lý đơn hàng</h1>
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
const OrdersManagementData = () => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [perPage, setPerPage] = React.useState(20);
    const [sortBy, setSortBy] = React.useState("id");
    const [sortOrder, setSortOrder] = React.useState("asc");
    const [productIdForDetail, setProductIdForDetail] = React.useState(null);
    const [showModalOrderDetail, setShowModalOrderDetail] = React.useState(false);
    const [showModalOrderEdit, setShowModalOrderEdit] = React.useState(false);
    const [typeEdit, setTypeEdit] = React.useState();
    const [titleEdit, setTitleEdit] = React.useState();
    const [currentValue, setCurrentValue] = React.useState();
    const [idEdit, setIdEdit] = React.useState();
    const {
        data: orders,
        isLoading,
        isError,
        error,
        refetch } = useFetchData("getOrders",
            () => orderService.getOrders(currentPage, perPage, sortBy, sortOrder));
    const totalPage = orders?.totalPage || 0;

    React.useEffect(() => {
        refetch();
    }, [currentPage, perPage, sortBy, sortOrder, refetch]);

    const handleChangePage = (page) => {
        setCurrentPage(page - 1);
    };

    const handleSort = (column, sortDirection) => {
        setSortBy(column.sortField);
        setSortOrder(sortDirection);
    };
    const handleRowsPerPageChange = (newPerPage, page) => {
        setPerPage(newPerPage);
        setCurrentPage(page - 1);
    };

    const handleShowOrderDetail = (productId) => {
        setProductIdForDetail(productId)
        setShowModalOrderDetail(true);
    }
    const handleShowOrderEdit = (id, title, typeEdit, currentValue) => {
        setIdEdit(id);
        setTitleEdit(title);
        setTypeEdit(typeEdit);
        setCurrentValue(currentValue);
        setShowModalOrderEdit(true);
    }

    const handleOrderEdit = async (status) => {
        console.log(status);

        try {
            switch (typeEdit) {
                case STATUS_TYPES.ORDER:
                    await orderService.updateOrderStatus(idEdit, {
                        status: status,
                    })
                    break;
                case STATUS_TYPES.PAYMENT:
                    await paymentService.updatePaymentStatus(idEdit, status)
                    break;
                case STATUS_TYPES.DELIVERY:
                    await orderService.updateDeliveryStatus(idEdit, status)
                    break;
                default:
                    break;
            }
            successAlert(
                "Thông báo",
                "Cập nhật trạng thái thành công",
                3000
            );
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`, 3500);
        }
    }
    return (
        <>
            {isLoading ? (<Loading />)
                : isError ? (<div>Error: {error.message}</div>)
                    : (
                        <>
                            <DataTable
                                columns={orderColumns(
                                    handleShowOrderDetail,
                                    handleShowOrderEdit)}
                                data={orders.content || []}
                                pagination
                                paginationServer
                                paginationTotalRows={totalPage * perPage}
                                paginationPerPage={perPage}
                                paginationComponentOptions={paginationOptions}
                                onChangePage={handleChangePage}
                                sortServer
                                onSort={handleSort}
                                customStyles={customStyles}
                                onChangeRowsPerPage={handleRowsPerPageChange}
                            />
                            {
                                showModalOrderDetail &&
                                <OrderDetailModal
                                    show={showModalOrderDetail}
                                    onClose={() => setShowModalOrderDetail(false)}
                                    data={orders?.content.filter(
                                        item => item?.id === productIdForDetail)[0]}
                                />
                            }
                            <OrderEditModal
                                show={showModalOrderEdit}
                                onClose={() => setShowModalOrderEdit(false)}
                                title={titleEdit}
                                typeEdit={typeEdit}
                                currentValue={currentValue}
                                handleOperations={handleOrderEdit}
                            />

                        </>
                    )}
        </>
    );
}