import { Col, Container, Row } from "react-bootstrap"
import { SideBar } from "../SideBar"
import { Outlet } from "react-router-dom"
import { ScrollToTop } from "../../../routes/ScrollToTop"

export const AdminLayout = () => {
    return (<>
        <ScrollToTop />
        <Container fluid>
            <Row>
                <Col md={2} xs={2}>
                    <SideBar />
                </Col>
                <Col md={10} xs={10}>
                    <div className="mt-5">
                        <Outlet />
                    </div>
                </Col>
            </Row>

        </Container>
    </>
    )
}