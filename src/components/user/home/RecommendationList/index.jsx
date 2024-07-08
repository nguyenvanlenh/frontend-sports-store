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
            <Row xs={1} md={3} lg={4} className="g-3">
                {Array.from({ length: 8 }).map((_, idx) => (
                    <Col key={idx}>
                        {renderProductCard(idx)}
                    </Col>
                ))}
            </Row>
        </>
    );
};