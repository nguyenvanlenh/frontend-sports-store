import { Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../../hooks/useFetchData";
import { sizeService } from "../../../../services/sizeService";
import { Loading } from "../../../../components/common/Loading";
import { CustomButton } from "../../../../components/common/Button";
import DataTable from "react-data-table-component";
import { commonColumns, customStyles, paginationOptions } from "../../../../utils/dataTable";
import React from "react";


export const SizesManagement = () => {
    return (
        <>
            <SizesManagementHeader />
            <hr />
            <SizesManagementData />
        </>
    );
};

const SizesManagementHeader = () => {
    return (
        <div className="position-sticky bg-white pb-1" style={{ top: 0, zIndex: 1000 }}>
            <h1 className="fs-3">Quản lý kích cỡ</h1>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <CustomButton variant="success">+ Thêm kích cỡ</CustomButton>
                </Col>
                <Col lg={2} xs={4}>
                    <CustomButton variant="outline-danger">Export</CustomButton>
                </Col>
            </Row>
        </div>
    );
};

const SizesManagementData = () => {
    const {
        data: sizes,
        isLoading,
        isError,
        error,
    } = useFetchData("sizes", sizeService.getAllSizes);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataTable
                    columns={commonColumns(() => "", () => "")}
                    data={sizes || []}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    customStyles={customStyles}
                />
            )}
        </>
    );
};
