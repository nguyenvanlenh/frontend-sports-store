import { Container } from "react-bootstrap"
import { Header } from "../Header"
import { Outlet } from "react-router-dom"
import { Footer } from "../Footer"
import { ScrollToTop } from "../../../routes/ScrollToTop"

export const UserLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Header />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}