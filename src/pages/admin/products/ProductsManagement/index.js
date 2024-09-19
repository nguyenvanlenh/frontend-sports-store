import { Button, Col, Dropdown, Image, Row, Table } from "react-bootstrap"
import { formatCurrencyVN } from "../../../../utils/common"
import ImageDemo from "../../../../data/img/liver.webp"
import { PaginationComponent } from "../../../../components/common/Pagination"
import { Link } from "react-router-dom"
import { useFetchData } from "../../../../hooks/useFetchData"
import { productService } from "../../../../services/productService"
import React from "react"
import { Loading } from "../../../../components/common/Loading"

export const ProductsManagement = () => {

    return (
        <>
            <Header />
            <ProductsData />
        </>
    )
}
const Header = () => {

    return (
        <div
            className="position-sticky bg-white pb-1"
            style={{
                top: 0,
                zIndex: 1000
            }}>
            <h1 className="fs-3">Quản lý sản phẩm</h1>
            <Row className="align-items-center">
                <Col><span>Tất cả (300)</span></Col>
                <Col><span>Công khai (300)</span></Col>
                <Col><span>Nội bộ (0)</span></Col>
                <Col><span>Nháp (0)</span></Col>
            </Row>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <Link className="btn btn-success" to="/admin/create-product" >+ Thêm sản phẩm</Link>
                </Col>
                <Col lg={2} xs={4}>
                    <Button variant="white">Export</Button>
                </Col>
            </Row>


        </div>
    )
}
const ProductsData = () => {
    const [currentPage, setCurrentPage] = React.useState(() => 0);

    const {
        data: products,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("getProducts", () =>
        productService.getAllProducts(currentPage, 10, "lastMofifiedOn", "desc"));

    const totalPage = products?.totalPage || 0;

    React.useEffect(() => {
        refetch();
    }, [currentPage, refetch]);

    const handleChangePage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPage) {
            setCurrentPage(pageNumber);
        }
    };

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : isError ? (
                <div>Error: {error.message}</div>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th className="col-1">#</th>
                            <th></th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>Hãng</th>
                            <th>Trạng thái</th>
                            <th className="col-1">Sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.content?.map((product, index) => (
                            <tr key={product.id} className="align-middle">
                                <td className="col-1">{product.id}</td>
                                <td>
                                    <Image
                                        src={product.thumbnailImage || ImageDemo}
                                        loading="lazy"
                                        thumbnail
                                        width="60"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>{formatCurrencyVN(product.salePrice)}</td>
                                <td>{product.brand.name}</td>
                                <td>
                                    <span className={`bg-${product.isActive ? 'success' : 'danger'} text-white p-2 rounded`}>
                                        {product.isActive ? 'Công khai' : 'Ẩn'}
                                    </span>
                                </td>
                                <td className="col-1">
                                    <Dropdown drop="down-centered">
                                        <Dropdown.Toggle variant="Light">
                                            <span>...</span>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item className="text-secondary">Sửa</Dropdown.Item>
                                            <Dropdown.Item className="text-secondary">Xóa</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPage}
                onPageChange={handleChangePage}
            />
        </>
    );
};
