import { Badge, Button, Col, Dropdown, Image, Row, Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import UserAvatar from "../../../../data/img/user_icon.webp"
import { PaginationComponent } from "../../../../components/common/Pagination"
import { useFetchData } from "../../../../hooks/useFetchData"
import { userService } from "../../../../services/userService"
import React from "react"
import { Loading } from "../../../../components/common/Loading"

export const UsersManagement = () => {
    return (
        <>
            <UsersManagementHeader />
            <hr />
            <UsersManagementData />
        </>
    )
}
const UsersManagementHeader = () => {
    return (
        <div
            className="position-sticky bg-white pb-1"
            style={{
                top: 0,
                zIndex: 1000
            }}>
            <h1 className="fs-3">Quản lý người dùng</h1>
            <Row className="align-items-center">
                <Col><span>Tất cả (300)</span></Col>
                <Col><span>Công khai (300)</span></Col>
                <Col><span>Nội bộ (0)</span></Col>
                <Col><span>Khóa (5)</span></Col>
            </Row>
            <Row className="mt-3">
                <Col lg={2} sm={4} xs={4}>
                    <Link className="btn btn-success" to="/admin/create-product" >+ Thêm vai trò</Link>
                </Col>
                <Col lg={2} sm={4} xs={4}>
                    <Link className="btn btn-success" to="/admin/create-product" >+ Thêm quyền</Link>
                </Col>
                <Col lg={2} sm={4} xs={4}>
                    <Button variant="outline-danger">Export</Button>
                </Col>
            </Row>
        </div>
    )
}
const UsersManagementData = () => {
    const [currentPage, setCurrentPage] = React.useState(() => 0);
    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch
    } = useFetchData("usersManagement", userService.getAllUsers);
    const totalPage = users?.totalPage || 0;

    React.useEffect(() => {
        refetch();
    }, [currentPage, refetch]);

    const handleChangePage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPage) {
            setCurrentPage(pageNumber);
        }
    };
    const handleFullname = (firstName = "", lastName = "", username) => {
        if (firstName || lastName) {
            return firstName + " " + lastName;
        }
        return username;
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
                            <th>Email</th>
                            <th>Quyền</th>
                            <th >Trạng thái</th>
                            <th className="col-1">Sửa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.content?.map((user) => {
                                return (
                                    <tr key={user.id} className="align-middle">
                                        <td className="col-1">{user.id}</td>
                                        <td>
                                            <Image
                                                src={user.avatar || UserAvatar}
                                                loading="lazy"
                                                thumbnail
                                                width="60"
                                            />
                                        </td>
                                        <td>{handleFullname(user.firstName, user.lastName, user.username)}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.listRoles?.map((role) => {
                                                    return (
                                                        <Badge bg="warning" className="me-1">{role.name}</Badge>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            <span className={`bg-${true ? "success" : "danger"} text-white p-2 rounded`}>
                                                {true ? "Công khai" : "Ẩn"}
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
                </Table>
            )}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPage}
                onPageChange={handleChangePage}
            />
        </>
    )
}