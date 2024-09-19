import { Button, Col, Dropdown, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useFetchData } from "../../../../hooks/useFetchData";
import { sizeService } from "../../../../services/sizeService";
import { Loading } from "../../../../components/common/Loading";

export const SizesManagement = () => {
    return (
        <>
            <SizesManagementHeader />
            <hr />
            <SizesManagementData />
        </>
    )
}
const SizesManagementHeader = () => {
    return (
        <div
            className="position-sticky bg-white pb-1"
            style={{
                top: 0,
                zIndex: 1000
            }}>
            <h1 className="fs-3">Quản lý kích cỡ</h1>
            <Row className="align-items-center">
                <Col><span>Tất cả (10)</span></Col>
                <Col><span>Công khai (8)</span></Col>
                <Col><span>Nội bộ (0)</span></Col>
                <Col><span>Khóa (2)</span></Col>
            </Row>
            <Row className="mt-3">
                <Col lg={2} xs={4}>
                    <Link className="btn btn-success" to="/admin/create-product" >+ Thêm kích cỡ</Link>
                </Col>
                <Col lg={2} xs={4}>
                    <Button variant="outline-danger">Export</Button>
                </Col>
            </Row>
        </div>
    )
}
const SizesManagementData = () => {
    const {
        data: sizes,
        isLoading,
        isError,
        error
    } = useFetchData("sizes", sizeService.getAllSizes);
    console.log(sizes);

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
                            sizes?.map((size) => {
                                return (
                                    <tr className="align-middle">
                                        <td className="col-1">{size.id}</td>
                                        <td>{size.name}</td>
                                        <td className="col-md-2">
                                            <span className={`bg-${size.isActive ? 'success' : 'danger'} text-white p-2 rounded`}>
                                                {size.isActive ? 'Công khai' : 'Ẩn'}
                                            </span>
                                        </td>
                                        <td>
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