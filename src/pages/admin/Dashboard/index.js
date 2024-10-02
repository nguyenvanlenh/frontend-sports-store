import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useFetchData } from '../../../hooks/useFetchData';
import { userService } from '../../../services/userService';
import { formatDateTimeVN } from '../../../utils/common';
import { FaUserGroup } from "react-icons/fa6";
import { TbBrandSnowflake } from "react-icons/tb";
import { BsCartCheckFill, BsBoxSeamFill } from "react-icons/bs";
import { brandService } from '../../../services/brandService';
import { orderService } from '../../../services/orderService';
import { productService } from '../../../services/productService';
// Data for charts
const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 1)',
        },
    ],
};

const barData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const doughnutData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            label: 'Population',
            data: [300, 50, 100],
            backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
        },
    ],
};

const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
        {
            label: 'Revenue',
            data: [300, 50, 100, 40, 120],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


export const Dashboard = () => {
    const page = 0, size = 5;
    const {
        data: newUsers,
        isLoadingUser,
        isErrorUser,
        errorUser,
    } = useFetchData("getNewUsers", () => userService.getAllUsers(page, size));
    const {
        data: products,
        isLoadingProduct,
        isErrorProduct,
        errorProduct,
    } = useFetchData("getProducts", () => productService.getAllProducts(page, size));
    const {
        data: orders,
        isLoadingOrder,
        isErrorOrder,
        errorOrder,
    } = useFetchData("getOrders", () => orderService.getOrders(page, size));
    const {
        data: brands,
        isLoadingBrand,
        isErrorBrand,
        errorBrand,
    } = useFetchData("getBrands", () => brandService.getAllBrands());
    if (isLoadingUser || isLoadingBrand || isLoadingProduct || isLoadingOrder) {
        return <div>Loading...</div>;
    }

    if (isErrorUser || isErrorBrand || isErrorOrder || isErrorProduct) {
        return (
            <div>
                {isErrorUser && <div>Error loading users: {errorUser.message}</div>}
                {isErrorBrand && <div>Error loading brands: {errorBrand.message}</div>}
                {isErrorOrder && <div>Error loading orders: {errorOrder.message}</div>}
                {isErrorProduct && <div>Error loading products: {errorProduct.message}</div>}
            </div>
        );
    }

    return (
        <Container fluid>
            <h2 className="my-4">Dashboard</h2>
            <Row className="align-items-center g-3 h-100 align-content-between my-4">
                <Col lg={3} md={3} sm={4} xs={6}>
                    <div className="d-flex align-items-center"><span className="fs-1 lh-1 text-primary"><BsBoxSeamFill /></span>
                        <div className="ms-2">
                            <div className="d-flex align-items-center">
                                <h3 className="mb-0 me-2">{products?.totalElement}</h3><span className="fs-7 fw-semibold text-body">Sản phẩm</span>
                            </div>
                            <p className="text-body-secondary fs-9 mb-0">Trong hệ thống</p>
                        </div>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={4} xs={6}>
                    <div className="d-flex align-items-center"><span className="fs-1 lh-1 text-success"><FaUserGroup /></span>
                        <div className="ms-2">
                            <div className="d-flex align-items-center">
                                <h3 className="mb-0 me-2">{newUsers?.totalElement}</h3><span className="fs-7 fw-semibold text-body">Khách hàng</span>
                            </div>
                            <p className="text-body-secondary fs-9 mb-0">Đã đăng ký</p>
                        </div>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={4} xs={6}>
                    <div className="d-flex align-items-center"><span className="fs-1 lh-1 text-danger"><BsCartCheckFill /></span>
                        <div className="ms-2">
                            <div className="d-flex align-items-center">
                                <h3 className="mb-0 me-2">{orders?.totalElement}</h3><span className="fs-7 fw-semibold text-body">Đơn hàng</span>
                            </div>
                            <p className="text-body-secondary fs-9 mb-0">Đã được đặt</p>
                        </div>
                    </div>
                </Col>
                <Col lg={3} md={3} sm={4} xs={6}>
                    <div className="d-flex align-items-center">
                        <span className="fs-1 lh-1 text-info"><TbBrandSnowflake /></span>
                        <div className="ms-2">
                            <div className="d-flex align-items-center">
                                <h3 className="mb-0 me-2">{brands?.length}</h3><span className="fs-7 fw-semibold text-body">Thương hiệu</span>
                            </div>
                            <p className="text-body-secondary fs-9 mb-0">Đang kinh doanh</p>
                        </div>
                    </div>
                </Col>
            </Row>
            <hr />
            <Row className="mb-4">
                <Col lg={6} md={6} xs={6} className="mb-5 d-flex justify-content-center">
                    <Line data={lineData} />
                </Col>
                <Col lg={6} md={6} xs={6} className="mb-5 d-flex justify-content-center">
                    <Bar data={barData} />
                </Col>
                <Col lg={6} md={6} xs={6} className="mb-5 d-flex justify-content-center">
                    <Doughnut data={doughnutData} />
                </Col>
                <Col lg={6} md={6} xs={6} className="mb-5 d-flex justify-content-center">
                    <Pie data={pieData} />
                </Col>
            </Row>
            <hr />
            <Row className="mb-4">
                <Col md={12}>
                    <h3>Người dùng mới</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên đăng nhập</th>
                                <th>Tên người dùng</th>
                                <th>Email</th>
                                <th>Ngày đăng ký</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(newUsers?.content || [])?.map(user => (
                                <tr key={user.id}>
                                    <td className="text-primary">#{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td>{formatDateTimeVN(user.createdOn)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};
