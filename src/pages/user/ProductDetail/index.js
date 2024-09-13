import { Col, Row } from "react-bootstrap"
import { ProductInfo } from "../../../components/user/product/ProductInfo"
import { ProductPresentation } from "../../../components/user/product/ProductPresentation"
import { ImagesProduct } from "../../../components/user/product/ImagesProduct"
import { useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { productService } from "../../../services/productService"
import { Loading } from "../../../components/common/Loading"
import { DisplayRatings } from "../../../components/user/product/DisplayRatings"

export const ProductDetail = () => {
    const { productId } = useParams();

    const fetchDataProductById = async (id) => {
        const res = await productService.getProductById(id);
        return res.data;
    };
    const {
        data: product,
        isLoading,
        isError,
        error
    } = useQuery(
        ["productDetail", productId],
        () => fetchDataProductById(productId),
        {
            staleTime: 10 * 60 * 1000,
            cacheTime: 10 * 60 * 1000,
        }
    );
    if (isLoading) return <Loading />;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <>
            <Row style={{
                minHeight: "200px",
            }}>
                <Col md={6} sm={12}>
                    <ImagesProduct listImages={product.listImages} />
                </Col>
                <Col md={6} sm={12}>
                    <ProductInfo product={product} />
                </Col>
            </Row>
            <Row>
                <ProductPresentation product={product} />
            </Row>

            <Row>
                <DisplayRatings productId={productId} />
            </Row>
        </>
    )
}