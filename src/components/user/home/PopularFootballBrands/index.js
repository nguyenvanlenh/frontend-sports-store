import { useQuery } from "react-query";
import { brandService } from "../../../../services/brandService";
import { Col, Row, Spinner } from "react-bootstrap";
import { CardImageProduct } from "../../product/CardImageProduct";

export const PopularFootballBrands = () => {

    const fetchData = () => {
        return brandService.getAllBrands()
            .then(res => res.data)
    };

    const {
        data: brands,
        isLoading: isLoadingBrands,
    } = useQuery(
        "brandHome",
        fetchData, {
        staleTime: 1800000,
        refetchInterval: 1800000,
        onError: (error) => {
            console.error("Error fetching brand home:", error);
        }
    });
    if (isLoadingBrands) {
        return (
            <div className="d-flex flex-wrap justify-content-center align-items-center p-5">
                <Spinner animation="border" variant="danger" />
            </div>
        );
    }


    return (
        <>
            <h2 className="text-center mt-5 mb-3 fw-bold text-uppercase">Hãng phổ biến</h2>
            <Row className="g-3">
                {brands?.map((item, idx) => (
                    <Col key={idx} xs={12} sm={6} md={4} lg={3}>
                        <CardImageProduct key={idx} brand={item} />
                    </Col>
                ))}
            </Row>
        </>
    );
}