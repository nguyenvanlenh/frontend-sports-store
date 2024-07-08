import React from "react";
import { Card } from "react-bootstrap";
import ImageLiver from "../../../../data/img/liver.webp";
import { formatCurrencyVN } from "../../../../utils/common";


const grayTextStyle = {
    textDecoration: 'line-through',
    color: 'gray',
    fontWeight: 'bold'
};

const redTextStyle = {
    color: 'red',
    fontWeight: 'bold',
    fontSize: '19px'
};

export const CardProduct = () => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={ImageLiver} />
            <Card.Body>
                <Card.Title className="text-center">Áo Liverpool</Card.Title>
                <Card.Text className="d-flex justify-content-around align-items-center">
                    <span style={grayTextStyle}> {formatCurrencyVN(300000)} </span>
                    <span style={redTextStyle}>{formatCurrencyVN(250000)}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
