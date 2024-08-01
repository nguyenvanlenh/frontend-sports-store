import React from "react";
import { Card } from "react-bootstrap";
import ImageSlide1 from "../../../../data/img/slideshow.webp";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { brandFilter, clearFilters } from "../../../../redux/filterSlice";

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

export const CardImageProduct = ({ brand }) => {
    const dispatch = useDispatch();

    const handleOnclick = () => {
        dispatch(clearFilters())
        dispatch(brandFilter(brand.id))
    }
    return (
        <Card style={cardStyle}>
            <Link to={"/list-products"} onClick={handleOnclick}>
                <Card.Img loading="lazy" variant="top" src={ImageSlide1} />
                <div style={textStyle}>{brand.name}</div>
            </Link>
        </Card>
    );
};
