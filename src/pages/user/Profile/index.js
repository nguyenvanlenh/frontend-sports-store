import { Col, Row } from "react-bootstrap"
import { UserSideBar } from "../../../components/user/profile/UserSideBar"
import { Outlet } from "react-router-dom"

export const Profile = () => {
    return (
        <>
            <Row>
                <Col lg={2} xs={2}>
                    <UserSideBar />
                </Col>
                <Col lg={10} xs={10}>
                    <div className="mt-4 ms-2">
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </>
    )
} 