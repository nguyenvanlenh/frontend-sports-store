import { Col, Row } from "react-bootstrap";
import { useFetchData } from "../../../../hooks/useFetchData";
import { categoryService } from "../../../../services/categoryService";
import { Loading } from "../../../../components/common/Loading";
import { CustomButton } from "../../../../components/common/Button";
import DataTable from "react-data-table-component";
import { commonColumns, customStyles, paginationOptions } from "../../../../utils/dataTable";
import React from "react";
import { ConfirmModal, ProductAttributesModal } from "../../../../components/common/Modal";
import { categoryRequest } from "../../../../models/categoryRequest";
import { errorAlert, successAlert } from "../../../../utils/sweetAlert";

export const CategoriesManagement = () => {
    const {
        data: categories,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("categories", categoryService.getAllCategories);
    return (
        <>
            {
                isLoading ? (
                    <Loading />
                ) : isError ? (
                    <div>Error: {error.message}</div>
                ) : (<>
                    <CategoriesManagementHeader refetch={refetch} />
                    <hr />
                    <CategoriesManagementData refetch={refetch} categories={categories} />
                </>)
            }
        </>
    )
}

const CategoriesManagementHeader = ({ refetch }) => {
    const [showModalCreation, setShowModalCreation] = React.useState(false);

    const handleCreateCategory = async (categoryCreation) => {
        try {
            if (categoryCreation.name?.trim()?.length === 0) {
                errorAlert("Lỗi", `Vui lòng nhập tên danh mục`, 3500);
                return;
            }
            const request = categoryRequest({
                name: categoryCreation.name,
                description: categoryCreation.description,
                active: categoryCreation.isActive
            })
            await categoryService.createCategory(request);
            successAlert(
                "Thông báo",
                "Thêm danh mục thành công",
                3000
            );
            setShowModalCreation(false);
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`, 3500);
        }
    }
    return (
        <div className="position-sticky bg-white pb-1" style={{ top: 0, zIndex: 1000 }}>
            <h1 className="fs-3">Quản lý danh mục</h1>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <CustomButton
                        variant="success"
                        onClick={() => setShowModalCreation(true)}
                    >+ Thêm danh mục</CustomButton>
                </Col>
                <Col lg={2} xs={4}>
                    <CustomButton variant="outline-danger">Export</CustomButton>
                </Col>
            </Row>
            <ProductAttributesModal
                show={showModalCreation}
                onClose={() => setShowModalCreation(false)}
                title="Thêm danh mục"
                type="category"
                action="create"
                handleOperations={handleCreateCategory}
            />
        </div>
    );
};

const CategoriesManagementData = ({ refetch, categories }) => {
    const [data, setData] = React.useState();
    const [showModalEdit, setShowModalEdit] = React.useState(false);
    const [showModalDelete, setShowModalDelete] = React.useState(false);
    const [showDetail, setShowDetail] = React.useState(false);
    const [categoryId, setCategoryId] = React.useState();


    const handleGetDataForEdit = (data) => {
        setData(data)
        setShowModalEdit(true);
    }

    const handleEditCategory = async (categoryUpdate) => {
        try {
            const request = categoryRequest({
                name: categoryUpdate.name,
                description: categoryUpdate.description,
                active: categoryUpdate.isActive
            })
            await categoryService.updateCategory(categoryUpdate.id, request);
            successAlert(
                "Thông báo",
                "Cập nhật danh mục thành công",
                3000
            );
            setShowModalEdit(false);
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`, 3500);
        }
    }
    const handleGetDataForDelete = (categoryId) => {
        setCategoryId(categoryId);
        setShowModalDelete(true);
    }
    const handleDeleteCategory = async () => {
        try {
            await categoryService.deleteCategory(categoryId);
            successAlert(
                "Thông báo",
                "Xóa danh mục thành công",
                3000
            );
            setShowModalDelete(false);
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`, 3500);
        }
    }
    const handleShowDetail = (id) => {
        setShowDetail(true)
        setCategoryId(id)
    }

    return (
        <>
            <DataTable
                columns={commonColumns(
                    handleGetDataForEdit,
                    handleGetDataForDelete,
                    handleShowDetail
                )}
                data={categories || []}
                pagination
                paginationComponentOptions={paginationOptions}
                customStyles={customStyles}
            />
            <ProductAttributesModal
                show={showModalEdit}
                onClose={() => setShowModalEdit(false)}
                title="Cập nhật thể loại"
                type="category"
                action="update"
                currentProductAttribute={data}
                handleOperations={handleEditCategory}
            />
            <ProductAttributesModal
                show={showDetail}
                onClose={() => setShowDetail(false)}
                title="Chi tiết thể loại"
                type="category"
                action="view"
                currentProductAttribute={categories?.filter((item) => item.id === categoryId)[0]}
            />
            <ConfirmModal
                show={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                confirm="Bạn có muốn xóa danh mục này không"
                handleOperations={handleDeleteCategory}
            />
        </>
    );
};
