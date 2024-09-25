import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { ListFilters } from "../../../components/user/filter/ListFilters";
import { ListProductsFilter } from "../../../components/user/filter/ListProductsFilter";
import { fetchProducts } from "../../../redux/filterSlice";

export const ListProducts = () => {
    const dispatch = useDispatch();
    const sortAttribute = useSelector(state => state.filter.sortAttribute);
    const productFilter = useSelector(state => state.filter.productFilter);
    const pagination = useSelector(state => state.pagination)
    const pageSize = 12;
    const searchName = useSelector(state => state.search.content);

    const sortBy = sortAttribute?.field || "lastModifiedOn";
    const sortDirection = sortAttribute?.direction || "desc";
    React.useEffect(() => {
        dispatch(fetchProducts({
            name: searchName,
            brands: productFilter.brand,
            categories: productFilter.category,
            sizes: productFilter.size,
            currentPage: pagination,
            sizePage: pageSize,
            sortBy,
            sortDirection
        }));
    }, [dispatch, productFilter, sortAttribute, pagination, searchName, sortBy, sortDirection]);

    return (
        <Row>
            <Col sm={12} lg={3} className="d-none d-md-block">
                <ListFilters />
            </Col>
            <Col sm={12} lg={9}>
                <ListProductsFilter />
            </Col>
        </Row>
    );
};
