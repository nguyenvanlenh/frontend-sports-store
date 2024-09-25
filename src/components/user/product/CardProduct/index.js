import React from "react";
import { Badge, Card } from "react-bootstrap";
import { formatCurrencyVN } from "../../../../utils/common";
import { Link } from "react-router-dom";
import PlaceholderImage from "../../../../data/img/main_thumbnail.png"
const cardProduct = {
    width: "250px",
    height: "310px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 0px 3px 0px",
    borderRadius: "10px",
    border: "none"
};

const imageThumbnail = {
    width: "100%",
    height: "200px",
    transition: "transform 0.4s ease-in-out",
};

const imageThumbnailHover = {
    ...imageThumbnail,
    transform: "scale(1.15)",
};

export const CardProduct = ({ product, isNew = false, isPopular = false }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <div className="d-flex justify-content-center mb-2 position-relative">
            <Card style={cardProduct}>
                <Link to={`/product/${product?.id}`}>
                    <Card.Img
                        loading="lazy"
                        variant="top"
                        data-src={PlaceholderImage}
                        src={product.thumbnailImage || PlaceholderImage}
                        style={isHovered ? imageThumbnailHover : imageThumbnail}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <Card.Body>
                        <Card.Title
                            className="text-center text-uppercase fs-6 fw-bold text-secondary"
                            title={product?.name}
                            style={{
                                height: "45px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                lineHeight: "1.2em",
                                maxHeight: "2.4em"
                            }}
                        >{product.name}
                        </Card.Title>
                        <Card.Text className="d-flex justify-content-center align-items-center flex-wrap">
                            {
                                (product.salePrice !== product.regularPrice) &&
                                <strong>
                                    <del className="text-secondary fs-6">{formatCurrencyVN(product.regularPrice)} </del>
                                </strong>
                            }
                            <strong className="text-danger ms-3 fs-5">
                                {formatCurrencyVN(product.salePrice)}
                            </strong>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
            {
                isNew && <Badge bg="danger" style={{
                    top: "2px",
                    left: 0,
                    zIndex: 1,
                    position: "absolute"
                }}>Hàng mới về</Badge>
            }
            {
                isPopular && <Badge bg="danger" style={{
                    top: "2px",
                    right: 0,
                    zIndex: 1,
                    position: "absolute"
                }}>Bán chạy</Badge>
            }
        </div>
    );
};