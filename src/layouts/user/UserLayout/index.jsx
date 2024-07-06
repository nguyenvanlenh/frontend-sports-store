import { Container } from "react-bootstrap"
import { Header } from "../Header"
import { Outlet } from "react-router-dom"
import { Footer } from "../Footer"

export const UserLayout = () => {
    return (
        <>
            <Header />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}