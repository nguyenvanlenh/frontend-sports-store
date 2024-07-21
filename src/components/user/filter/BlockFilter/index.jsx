import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const BlockFilter = ({ name, items }) => {
    return (
        <>
            <Row className="text-uppercase mb-2"><strong>{name}</strong></Row>
            <Row>
                {items.map((item, idx) => (
                    <Item key={idx} item={item} />
                ))}
            </Row>
        </>
    );
};

const Item = ({ item }) => {
    return (
        <Col xs={6}>
            <Form>
                <Form.Group className="mb-3" controlId={`formBasicCheckbox-${item.id}`}>
                    <Form.Check
                        type="checkbox"
                        id={`${item.name}-checkbox`}
                        label={item.name}
                        className="text-secondary"
                    />
                </Form.Group>
            </Form>
        </Col>
    );
};
