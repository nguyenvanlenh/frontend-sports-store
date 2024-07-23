import { Col, Pagination, Row } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
export const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const createPaginationItems = () => {
        const paginationItems = [];
        const totalPagesToShow = 5;
        const ellipsis = <Pagination.Ellipsis key={uuidv4()} disabled />;

        if (totalPages <= totalPagesToShow) {
            for (let i = 0; i < totalPages; i++) {
                paginationItems.push(
                    <Pagination.Item
                        key={uuidv4()}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                    >
                        {i + 1}
                    </Pagination.Item>
                );
            }
        } else {
            const leftBoundary = Math.max(0, currentPage - 2);
            const rightBoundary = Math.min(totalPages - 1, currentPage + 2);
            if (currentPage > 0) {
                paginationItems.push(
                    <Pagination.First key={uuidv4()} onClick={() => {
                        onPageChange(0)
                    }} />
                );
            }
            if (leftBoundary > 0) {
                paginationItems.push(ellipsis);
            }
            for (let i = leftBoundary; i <= rightBoundary; i++) {
                paginationItems.push(
                    <Pagination.Item
                        key={uuidv4()}
                        active={i === currentPage}
                        onClick={() => onPageChange(i)}
                    >
                        {i + 1}
                    </Pagination.Item>
                );
            }
            if (rightBoundary < totalPages - 1) {
                paginationItems.push(ellipsis);
            }

            if (currentPage < totalPages - 1) {
                paginationItems.push(
                    <Pagination.Last key={uuidv4()} onClick={() => onPageChange(totalPages - 1)} />
                );
            }
        }

        return paginationItems;
    };

    return (
        <Row className="mt-4 mb-2">
            <Col md={12} className="d-flex justify-content-center">
                <Pagination className="pagination">
                    {createPaginationItems()}
                </Pagination>
            </Col>
        </Row>
    );
};
