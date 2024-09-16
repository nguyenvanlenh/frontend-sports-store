import React from "react";
import { Col, Dropdown, Row } from "react-bootstrap"
import { CardProduct } from "../../product/CardProduct"
import { ListFilters } from "../ListFilters";
import { PaginationComponent } from "../../../common/Pagination";
import { OffcanvasComponent } from "../../../common/Offcanvas";
import { usePagination } from "../../../../hooks/usePagination";
import { DropDownSorting } from "../DropDownSorting";
import { useSelector } from "react-redux";

export const ListProductsFilter = () => {
    const [show, setShow] = React.useState(false);
    const { products } = useSelector(state => state.filter);
    const { currentPage, totalPage, handleChangePage } = usePagination(products?.currentPage || 0, products?.totalPage);

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
                {products?.content?.length
                    ? products?.content?.map((item, idx) => (
                        <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                            <CardProduct key={idx} product={item} />
                        </Col>
                    ))
                    : <div className="d-flex justify-content-center align-items-center mt-5">
                        <p>Không có sản phẩm nào</p></div>}
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