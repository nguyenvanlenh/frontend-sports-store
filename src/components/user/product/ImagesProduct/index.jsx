import React from 'react';
import { Carousel, Col, Image, Row, Modal } from 'react-bootstrap';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import ImageLiver1 from "../../../../data/img/liver5.jpg";
import ImageLiver2 from "../../../../data/img/liver2.webp";
import ImageLiver3 from "../../../../data/img/liver3.jpg";
import ImageLiver4 from "../../../../data/img/liver4.jpg";
import ImageLiver5 from "../../../../data/img/liver4.jpeg";

const listItemStyle = {
    marginRight: '7px',
};

const imageStyle = {
    cursor: 'pointer',
};

const carouselImageStyle = {
    height: '400px',
    objectFit: 'cover',
    width: '100%',
};

const listImages = [
    { imageUrl: ImageLiver2, altText: 'image select size' },
    { imageUrl: ImageLiver1, altText: 'image select size' },
    { imageUrl: ImageLiver3, altText: 'image select size' },
    { imageUrl: ImageLiver4, altText: 'image select size' },
    { imageUrl: ImageLiver5, altText: 'image select size' },
];

export const ImagesProduct = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleSelect = (selectedIndex) => {
        setSelectedIndex(selectedIndex);
    };

    const handleImageClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <>
            <Row>
                <Col md={12}>
                    <Carousel
                        activeIndex={selectedIndex}
                        onSelect={handleSelect}
                        interval={null}
                        data-bs-theme="light">
                        {listImages.map((image, index) => (
                            <Carousel.Item key={index}>
                                <Zoom zoomMargin={10}>
                                    <Image
                                        className="d-block w-100"
                                        src={image.imageUrl}
                                        style={carouselImageStyle}
                                    /></Zoom>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <ul className="d-flex list-unstyled">
                    {listImages.map((item, index) => (
                        <li
                            key={index}
                            style={index < listImages.length - 1 ? listItemStyle : {}}>
                            <Image
                                src={item.imageUrl}
                                thumbnail
                                onClick={() => handleImageClick(index)}
                                style={imageStyle}
                            />
                        </li>
                    ))}
                </ul>
            </Row>
        </>
    );
};
