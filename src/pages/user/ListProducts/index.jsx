import { Col, Row } from "react-bootstrap"
import { ListFilters } from "../../../components/user/filter/ListFilters"
import { ListProductsFilter } from "../../../components/user/filter/ListProductsFilter"

export const ListProducts = () => {
    return (
        <>
            <Row>
                <Col sm={12} lg={3} className="d-none d-md-block" >
                    <ListFilters />
                </Col>
                <Col sm={12} lg={9}>
                    <ListProductsFilter />
                </Col>
            </Row>
        </>
    )
}