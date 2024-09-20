import { productService } from "../../../../services/productService";
import { ProductRecommendation } from "../ProductRecommendation";

export const PopularFootballJerseys = () => {
    const fetchFunction = () =>
        productService.getAllProducts(0, 8, "salePrice", "desc")
            .then(res => res?.data?.content);

    return (
        <ProductRecommendation
            title="popular"
            type="jersey"
            queryKey="popularFootballJerseys"
            fetchFunction={fetchFunction}
        />
    );
}