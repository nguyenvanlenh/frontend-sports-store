import { Button, Col, Dropdown, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useFetchData } from "../../../../hooks/useFetchData"
import { brandService } from "../../../../services/brandService"
import { Loading } from "../../../../components/common/Loading"
import DataTable from "react-data-table-component"
import { commonColumns, customStyles, paginationOptions } from "../../../../utils/dataTable"

export const BrandsManagement = () => {
    return (
        <>
            <BrandsManagementHeader />
            <hr />
            <BrandsManagementData />
        </>
    )
}
const BrandsManagementHeader = () => {
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
                    <Link className="btn btn-success" to="/admin/create-product" >+ Thêm hãng</Link>
                </Col>
                <Col lg={2} xs={4}>
                    <Button variant="outline-danger">Export</Button>
                </Col>
            </Row>
        </div>
    )
}
const BrandsManagementData = () => {
    const {
        data: brands,
        isLoading,
        isError,
        error
    } = useFetchData("brands", brandService.getAllBrands);
    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <DataTable
                    columns={commonColumns(() => "", () => "")}
                    data={brands || []}
                    pagination
                    paginationComponentOptions={paginationOptions}
                    customStyles={customStyles}
                />
            )}
        </>
    )
}