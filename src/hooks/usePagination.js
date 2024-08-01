import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/paginationSlice';

export const usePagination = (initialPage, totalPage) => {
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination)
    const [currentPage, setCurrentPage] = React.useState(initialPage ?? pagination);

    const handleChangePage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPage) {
            setCurrentPage(pageNumber);
            dispatch(setPage(pageNumber));
        }
    };

    return {
        currentPage,
        totalPage,
        handleChangePage,
    };
};
