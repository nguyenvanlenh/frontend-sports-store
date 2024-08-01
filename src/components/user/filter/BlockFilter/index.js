import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export const BlockFilter = ({ name, items, onChange, selectedItems }) => {
    return (
        <>
            <Row className="text-uppercase mb-2"><strong>{name}</strong></Row>
            <Row>
                {items.map((item, idx) => (
                    <Item key={idx} item={item} onChange={onChange} isChecked={selectedItems.includes(item.id)} />
                ))}
            </Row>
        </>
    );
};

const Item = ({ item, onChange, isChecked }) => {
    const handleChange = () => {
        onChange(item.id);
    };

    return (
        <Col xs={6}>
            <Form>
                <Form.Group className="mb-3" controlId={`formCheckbox-${item.id}`}>
                    <Form.Check
                        type="checkbox"
                        id={`${item.name}-checkbox`}
                        label={item.name}
                        className="text-secondary"
                        checked={isChecked}
                        onChange={handleChange}
                    />
                </Form.Group>
            </Form>
        </Col>
    );
};
