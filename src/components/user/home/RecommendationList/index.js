import { Col, Row } from "react-bootstrap";
import { CardImageProduct } from "../../product/CardImageProduct";
import { CardProduct } from "../../product/CardProduct";

export const RecommendationList = ({ title, type, data }) => {
    const renderProductCard = (idx, item) => {
        if (type === "brand") {
            return <CardImageProduct key={idx} brand={item} />;
        } else {
            return <CardProduct key={idx} product={item} />;
        }
    };

    return (
        <>
            <h2 className="text-center mt-5 mb-3">{title.toUpperCase()}</h2>
            <Row className="g-3">
                {data?.map((item, idx) => (
                    <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                        {renderProductCard(idx, item)}
                    </Col>
                ))}
            </Row>
        </>
    );
};