import httpRequest from "../utils/httpRequest"

export const searchService = {
    searchProduct: (
        name,
        brands = [],
        categories = [],
        sizes = [],
        currentPage = 0,
        sizePage = 4,
        sortBy = "name",
        sortDirection = "asc"
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