import { Button, Col, Dropdown, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useFetchData } from "../../../../hooks/useFetchData"
import { brandService } from "../../../../services/brandService"
import { Loading } from "../../../../components/common/Loading"
import DataTable from "react-data-table-component"
import { commonColumns, customStyles, paginationOptions } from "../../../../utils/dataTable"
import React from "react"
import { errorAlert, successAlert } from "../../../../utils/sweetAlert"
import { brandRequest } from "../../../../models/brandRequest"
import { ConfirmModal, ProductAttributesModal } from "../../../../components/common/Modal"
import { CustomButton } from "../../../../components/common/Button"

export const BrandsManagement = () => {
    const {
        data: brands,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("brands", brandService.getAllBrands);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    <BrandsManagementHeader brands={brands} refetch={refetch} />
                    <hr />
                    <BrandsManagementData brands={brands} refetch={refetch} />
                </>)}
        </>
    )
}
const BrandsManagementHeader = ({ brands, refetch }) => {
    const [showModalCreation, setShowModalCreation] = React.useState(false);

    const handleCreateBrand = async (brandCreation) => {
        try {
            if (brandCreation.name?.trim()?.length === 0) {
                errorAlert("Lỗi", `Vui lòng nhập tên hãng`, 3500);
                return;
            }
            const request = brandRequest({
                name: brandCreation.name,
                description: brandCreation.description,
                active: brandCreation.isActive
            })
            await brandService.createBrand(request);
            successAlert(
                "Thông báo",
                "Thêm hãng thành công",
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
        <div
            className="position-sticky bg-white pb-1"
            style={{
                top: 0,
                zIndex: 1000
            }}>
            <h1 className="fs-3">Quản lý hãng</h1>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <CustomButton
                        variant="success"
                        onClick={() => setShowModalCreation(true)}
                    >+ Thêm hãng</CustomButton>
                </Col>
                <Col lg={2} xs={4}>
                    <CustomButton variant="outline-danger">Export</CustomButton>
                </Col>
            </Row>
            <ProductAttributesModal
                show={showModalCreation}
                onClose={() => setShowModalCreation(false)}
                title="Thêm hãng"
                type="brand"
                action="create"
                handleOperations={handleCreateBrand}
            />
        </div>
    )
}
const BrandsManagementData = ({ brands, refetch }) => {
    const [data, setData] = React.useState();
    const [showModalEdit, setShowModalEdit] = React.useState(false);
    const [showModalDelete, setShowModalDelete] = React.useState(false);
    const [showDetail, setShowDetail] = React.useState(false);
    const [brandId, setBrandId] = React.useState();


    const handleGetDataForEdit = (data) => {
        setData(data)
        setShowModalEdit(true);
    }

    const handleEditBrand = async (brandUpdate) => {
        try {
            const request = brandRequest({
                name: brandUpdate.name,
                description: brandUpdate.description,
                active: brandUpdate.isActive
            })
            await brandService.updateBrand(brandUpdate.id, request);
            successAlert(
                "Thông báo",
                "Cập nhật hãng thành công",
                3000
            );
            setShowModalEdit(false);
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`, 3500);
        }
    }
    const handleGetDataForDelete = (brandId) => {
        setBrandId(brandId);
        setShowModalDelete(true);
    }
    const handleDeleteCategory = async () => {
        try {
            await brandService.deleteBrand(brandId);
            successAlert(
                "Thông báo",
                "Xóa hãng thành công",
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
        setBrandId(id)
    }
    return (
        <>
            <DataTable
                columns={commonColumns(
                    handleGetDataForEdit,
                    handleGetDataForDelete,
                    handleShowDetail)}
                data={brands || []}
                pagination
                paginationComponentOptions={paginationOptions}
                customStyles={customStyles}
            />
            <ProductAttributesModal
                show={showModalEdit}
                onClose={() => setShowModalEdit(false)}
                title="Cập nhật hãng"
                type="brand"
                action="update"
                currentProductAttribute={data}
                handleOperations={handleEditBrand}
            />
            <ProductAttributesModal
                show={showDetail}
                onClose={() => setShowDetail(false)}
                title="Chi tiết hãng"
                type="brand"
                action="view"
                currentProductAttribute={brands?.filter((item) => item.id === brandId)[0]}
            />
            <ConfirmModal
                show={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                confirm="Bạn có muốn xóa hãng này không"
                handleOperations={handleDeleteCategory}
            />
        </>
    )
}