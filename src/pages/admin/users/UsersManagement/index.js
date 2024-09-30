import React from "react";
import { Row, Col } from "react-bootstrap";
import { CustomButton } from "../../../../components/common/Button";
import DataTable from "react-data-table-component";
import { ConfirmModal } from "../../../../components/common/Modal";
import { useFetchData } from "../../../../hooks/useFetchData";
import { userService } from "../../../../services/userService";
import { Loading } from "../../../../components/common/Loading";
import { customStyles, paginationOptions, userColumns } from "../../../../utils/dataTable";
import { errorAlert, successAlert } from "../../../../utils/sweetAlert";


export const UsersManagement = () => {
    return (
        <>
            <UsersManagementHeader />
            <hr />
            <UsersManagementData />
        </>
    );
};

const UsersManagementHeader = () => {
    return (
        <div className="position-sticky bg-white pb-1" style={{ top: 0, zIndex: 1000 }}>
            <h1 className="fs-3">Quản lý người dùng</h1>
            <Row className="mt-3">
                <Col lg={2} sm={4} xs={4}>
                    <CustomButton variant="success" to="/admin/create-role">+ Thêm vai trò</CustomButton>
                </Col>
                <Col lg={2} sm={4} xs={4}>
                    <CustomButton variant="success" to="/admin/create-permission">+ Thêm quyền</CustomButton>
                </Col>
                <Col lg={2} sm={4} xs={4}>
                    <CustomButton variant="outline-danger">Export</CustomButton>
                </Col>
            </Row>
        </div>
    );
};

const UsersManagementData = () => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [perPage, setPerPage] = React.useState(10);
    const [sortBy, setSortBy] = React.useState("lastModifiedOn");
    const [sortOrder, setSortOrder] = React.useState("desc");
    const [showModalStatus, setShowModalStatus] = React.useState(false);
    const [userIdUpdate, setUserIdUpdate] = React.useState(null);
    const [userStatusUpdate, setUserStatusUpdate] = React.useState(null);

    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("usersManagement", userService.getAllUsers);

    React.useEffect(() => {
        refetch();
    }, [refetch, currentPage, sortBy, sortOrder, perPage]);

    const handleGetProductIdStatus = (userId, status) => {
        setShowModalStatus(true);
        setUserIdUpdate(userId);
        setUserStatusUpdate(!status);

    }

    const handleUpdateStatusUser = async () => {
        try {
            await userService.updateUserStatus(userIdUpdate, userStatusUpdate);
            successAlert("Thành công", "Cập nhật trạng thái người dùng thành công", 3500)
            refetch();
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            errorAlert("Lỗi", "Đã xảy ra lỗi khi cập nhật", 3500);
            console.error(errorMessage);
        } finally {
            setShowModalStatus(false);
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
                        columns={userColumns(handleGetProductIdStatus)}
                        data={users.content || []}
                        pagination
                        paginationServer
                        paginationTotalRows={users.totalElements || 0}
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
                        confirm={`Bạn có muốn ${userStatusUpdate ? "mở khóa" : "khóa"} người dùng này không?`}
                        onClose={() => setShowModalStatus(false)}
                        handleOperations={handleUpdateStatusUser}

                    />
                </>
            )}
        </>
    );
};
