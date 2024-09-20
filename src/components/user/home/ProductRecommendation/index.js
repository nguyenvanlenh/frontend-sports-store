import { useQuery } from "react-query";
import { Spinner, Col, Row } from "react-bootstrap";
import { CardImageProduct } from "../../product/CardImageProduct";
import { CardProduct } from "../../product/CardProduct";

export const ProductRecommendation = ({ title, type, queryKey, fetchFunction }) => {
    const { data: products, isLoading, isError, error } = useQuery(
        queryKey,
        fetchFunction,
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000
        }
    );
    const titleLable = {
        new: "Sản phẩm mới",
        popular: "Sản phẩm phổ biến"
    }

    if (isLoading) {
        return (
            <div className="d-flex flex-wrap justify-content-center align-items-center p-5">
                <Spinner animation="border" variant="danger" />
            </div>
        );
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <h2 className="text-center mt-5 mb-3 fw-bold text-uppercase">{(titleLable[title])}</h2>
            <Row className="g-3">
                {products?.map((item, idx) => (
                    <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                        <CardProduct
                            product={item}
                            isNew={title === "new"}
                            isPopular={title === "popular"}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};
