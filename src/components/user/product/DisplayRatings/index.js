import { useFetchData } from "../../../../hooks/useFetchData";
import { ratingService } from "../../../../services/ratingService";
import { FaStar } from "react-icons/fa";
import React from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { ItemRating } from "../../rating/ItemRating";

export const DisplayRatings = ({ productId }) => {
    const [currentPage, setCurrentPage] = React.useState(0);
    const [ratingsList, setRatingsList] = React.useState([]);
    const [hasMore, setHasMore] = React.useState(true);
    const [isFetching, setIsFetching] = React.useState(false);

    const {
        data: ratings,
        isLoading: isRatingLoading,
        isError: isRatingError,
        error: errorRating
    } = useFetchData([`getRatings${productId}`, currentPage], () => ratingService.getRatingsByProductId(productId, currentPage), true);

    const {
        data: averageStar,
        isLoading: isAverageLoading,
        isError: isAverageError,
        error: errorAverage
    } = useFetchData(`getAverageStar${productId}`, () => ratingService.getAverageStarByProductId(productId));

    React.useEffect(() => {
        if (ratings?.content) {
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
                <i className="text-center text-secondary">Chưa có đánh giá nào.</i>
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