import React from "react";
import { productService } from "../../../../services/productService";
import { ProductRecommendation } from "../ProductRecommendation";

export const NewFootballApparel = () => {
    const fetchFunction = () =>
        productService.getAllProducts(0, 8, "lastModifiedOn", "desc")
            .then(res => res?.data?.content);

    return (
        <ProductRecommendation
            title="new"
            type="apparel"
            queryKey="newFootballApparel"
            fetchFunction={fetchFunction}
        />
    );
}
