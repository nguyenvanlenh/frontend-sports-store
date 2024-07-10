import { Col, Row } from "react-bootstrap"
import { ProductInfo } from "../../../components/user/product/ProductInfo"
import { ProductPresentation } from "../../../components/user/product/ProductPresentation"
import { ImagesProduct } from "../../../components/user/product/ImagesProduct"

export const ProductDetail = () => {
    return (
        <>
            <Row style={{
                minHeight: "200px",
            }}>
                <Col md={6} sm={12}>
                    <ImagesProduct />
                </Col>
                <Col md={6} sm={12}>
                    <ProductInfo />
                </Col>
            </Row>
            <Row>
                <ProductPresentation />
            </Row>
        </>
    )
}