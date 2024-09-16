import { Container } from "react-bootstrap"
import { Header } from "../Header"
import { Outlet } from "react-router-dom"
import { Footer } from "../Footer"
import { ScrollToTop } from "../../../routes/ScrollToTop"
import { BreadcrumbComponent } from "../../../components/common/Breadcrumb"
import { DocumentTitle } from "../../../components/common/DocumentTitle"

export const UserLayout = () => {
    return (
        <>
            <DocumentTitle />
            <ScrollToTop />
            <Header />
            <BreadcrumbComponent />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
    )
}