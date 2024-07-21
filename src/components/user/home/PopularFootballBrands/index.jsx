import { useQuery } from "react-query";
import { RecommendationList } from "../RecommendationList";
import { brandService } from "../../../../services/brandService";

export const PopularFootballBrands = () => {

    const fetchData = () => {
        return brandService.getAllBrands()
            .then(res => res.data)
    };

    const {
        data: brands,
        isLoading: isLoadingBrands,
        isError: isErrorBrands,
        error: errorBrands
    } = useQuery(
        "brandHome",
        fetchData, {
        staleTime: 1800000,
        refetchInterval: 1800000,
        onError: (error) => {
            console.error("Error fetching brand home:", error);
        }
    });

    return (
        <RecommendationList
            title="Loại hãng phổ biến"
            type="brand"
            data={brands}
        />
    );
}