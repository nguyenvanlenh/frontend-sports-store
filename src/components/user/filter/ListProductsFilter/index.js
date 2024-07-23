import { Col, Dropdown, Row } from "react-bootstrap"
import { CardProduct } from "../../product/CardProduct"
import React from "react";
import { ListFilters } from "../ListFilters";
import { PaginationComponent } from "../../../common/Pagination";
import { OffcanvasComponent } from "../../../common/Offcanvas";
import { usePagination } from "../../../../hooks/usePagination";

export const ListProductsFilter = ({ data }) => {
    const [products] = React.useState(() => data?.content)
    const [show, setShow] = React.useState(false);

    const { currentPage, totalPage, handleChangePage } = usePagination(data?.currentPage, data?.totalPage);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="mb-4">Tất cả sản phẩm</h1>
                <div className="d-none d-md-block">
                    <DropDownSorting />
                </div>
            </div>
            <div className="d-block d-md-none">
                <Row className="mt-2 mb-4">
                    <Col xs={6}>
                        <DropDownSorting />
                    </Col>
                    <Col xs={6}>
                        <Dropdown data-bs-theme="light">
                            <Dropdown.Toggle
                                variant="light"
                                className="w-100"
                                onClick={handleShow} >
                                Lọc sản phẩm
                            </Dropdown.Toggle>
                        </Dropdown></Col>
                </Row>
            </div>

            <Row className="g-3">
                {products?.map((item, idx) => (
                    <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                        <CardProduct key={idx} product={item} />
                    </Col>
                ))}
            </Row>

            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPage}
                onPageChange={handleChangePage} />
            <OffcanvasComponent
                show={show}
                handleClose={handleClose}
                title="Lọc sản phẩm"
            >
                <ListFilters />
            </OffcanvasComponent>
        </>
    )
}
const DropDownSorting = () => {
    return (
        <Dropdown data-bs-theme="light">
            <Dropdown.Toggle variant="light" className="w-100">
                Sắp xếp sản phẩm
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" active>
                    Giá cao
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Giá thấp</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Mới nhất</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Cũ nhất</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Tên: A - Z</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Tên: Z - A</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
} 