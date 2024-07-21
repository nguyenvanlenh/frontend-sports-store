import { useState } from 'react';

export const usePagination = (initialPage, totalPage) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const handleChangePage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPage) {
            setCurrentPage(pageNumber);
        }
    };

    return {
        currentPage,
        totalPage,
        handleChangePage,
    };
};
