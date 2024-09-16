import React from 'react';
import { Carousel, Col, Image, Row } from 'react-bootstrap';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
const listItemStyle = {
    display: "flex",
    justifyContent: "center",
};

const imageStyle = {
    height: "150px",
    width: "100px",
    objectFit: "cover",
    cursor: 'pointer',
};

const carouselImageStyle = {
    height: '400px',
    objectFit: 'cover',
    width: '100%',
};

export const ImagesProduct = ({ listImages }) => {
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
                                        loading="lazy"
                                        className="d-block w-100"
                                        src={image.path}
                                        style={carouselImageStyle}
                                    /></Zoom>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <ul className="d-flex list-unstyled justify-content-around mt-2">
                    {listImages.map((item, index) => (
                        <li
                            key={index}
                            style={index < listImages.length - 1 ? listItemStyle : {}}>
                            <Image
                                src={item.path}
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
