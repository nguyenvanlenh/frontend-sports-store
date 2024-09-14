const CART_LS = "cart";
const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const APP_BASE_URL = "http://localhost:8081";
const USER_LS = "USER";
const AUTH_TYPE = "AUTH-TYPE";
const URL_LOCATION = "https://raw.githubusercontent.com/qtv100291/Vietnam-administrative-division-json-server/master/db.json";
const COUNTRY = "Việt Nam";
const orderStatus = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    PAID: "PAID",
    UNPAID: "UNPAID",
    CANCELLED: "CANCELLED"
}
const deliveryMethod = {
    VIETTEL_POST: "VIETTEL_POST",
    LALAMOVE: "LALAMOVE",
    SPORTER_EXPRESS: "SPORTER_EXPRESS",
    GHN: "GHN"
};

const deliveryStatus = {
    ALL: {
        key: "ALL",
        displayName: "Tất cả"
    },
    PREPARING: {
        key: "PREPARING",
        displayName: "Đang xử lý"
    },
    DELIVERING: {
        key: "DELIVERING",
        displayName: "Đang vận chuyển"
    },
    DELIVERED: {
        key: "DELIVERED",
        displayName: "Đã giao"
    },
    CANCELLED: {
        key: "CANCELLED",
        displayName: "Đã hủy"
    }
};

const paymentMethod = {
    COD: {
        key: "COD",
        displayName: "COD (Thanh toán khi nhận hàng)"
    },
    BANKING: {
        key: "BANKING",
        displayName: "Chuyển khoản ngân hàng"
    },
    PAYPAL: {
        key: "PAYPAL",
        displayName: "Thanh toán qua PayPal"
    }
};
const paymentStatus = {
    PENDING: {
        key: "PENDING",
        displayName: "Chờ thanh toán"
    },
    COMPLETED: {
        key: "COMPLETED",
        displayName: "Đã thanh toán"
    },
    CANCELLED: {
        key: "CANCELLED",
        displayName: "Đã hủy"
    }
};


const httpStatus = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
}
const authType = {
    FACEBOOK: "FACEBOOK",
    GOOGLE: "GOOGLE",
    GITHUB: "GITHUB"
}

export {
    CART_LS,
    APP_BASE_URL,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    USER_LS,
    URL_LOCATION,
    COUNTRY,
    orderStatus,
    deliveryMethod,
    deliveryStatus,
    paymentStatus,
    paymentMethod,
    httpStatus,
    AUTH_TYPE,
    authType
}