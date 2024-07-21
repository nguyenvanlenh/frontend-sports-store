import { useQuery } from "react-query";
import { CardPlaceholder } from "../../product/CardProduct";
import { RecommendationList } from "../RecommendationList";
import { Col } from "react-bootstrap";

export const ProductRecommendation = ({ title, type, queryKey, fetchFunction }) => {
    const { data: products, isLoading, isError, error } = useQuery(
        queryKey,
        fetchFunction,
        {
            staleTime: 5 * 60 * 1000,
            cacheTime: 10 * 60 * 1000
        }
    );

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

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <RecommendationList
            title={title}
            type={type}
            data={products}
        />
    );
};
