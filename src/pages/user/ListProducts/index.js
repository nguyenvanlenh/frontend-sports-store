import { Col, Row } from "react-bootstrap"
import { productService } from "../../../services/productService"
import React from "react"
import { useQuery } from "react-query"
import { CardPlaceholder } from "../../../components/user/product/CardProduct"
import { ListFilters } from "../../../components/user/filter/ListFilters"
import { ListProductsFilter } from "../../../components/user/filter/ListProductsFilter"

export const ListProducts = () => {

    const currentPage = 0;
    const category = "nam"
    const brand = "NIKE"

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
            <div className="d-flex flex-wrap justify-content-center">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                        <CardPlaceholder key={index} />
                    </Col>
                ))}
            </div>
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