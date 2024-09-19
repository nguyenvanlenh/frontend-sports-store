import { Button, Col, Dropdown, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useFetchData } from "../../../../hooks/useFetchData"
import { categoryService } from "../../../../services/categoryService"
import { Loading } from "../../../../components/common/Loading"

export const CategoriesManagement = () => {
    return (
        <>
            <CategoriesManagementHeader />
            <hr />
            <CategoriesManagementData />
        </>
    )
}
const CategoriesManagementHeader = () => {
    return (
        <div
            className="position-sticky bg-white pb-1"
            style={{
                top: 0,
                zIndex: 1000
            }}>
            <h1 className="fs-3">Quản lý danh mục</h1>
            <Row className="align-items-center">
                <Col><span>Tất cả (10)</span></Col>
                <Col><span>Công khai (8)</span></Col>
                <Col><span>Nội bộ (0)</span></Col>
                <Col><span>Khóa (2)</span></Col>
            </Row>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <Link className="btn btn-success" to="/admin/create-product" >+ Thêm danh mục</Link>
                </Col>
                <Col lg={2} xs={4}>
                    <Button variant="outline-danger">Export</Button>
                </Col>
            </Row>
        </div>
    )
}
const CategoriesManagementData = () => {
    const {
        data: categories,
        isLoading,
        isError,
        error
    } = useFetchData("categories", categoryService.getAllCategories);
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
                            <th>Tên</th>
                            <th className="col-md-2">Trạng thái</th>
                            <th className="col-1">Sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories?.map((category) => {
                                return (
                                    <tr className="align-middle">
                                        <td className="col-1">{category.id}</td>
                                        <td>{category.name}</td>
                                        <td className="col-md-2">
                                            <span className={`bg-${category.isActive ? 'success' : 'danger'} text-white p-2 rounded`}>
                                                {category.isActive ? 'Công khai' : 'Ẩn'}
                                            </span>
                                        </td>
                                        <td className="col-1">
                                            <Dropdown drop="down-centered">
                                                <Dropdown.Toggle variant="Light">
                                                    <span>...</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item className="text-secondary">Sửa</Dropdown.Item>
                                                    <Dropdown.Item className="text-secondary">Khóa</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>)}
        </>
    )
}