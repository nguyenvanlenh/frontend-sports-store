import React from "react";
import { Card } from "react-bootstrap";
import PlaceholderImage from "../../../../data/img/placeholder.jpg";
import { formatCurrencyVN } from "../../../../utils/common";
import { Link } from "react-router-dom";

const cardProduct = {
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: "10px",
    border: "0px solid white"
};

const imageThumnail = {
    width: "100%",
    height: "200px",
    transition: "transform 0.4s ease-in-out",
};

const imageThumnailHover = {
    ...imageThumnail,
    transform: "scale(1.1)",
};

export const CardProduct = ({ product }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div className="d-flex justify-content-center">
            <Card style={cardProduct}>
                <Link to={`/product/${product?.id}`}>
                    <Card.Img
                        loading="lazy"
                        variant="top"
                        data-src={PlaceholderImage}
                        src={product.listImages[0]?.path || PlaceholderImage}
                        style={isHovered ? imageThumnailHover : imageThumnail}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
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