import { Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../../hooks/useFetchData";
import { categoryService } from "../../../../services/categoryService";
import { Loading } from "../../../../components/common/Loading";
import { CustomButton } from "../../../../components/common/Button";
import DataTable from "react-data-table-component";
import { commonColumns, customStyles, paginationOptions } from "../../../../utils/dataTable";
import React from "react";

export const CategoriesManagement = () => {
    return (
        <>
            <CategoriesManagementHeader />
            <hr />
            <CategoriesManagementData />
        </>
    );
};

const CategoriesManagementHeader = () => {
    return (
        <div className="position-sticky bg-white pb-1" style={{ top: 0, zIndex: 1000 }}>
            <h1 className="fs-3">Quản lý danh mục</h1>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <CustomButton variant="success">+ Thêm danh mục</CustomButton>
                </Col>
                <Col lg={2} xs={4}>
                    <CustomButton variant="outline-danger">Export</CustomButton>
                </Col>
            </Row>
        </div>
    );
};

const CategoriesManagementData = () => {
    const {
        data: categories,
        isLoading,
        isError,
        error,
    } = useFetchData("categories", categoryService.getAllCategories);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataTable
                    columns={commonColumns(() => "", () => "")}
                    data={categories || []}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    customStyles={customStyles}
                />
            )}
        </>
    );
};
