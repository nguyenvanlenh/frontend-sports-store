import { productService } from "../../../../services/productService";
import { ProductRecommendation } from "../ProductRecommendation";

export const PopularFootballJerseys = () => {
    const fetchFunction = () =>
        productService.getAllProducts(0, 8, "lastMofifiedOn", "desc")
            .then(res => res?.data?.content);

    return (
        <ProductRecommendation
            title="Sản phẩm mới"
            type="apparel"
            queryKey="newFootballApparel"
            fetchFunction={fetchFunction}
        />
    );
}