import React from "react";
import { Card } from "react-bootstrap";
import ImageSlide1 from "../../../../data/img/slideshow.webp";
import { Link } from "react-router-dom";

const cardStyle = {
    position: 'relative',
};

const textStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '5px',
    borderRadius: '5px',
};

export const CardImageProduct = ({ category }) => {
    return (
        <Card style={cardStyle}>
            <Link to={"/list-products"}>
                <Card.Img variant="top" src={ImageSlide1} />
                <div style={textStyle}>{category.name}</div>
            </Link>
        </Card>
    );
};
