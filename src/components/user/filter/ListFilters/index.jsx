import React from "react";
import { useQuery } from "react-query";
import { brandService } from "../../../../services/brandService";
import { categoryService } from "../../../../services/categoryService";
import { sizeService } from "../../../../services/sizeService";
import { BlockFilter } from "../BlockFilter";

const fetchData = async (service) => {
    const { data } = await service();
    return data;
};

const useFetchData = (key, service) => {
    return useQuery(key, () => fetchData(service), {
        staleTime: 1800000,
        refetchInterval: 1800000,
        onError: (error) => {
            console.error(`Error fetching ${key}:`, error);
        }
    });
};

export const ListFilters = () => {
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

    return (
        <>
            <BlockFilter name="Thương hiệu" items={brands} />
            <BlockFilter name="Danh mục" items={categories} />
            <BlockFilter name="Kích cỡ" items={sizes} />
        </>
    );
};
