import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../../hooks/useFetchData";
import { productService } from "../../../../services/productService";
import { Loading } from "../../../../components/common/Loading";
import { CustomButton } from "../../../../components/common/Button";
import DataTable from "react-data-table-component";
import { customStyles, paginationOptions, productColumns } from "../../../../utils/dataTable";
export const ProductsManagement = () => {
    return (
        <>
            <ProductsManagementHeader />
            <hr />
            <ProductsManagementData />
        </>
    );
};

const ProductsManagementHeader = () => {
    return (
        <div
            className="position-sticky bg-white pb-1"
            style={{
                top: 0,
                zIndex: 1000
            }}>
            <h1 className="fs-3">Quản lý sản phẩm</h1>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <Link className="btn btn-success" to="/admin/create-product">+ Thêm sản phẩm</Link>
                </Col>
                <Col lg={2} xs={4}>
                    <CustomButton variant="white">Export</CustomButton>
                </Col>
            </Row>
        </div>
    );
};

const ProductsManagementData = () => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [perPage, setPerPage] = React.useState(10);
    const [sortBy, setSortBy] = React.useState("lastModifiedOn");
    const [sortOrder, setSortOrder] = React.useState("desc");

    const {
        data: products,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("getProducts", () =>
        productService.getAllProducts(currentPage, perPage, sortBy, sortOrder));

    const totalPage = products?.totalPage || 0;

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
        setCurrentPage(0);
    };


    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataTable
                    columns={productColumns(() => "", () => "")}
                    data={products.content || []}
                    pagination
                    paginationServer
                    paginationTotalRows={totalPage * perPage}
                    paginationPerPage={perPage}
                    paginationComponentOptions={paginationOptions}
                    onChangePage={handleChangePage}
                    onSort={handleSort}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    sortServer
                    customStyles={customStyles}
                />
            )}
        </>
    );
};
