import React from "react";
import DataTable from "react-data-table-component";
import { Col, Row } from "react-bootstrap";
import { CustomButton } from "../../../../components/common/Button";
import { ConfirmModal, ProductAttributesModal } from "../../../../components/common/Modal";
import { useFetchData } from "../../../../hooks/useFetchData";
import { sizeService } from "../../../../services/sizeService";
import { Loading } from "../../../../components/common/Loading";
import { commonColumns, customStyles, paginationOptions } from "../../../../utils/dataTable";
import { sizeRequest } from "../../../../models/sizeRequest";
import { errorAlert, successAlert } from "../../../../utils/sweetAlert";


export const SizesManagement = () => {
    const {
        data: sizes,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("sizes", sizeService.getAllSizes);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <>
                    <SizesManagementHeader refetch={refetch} />
                    <hr />
                    <SizesManagementData sizes={sizes} refetch={refetch} />
                </>
            )}
        </>
    );
};

const SizesManagementHeader = ({ refetch }) => {
    const [showModalCreation, setShowModalCreation] = React.useState(false);

    const handleCreateBrand = async (sizeCreation) => {
        try {
            if (sizeCreation.name?.trim()?.length === 0) {
                errorAlert("Lỗi", `Vui lòng nhập tên kích cỡ`, 3500);
                return;
            }
            const request = sizeRequest({
                name: sizeCreation.name,
                description: sizeCreation.description,
                active: sizeCreation.isActive
            })
            await sizeService.createSize(request);
            successAlert(
                "Thông báo",
                "Thêm kích cỡ thành công",
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
            <h1 className="fs-3">Quản lý kích cỡ</h1>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <CustomButton
                        variant="success"
                        onClick={() => setShowModalCreation(true)}>+ Thêm kích cỡ</CustomButton>
                </Col>
                <Col lg={2} xs={4}>
                    <CustomButton variant="outline-danger">Export</CustomButton>
                </Col>
            </Row>
            <ProductAttributesModal
                show={showModalCreation}
                onClose={() => setShowModalCreation(false)}
                title="Thêm kích cỡ"
                type="size"
                action="create"
                handleOperations={handleCreateBrand}
            />
        </div>
    );
};

const SizesManagementData = ({ sizes, refetch }) => {
    const [data, setData] = React.useState();
    const [showModalEdit, setShowModalEdit] = React.useState(false);
    const [showModalDelete, setShowModalDelete] = React.useState(false);
    const [showDetail, setShowDetail] = React.useState(false);
    const [sizeId, setSizeId] = React.useState();


    const handleGetDataForEdit = (data) => {
        setData(data)
        setShowModalEdit(true);
    }

    const handleEditSize = async (sizeUpdate) => {
        try {
            const request = sizeRequest({
                name: sizeUpdate.name,
                description: sizeUpdate.description,
                active: sizeUpdate.isActive
            })
            await sizeService.updateSize(sizeUpdate.id, request);
            successAlert(
                "Thông báo",
                "Cập nhật kích cỡ thành công",
                3000
            );
            setShowModalEdit(false);
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`, 3500);
        }
    }
    const handleGetDataForDelete = (sizeId) => {
        setSizeId(sizeId);
        setShowModalDelete(true);
    }
    const handleDeleteSize = async () => {
        try {
            await sizeService.deleteSize(sizeId);
            successAlert(
                "Thông báo",
                "Xóa kích cỡ thành công",
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
        setSizeId(id)
    }
    return (
        <>
            <DataTable
                columns={commonColumns(
                    handleGetDataForEdit,
                    handleGetDataForDelete,
                    handleShowDetail)}
                data={sizes || []}
                pagination
                paginationComponentOptions={paginationOptions}
                customStyles={customStyles}
            />
            <ProductAttributesModal
                show={showModalEdit}
                onClose={() => setShowModalEdit(false)}
                title="Cập nhật kích cỡ"
                type="size"
                action="update"
                currentProductAttribute={data}
                handleOperations={handleEditSize}
            />
            <ProductAttributesModal
                show={showDetail}
                onClose={() => setShowDetail(false)}
                title="Chi tiết kích cỡ"
                type="size"
                action="view"
                currentProductAttribute={sizes?.filter((item) => item.id === sizeId)[0]}
            />
            <ConfirmModal
                show={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                confirm="Bạn có muốn xóa kích cỡ này không"
                handleOperations={handleDeleteSize}
            />
        </>
    );
};
