import React from "react";
import { Col, Dropdown, Row } from "react-bootstrap"
import { CardProduct } from "../../product/CardProduct"
import { ListFilters } from "../ListFilters";
import { PaginationComponent } from "../../../common/Pagination";
import { OffcanvasComponent } from "../../../common/Offcanvas";
import { usePagination } from "../../../../hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { setSortAttribute } from "../../../../redux/filterSlice";

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
                {products?.content.length
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
const DropDownSorting = () => {
    const dispatch = useDispatch();
    const sortAttribute = useSelector(state => state.filter.sortAttribute);
    const { products } = useSelector(state => state.filter);
    const { handleChangePage } = usePagination(products?.currentPage || 0, products?.totalPage);
    const sortObj = (field, direction, label) => {
        return {
            field,
            direction,
            label
        }
    }
    const isChecked = (sort) => {
        return sortAttribute.field === sort.field &&
            sortAttribute.direction === sort.direction
    }
    const handleSortChange = (value) => {
        dispatch(setSortAttribute(value));
        handleChangePage(0);
    };
    return (
        <Dropdown data-bs-theme="light">
            <Dropdown.Toggle variant="light" className="w-100">
                {sortAttribute?.label || "Sắp xếp sản phẩm"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("price", "asc", e.target.textContent))}
                    active={isChecked(sortObj("price", "asc"))}
                >
                    Giá thấp - cao
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("price", "desc", e.target.textContent))}
                    active={isChecked(sortObj("price", "desc"))}
                >
                    Giá cao - thấp
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("lastMofifiedOn", "desc", e.target.textContent))}
                    active={isChecked(sortObj("lastMofifiedOn", "desc"))}
                >
                    Sản phẩm mới nhất
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("lastMofifiedOn", "asc", e.target.textContent))}
                    active={isChecked(sortObj("lastMofifiedOn", "asc"))}
                >
                    Sản phẩm cũ nhất
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("name", "asc", e.target.textContent))}
                    active={isChecked(sortObj("name", "asc"))}
                >
                    Tên: A - Z
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("name", "desc", e.target.textContent))}
                    active={isChecked(sortObj("name", "desc"))}
                >
                    Tên: Z - A
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
} 