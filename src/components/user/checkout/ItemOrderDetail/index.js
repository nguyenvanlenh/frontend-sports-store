import { Badge, Col, Image, Row } from "react-bootstrap";
import { formatCurrencyVN } from "../../../../utils/common";

export const ItemOrderDetail = ({ detail }) => {
    return (
        <Row className="d-flex justify-content-between align-items-center mt-3 mb-3">
            <Col lg={8} xs={8}>
                <div className="d-flex" >
                    <div style={{
                        position: "relative",
                        display: "inline-block",
                    }}>
                        <Image
                            src={detail.product.listImages[0].path}
                            thumbnail
                            style={{
                                width: "70px",
                                height: "70px",
                                objectFit: "cover",
                                marginRight: "20px"
                            }} />
                        <Badge
                            pill
                            bg="secondary"
                            text="white"
                            style={{
                                position: "absolute",
                                top: "-7px",
                                right: "9px"
                            }}
                        >{detail.quantity}</Badge>
                    </div>
                    <div className="d-flex flex-column ms-2">
                        <span>{detail.product.name}</span>
                        <span>{detail.size.name || detail.size}</span>
                    </div>
                </div>
            </Col>
            <Col lg={4} xs={4}>
                <span className="d-flex justify-content-end">{formatCurrencyVN(detail.quantity * detail.product.price)}</span>
            </Col>
        </Row>

    )
};