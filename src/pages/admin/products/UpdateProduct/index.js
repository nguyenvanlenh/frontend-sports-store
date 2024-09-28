import { useLocation } from "react-router-dom";
import { productService } from "../../../../services/productService";
import { Loading } from "../../../../components/common/Loading";
import React from "react";
import { ProductForm } from "../../../../components/admin/product/ProductForm";

export const UpdateProduct = () => {
    const location = useLocation();

    const productId = location.state?.productId || 0;

    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchDataProduct = async () => {
            try {
                setLoading(true);
                const response = await productService.getProductById(productId);
                setProduct(response?.data);
            } catch (err) {
                setError(err.message || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };
        fetchDataProduct();
    }, [productId]);

    if (loading) return <Loading />;
    if (error) return <div>Error loading product: {error}</div>;
    return (
        <>
            <ProductForm product={product} />
        </>
    )
}