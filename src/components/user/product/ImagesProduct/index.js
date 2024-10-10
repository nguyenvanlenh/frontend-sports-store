import React from 'react';
import { Carousel, Col, Image, Row } from 'react-bootstrap';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { MAXIMUM_NUMBER_IMAGE } from '../../../../utils/constant';

const listItemStyle = {
    display: "flex",
    justifyContent: "center",
};

const imageStyle = {
    height: "160px",
    width: "100px",
    objectFit: "cover",
    cursor: "pointer",
};

const carouselImageStyle = {
    height: "400px",
    objectFit: "cover",
    width: "100%",
};

export const ImagesProduct = ({ listImages }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    React.useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: "#carousel-gallery",
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        const displayedImages = listImages.slice(0, MAXIMUM_NUMBER_IMAGE);

        const galleryElement = document.querySelector("#carousel-gallery");
        const anchorElements = galleryElement?.querySelectorAll("a");
        if (anchorElements?.length > displayedImages.length) {
            [...anchorElements].slice(displayedImages.length).forEach(anchor => anchor.remove());
        }

        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, [listImages]);

    const handleSelect = (selectedIndex) => {
        setSelectedIndex(selectedIndex);
    };

    const handleImageClick = (index) => {
        setSelectedIndex(index);
    };

    const displayedImages = listImages?.slice(0, MAXIMUM_NUMBER_IMAGE) || [];
    return (
        <>
            <Row>
                <Col md={12}>
                    <Carousel
                        activeIndex={selectedIndex}
                        onSelect={handleSelect}
                        interval={null}
                        id="carousel-gallery"
                        data-bs-theme="light"
                    >
                        {displayedImages.map((image) => (
                            <Carousel.Item key={image.id}>
                                <a
                                    href={image.path}
                                    data-pswp-width="1000"
                                    data-pswp-height="1000"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Image
                                        src={image.path}
                                        style={carouselImageStyle}
                                        className="d-block"
                                        alt={`Image ${image.id}`}
                                    />
                                </a>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <ul className="d-flex list-unstyled justify-content-around mt-2">
                    {displayedImages.map((item, index) => (
                        <li
                            key={index}
                            style={index < listImages.length - 1 ? listItemStyle : {}}>
                            <Image
                                src={item.path}
                                thumbnail
                                onClick={() => handleImageClick(index)}
                                style={imageStyle}
                                alt={`Thumbnail ${index}`}
                            />
                        </li>
                    ))}
                </ul>
            </Row>
        </>
    );
};