import { useQuery } from "react-query";
import { RecommendationList } from "../RecommendationList";
import { brandService } from "../../../../services/brandService";
import { Spinner } from "react-bootstrap";

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
        <RecommendationList
            title="Loại hãng phổ biến"
            type="brand"
            data={brands}
        />
    );
}