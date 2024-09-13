import { Col, Image, Row } from "react-bootstrap";
import UserImage from "../../../../data/img/user_icon.webp";
import { maskText } from "../../../../utils/common";
import moment from "moment";
import { FaStar, FaRegStar } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
export const ItemRating = ({ rating }) => {
    const renderStars = (star) => {
        const totalStars = 5;
        const fullStars = Array(star).fill(null).map((_, idx) => (
            <FaStar key={uuidv4()} color="#f1c40f" />
        ));
        const emptyStars = Array(totalStars - star).fill(null).map((_, idx) => (
            <FaRegStar key={uuidv4()} color="#ccc" />
        ));
        return [...fullStars, ...emptyStars];
    };

    return (
        <div className="px-4">
            <Row className="mb-3">
                <Col lg={1} xs={2} className="d-flex align-items-center justify-content-center">
                    <Image src={rating.urlAvatar || UserImage} roundedCircle height={40} />
                </Col>
                <Col lg={11} xs={10}>
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">{maskText(rating.nameCustomer)}</small>
                        <small className="text-muted">{moment(rating.createdOn).format("DD/MM/YYYY")}</small>
                    </div>
                    <div>{renderStars(rating.star)}</div>
                    <p className="mt-2">{rating.content}</p>
                </Col>
            </Row>
            <hr />
        </div>
    );
};