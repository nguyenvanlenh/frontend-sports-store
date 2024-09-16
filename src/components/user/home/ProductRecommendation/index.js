import { useQuery } from "react-query";
import { RecommendationList } from "../RecommendationList";
import { Spinner } from "react-bootstrap";

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
            <div className="d-flex flex-wrap justify-content-center align-items-center p-5">
                <Spinner animation="border" variant="danger" />
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
