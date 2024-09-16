import React from "react";
import { Carousel } from "react-bootstrap";
import ImageSlide1 from "../../../../data/img/slideshow.webp";
import ImageSlide2 from "../../../../data/img/banner2.webp";
import ImageSlide4 from "../../../../data/img/banner4.webp";

export const SlideShow = () => {
    return (
        <Carousel interval={3000} pause={false} data-bs-theme="light">
            <Carousel.Item>
                <img className="d-block w-100" src={ImageSlide1} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={ImageSlide2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={ImageSlide4} alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
};
