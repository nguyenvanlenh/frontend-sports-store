import React from "react";
import { Card, Placeholder } from "react-bootstrap";
import ImageLiver from "../../../../data/img/liver.webp";
import { formatCurrencyVN } from "../../../../utils/common";
import { Link } from "react-router-dom";

export const CardProduct = () => {
    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Link to={"/product/1"}>
                    <Card.Img variant="top" src={ImageLiver} />
                    <Card.Body>
                        <Card.Title className="text-center text-uppercase">Áo Liverpool</Card.Title>
                        <Card.Text className="d-flex justify-content-center align-items-center flex-wrap">
                            <strong>
                                <del className="text-secondary fs-6">{formatCurrencyVN(300000)} </del>
                            </strong>
                            <strong className="text-danger ms-3 fs-5">
                                {formatCurrencyVN(250000)}
                            </strong>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </div>
    );
};

const CardPlaceholder = () => {
    return (
        <div className="d-flex justify-content-center">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={ImageLiver} />
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
