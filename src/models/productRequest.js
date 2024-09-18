export const productRequest = ({
    name,
    shortDescription,
    description,
    salePrice,
    regularPrice,
    brandId,
    categoryId,
    listImages = [],
    listSizes
} = {}) => ({
    name,
    shortDescription,
    description,
    salePrice,
    regularPrice,
    brandId,
    categoryId,
    listImages,
    listSizes
})