import React from "react"
import { Col, Row } from "react-bootstrap"
import { productService } from "../../../services/productService"
import { useQuery } from "react-query"
import { ListFilters } from "../../../components/user/filter/ListFilters"
import { ListProductsFilter } from "../../../components/user/filter/ListProductsFilter"
import { Loading } from "../../../components/common/Loading"

export const ListProducts = () => {

    const fetchData = () => {
        return productService.getAllProducts()
            .then(res => res?.data)
    }
    const { data: products, isLoading, isError, error } = useQuery(
        "listProductFilter",
        fetchData
    );


    if (isError) {
        return <div>Error: {error.message}</div>;
    }
    if (isLoading) {
        return (
            <Loading />
        );
    }
    return (
        <Row>
            <Col sm={12} lg={3} className="d-none d-md-block" >
                <ListFilters />
            </Col>
            <Col sm={12} lg={9}>
                <ListProductsFilter data={products} />
            </Col>
        </Row>
    )
}