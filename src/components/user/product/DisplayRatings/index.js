import { Col, Image, Row } from "react-bootstrap";
import { useFetchData } from "../../../../hooks/useFetchData";
import { ratingService } from "../../../../services/ratingService";
import { FaStar, FaRegStar } from "react-icons/fa";
import UserImage from "../../../../data/img/user_icon.webp";
import { maskEmail } from "../../../../utils/common";
import moment from "moment";
import React from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export const DisplayRatings = ({ productId }) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [ratingsList, setRatingsList] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [isFetching, setIsFetching] = React.useState(false);

    const {
        data: ratings = {},
        isLoading: isRatingLoading,
        isError: isRatingError,
        error: errorRating
    } = useFetchData(["getRatings", currentPage], () => ratingService.getRatingsByProductId(productId, currentPage), true);

    const {
        data: averageStar,
        isLoading: isAverageLoading,
        isError: isAverageError,
        error: errorAverage
    } = useFetchData("getAverageStar", () => ratingService.getAverageStarByProductId(productId), false);

    React.useEffect(() => {
        if (ratings.content) {
            if (ratings.content.length === 0) {
                setHasMore(false);
            } else {
                setRatingsList((prevRatings) => [...prevRatings, ...ratings.content]);
            }
            setIsFetching(false);
        }
    }, [ratings]);

    const handleScroll = _.throttle(() => {
        if (currentPage >= (ratings?.totalPage - 1)) {
            setHasMore(false);
            return;
        }

        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasMore && !isFetching) {
            setIsFetching(true);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }, 500);

    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    if (isRatingLoading || isAverageLoading) {
        return <p>Đang tải dữ liệu...</p>;
    }
    if (isRatingError || isAverageError) {
        return <p>Đã xảy ra lỗi khi tải dữ liệu: {errorRating || errorAverage}</p>;
    }

    return (
        <>
            <h2 className="d-flex align-items-center">
                Đánh giá: {averageStar || 5}
                <FaStar color="#f1c40f" />
            </h2>
            <hr />
            {ratingsList.length === 0 ? (
                <p>Chưa có đánh giá nào.</p>
            ) : (
                <>
                    {ratingsList.map((rating) => (
                        <ItemRating key={uuidv4()} rating={rating} />
                    ))}
                    {isFetching && hasMore && <p>Đang tải thêm đánh giá...</p>}
                </>
            )}
        </>
    );
};

const ItemRating = ({ rating }) => {
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
                <Col lg={1} xs={2} className="d-flex align-items-center">
                    <Image src={UserImage} roundedCircle height={40} />
                </Col>
                <Col lg={11} xs={10}>
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">{maskEmail(rating.nameCustomer)}</small>
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
