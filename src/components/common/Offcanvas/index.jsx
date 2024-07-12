import { Offcanvas } from "react-bootstrap"

export const OffcanvasComponent = ({ children, show, handleClose, title }) => {
    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            name="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {children}
            </Offcanvas.Body>
        </Offcanvas>
    )
}