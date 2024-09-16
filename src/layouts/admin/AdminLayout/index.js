import { Col, Container, Row } from "react-bootstrap"
import { SideBar } from "../SideBar"
import { Outlet } from "react-router-dom"

export const AdminLayout = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={2} xs={2}>
                    <SideBar />
                </Col>
                <Col md={10} xs={10}>
                    <Outlet />
                </Col>
            </Row>

        </Container>
    )
}