import React from "react";
import { brandService } from "../../../../services/brandService";
import { categoryService } from "../../../../services/categoryService";
import { sizeService } from "../../../../services/sizeService";
import { BlockFilter } from "../BlockFilter";
import { useDispatch, useSelector } from "react-redux";
import { brandFilter, categoryFilter, sizeFilter } from "../../../../redux/filterSlice";
import { useFetchData } from "../../../../hooks/useFetchData";

export const ListFilters = React.memo(() => {
    const dispatch = useDispatch();
    const productFilter = useSelector(state => state.filter.productFilter);
    const {
        data: brands,
        isLoading: isLoadingBrands,
        isError: isErrorBrands,
        error: errorBrands
    } = useFetchData("brands", brandService.getAllBrands);
    const {
        data: categories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        error: errorCategories
    } = useFetchData("categories", categoryService.getAllCategories);
    const {
        data: sizes,
        isLoading: isLoadingSizes,
        isError: isErrorSizes,
        error: errorSizes
    } = useFetchData("sizes", sizeService.getAllSizes);

    if (isLoadingBrands || isLoadingCategories || isLoadingSizes) {
        return <div>Loading...</div>;
    }

    if (isErrorBrands || isErrorCategories || isErrorSizes) {
        return (
            <div>
                {isErrorBrands && <div>Error loading brands: {errorBrands.message}</div>}
                {isErrorCategories && <div>Error loading categories: {errorCategories.message}</div>}
                {isErrorSizes && <div>Error loading sizes: {errorSizes.message}</div>}
            </div>
        );
    }
    const handleBrandChange = (brandId) => {
        dispatch(brandFilter(brandId));
    };

    const handleCategoryChange = (categoryId) => {
        dispatch(categoryFilter(categoryId));
    };

    const handleSizeChange = (sizeId) => {
        dispatch(sizeFilter(sizeId));
    };

    return (
        <>
            <BlockFilter name="Thương hiệu" items={brands} onChange={handleBrandChange} selectedItems={productFilter.brand} />
            <BlockFilter name="Danh mục" items={categories} onChange={handleCategoryChange} selectedItems={productFilter.category} />
            <BlockFilter name="Kích cỡ" items={sizes} onChange={handleSizeChange} selectedItems={productFilter.size} />
        </>
    );
});
