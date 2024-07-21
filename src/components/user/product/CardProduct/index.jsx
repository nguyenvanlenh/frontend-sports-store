import React from "react";
import { Card, Placeholder } from "react-bootstrap";
import PlaceholderImage from "../../../../data/img/placeholder.jpg";
import { formatCurrencyVN } from "../../../../utils/common";
import { Link } from "react-router-dom";

export const CardProduct = ({ product }) => {
    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Link to={`/product/${product?.id}`}>
                    <Card.Img variant="top" src={product.listImages[0]?.path || PlaceholderImage} />
                    <Card.Body>
                        <Card.Title className="text-center text-uppercase">{product.name}</Card.Title>
                        <Card.Text className="d-flex justify-content-center align-items-center flex-wrap">
                            <strong>
                                <del className="text-secondary fs-6">{formatCurrencyVN(product.price)} </del>
                            </strong>
                            <strong className="text-danger ms-3 fs-5">
                                {formatCurrencyVN(product.price)}
                            </strong>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </div>
    );
};

export const CardPlaceholder = () => {
    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={PlaceholderImage} />
                <Card.Body>
                    <Placeholder as={Card.Title} animation="glow" className="d-flex justify-content-center">
                        <Placeholder xs={6} />
                    </Placeholder>
                    <Placeholder as={Card.Text} animation="glow" className="d-flex justify-content-center align-items-center flex-wrap">
                        <Placeholder xs={4} className="me-3" /> <Placeholder xs={6} />
                    </Placeholder>
                </Card.Body>
            </Card>
        </div>
    )
}
