import React from "react";
import { Carousel } from "react-bootstrap";
import ImageSlide1 from "../../../../data/img/banner1.webp";
import ImageSlide2 from "../../../../data/img/banner2.webp";
import ImageSlide3 from "../../../../data/img/banner3.webp";
import ImageSlide4 from "../../../../data/img/banner4.webp";
import ImageSlide5 from "../../../../data/img/banner5.webp";

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
                <img className="d-block w-100" src={ImageSlide3} alt="Third slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={ImageSlide4} alt="Four slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={ImageSlide5} alt="Five slide" />
            </Carousel.Item>
        </Carousel>
    );
};
