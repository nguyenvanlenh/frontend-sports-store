import React from "react"
import { Col, Row } from "react-bootstrap"
import { CustomButton } from "../../../../components/common/Button"
import { useFetchData } from "../../../../hooks/useFetchData"
import { orderService } from "../../../../services/orderService"
import { Loading } from "../../../../components/common/Loading"
import DataTable from "react-data-table-component"
import { customStyles, orderColumns, paginationOptions } from "../../../../utils/dataTable"

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

    const {
        data: orders,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("getOrders",
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

    return (
        <>
            {isLoading ? (<Loading />)
                : isError ? (<div>Error: {error.message}</div>)
                    : (
                        <DataTable
                            columns={orderColumns}
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
                    )}
        </>
    );
}