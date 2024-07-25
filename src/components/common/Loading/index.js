import { Spinner } from "react-bootstrap"

export const Loading = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "100vh",
                width: "100%",
            }}>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="secondary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
        </div>
    )
}