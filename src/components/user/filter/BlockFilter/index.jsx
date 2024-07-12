import { Col, Form, Row } from "react-bootstrap"

export const BlockFilter = () => {
    return (
        <>
            <Row className="text-uppercase mb-2"><strong>Thương hiệu</strong></Row>
            <Row>
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </Row>
        </>
    )
}

const Item = () => {
    return (
        <Col xs={6}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                        type="checkbox"
                        id="nike-checkbox"
                        label="Nike"
                        className="text-secondary"
                    />
                </Form.Group>
            </Form>
        </Col>
    )
}