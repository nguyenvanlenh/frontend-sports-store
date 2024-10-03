const CART_LS = "cart";
const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = "REFRESH_TOKEN";
const USER_LS = "USER";
const ORDER_LS = "ORDER";
const AUTH_TYPE = "AUTH-TYPE";
const COUNTRY = "Việt Nam";
const orderStatus = {
    PENDING: "PENDING",
    PAID: "PAID",
    CANCELLED: "CANCELLED"
}
const deliveryMethod = {
    VIETTEL_POST: "VIETTEL_POST",
    LALAMOVE: "LALAMOVE",
    SPORTER_EXPRESS: "SPORTER_EXPRESS",
    GHN: "GHN"
};
const deliveryStatusUpdate = {
    PREPARING: "PREPARING",
    DELIVERING: "DELIVERING",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
};
const paymentStatusUpdate = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
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
    NOT_FOUND: 404,
    LOCKED: 423,
}
const authType = {
    FACEBOOK: "FACEBOOK",
    GOOGLE: "GOOGLE",
    GITHUB: "GITHUB"
}
const routeNames = {
    home: "Trang chủ",
    search: "Tìm kiếm sản phẩm",
    cart: "Giỏ hàng",
    product: "Chi tiết sản phẩm",
    "list-products": "Danh sách sản phẩm",
    profile: "Hồ sơ cá nhân",
    "customer-account": "Thông tin khách hàng",
    order: "Đơn hàng",
    checkout: "Thanh toán",
    "payment-processing": "Xử lý thanh toán",
    register: "Đăng ký tài khoản",
    login: "Đăng nhập",
    admin: "Trang quản trị",
    "order-history": "Lịch sử đơn hàng",
};
const MAXIMUM_NUMBER_PRODUCTS = 1000;
const MINIMUM_NUMBER_IMAGE = 5;
const MAXIMUM_NUMBER_IMAGE = 6;
const MAX_SIZE_IMAGE_MB = 1;
const ROLE = {
    ADMIN: "ROLE_ADMIN",
    USER: "ROLE_USER",
}
const STATUS_TYPES = {
    ORDER: "orderStatus",
    PAYMENT: "paymentStatus",
    DELIVERY: "deliveryStatus"
};

export {
    CART_LS,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    USER_LS,
    ORDER_LS,
    COUNTRY,
    orderStatus,
    deliveryMethod,
    deliveryStatus,
    paymentStatus,
    paymentMethod,
    httpStatus,
    AUTH_TYPE,
    authType,
    routeNames,
    MAXIMUM_NUMBER_PRODUCTS,
    MINIMUM_NUMBER_IMAGE,
    MAXIMUM_NUMBER_IMAGE,
    MAX_SIZE_IMAGE_MB,
    ROLE,
    deliveryStatusUpdate,
    paymentStatusUpdate,
    STATUS_TYPES,
}