import { Col, Row } from "react-bootstrap";
import { CardImageProduct } from "../../product/CardImageProduct";
import { CardProduct } from "../../product/CardProduct";

export const RecommendationList = ({ title, type }) => {
    const renderProductCard = (idx) => {
        if (type === "brand") {
            return <CardImageProduct key={idx} />;
        } else {
            return <CardProduct key={idx} />;
        }
    };

    return (
        <>
            <h2 className="text-center mt-5 mb-3">{title.toUpperCase()}</h2>
            <Row className="g-3">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                        {renderProductCard(idx)}
                    </Col>
                ))}
            </Row>
        </>
    );
};