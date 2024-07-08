export const formatCurrencyVN = (number) => {
    const formattedNumber = number.toLocaleString('vi-VN');
    return `${formattedNumber} đ`;
};