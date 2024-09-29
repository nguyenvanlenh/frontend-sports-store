import React from "react";
import DataTable from "react-data-table-component";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../../../../components/common/Loading";
import { CustomButton } from "../../../../components/common/Button";
import { ConfirmModal } from "../../../../components/common/Modal";
import { useFetchData } from "../../../../hooks/useFetchData";
import { productService } from "../../../../services/productService";
import { errorAlert, successAlert } from "../../../../utils/sweetAlert";
import {
    customStyles,
    paginationOptions,
    productColumns
} from "../../../../utils/dataTable";
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
    const [showModalStatus, setShowModalStatus] = React.useState(false);
    const [showModalDelete, setShowModalDelete] = React.useState(false);
    const navigate = useNavigate();
    const [productIdUpdate, setProductIdUpdate] = React.useState(null);
    const [productIdDelele, setProductIdDelete] = React.useState(null);
    const [productStatusUpdate, setProductStatusUpdate] = React.useState(null);
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

    const handleEditProduct = (id) => navigate("/admin/update-product", { state: { productId: id } });

    const handleGetStatusProduct = (productId, currentStatus) => {
        setShowModalStatus(true);
        setProductIdUpdate(productId);
        setProductStatusUpdate(!currentStatus);
    }

    const handleUpdateStatusProduct = async () => {
        try {
            await productService.updateProductStatus(productIdUpdate, productStatusUpdate);
            successAlert("Thành công", "Cập nhật trạng thái sản phẩm thành công", 3500)
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", "Đã xảy ra lỗi khi cập nhật", 3500);
            console.error(errorMessage);
        } finally {
            setShowModalStatus(false);
        }
    }

    const handleGetProductId = (productId) => {
        setProductIdDelete(productId);
        setShowModalDelete(true);
    }
    const handleDeleteProduct = async () => {
        try {
            await productService.deleteProductById(productIdUpdate);
            successAlert("Thành công", "Xóa sản phẩm thành công", 3500)
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", "Đã xảy ra lỗi khi xóa", 3500);
            console.error(errorMessage);
        } finally {
            setShowModalDelete(false);
        }
    }


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
                <>
                    <DataTable
                        columns={productColumns(
                            handleEditProduct,
                            handleGetStatusProduct,
                            handleGetProductId)}
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
                    <ConfirmModal
                        show={showModalStatus}
                        confirm={`Bạn có muốn ${!productStatusUpdate ? "khóa" : "mở khóa"} sản phẩm này không?`}
                        onClose={() => setShowModalStatus(false)}
                        handleOperations={handleUpdateStatusProduct}
                    />
                    <ConfirmModal
                        show={showModalDelete}
                        confirm={`Bạn có muốn xóa sản phẩm này không?`}
                        onClose={() => setShowModalDelete(false)}
                        handleOperations={handleDeleteProduct}
                    />
                </>
            )}
        </>
    );
};
