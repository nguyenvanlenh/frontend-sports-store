import httpRequest from "../utils/httpRequest"

export const searchService = {
    searchProduct: (
        name,
        brands = [],
        categories = [],
        sizes = [],
        currentPage,
        sizePage,
        sortBy,
        sortDirection
    ) => {
        const url = "/api/search";

        const params = {
            name: name,
            brands: brands.join(','),
            categories: categories.join(','),
            sizes: sizes.join(','),
            sort: `${sortBy},${sortDirection}`,
            page: currentPage,
            size: sizePage
        };
        return httpRequest.get(url, { params });
    }
}