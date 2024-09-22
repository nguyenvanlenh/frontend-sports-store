import { Badge, Dropdown, Image, Row, Col } from "react-bootstrap";
import { useFetchData } from "../../../../hooks/useFetchData";
import { userService } from "../../../../services/userService";
import React from "react";
import { Loading } from "../../../../components/common/Loading";
import { CustomButton } from "../../../../components/common/Button";
import DataTable from "react-data-table-component";
import { customStyles, paginationOptions, userColumns } from "../../../../utils/dataTable";


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
                    columns={userColumns(() => "", () => "")}
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
            )}
        </>
    );
};
