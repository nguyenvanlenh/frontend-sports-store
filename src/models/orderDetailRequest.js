export const orderDetailRequest = ({
    idProduct,
    quantity,
    price = 0,
    discountAmount = 0,
    size,
    category,
    brand
} = {}) => ({
    idProduct,
    quantity,
    price,
    discountAmount,
    size,
    category,
    brand
});