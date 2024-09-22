import { Badge, Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserAvatar from "../data/img/user_icon.webp";
import ThumbnailImage from "../data/img/main_thumbnail.png";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { formatCurrencyVN, formatDateTimeVN } from "./common";
const paginationOptions = {
    rowsPerPageText: "Số phần tử mỗi trang",
    rangeSeparatorText: "của",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Tất cả",
};
const customStyles = {
    headCells: {
        style: {
            fontSize: "16px",
            fontWeight: "bold",
        },
    },
    cells: {
        style: {
            fontSize: "14px",
            marginTop: "5px",
            marginBottom: "5px"
        },
    },
};
const paymentStatusMap = {
    PENDING: { icon: <FaClock className="me-2" />, className: "text-warning" },
    COMPLETED: { icon: <FaCheckCircle className="me-2" />, className: "text-success" },
    CANCELLED: { icon: <FaTimesCircle className="me-2" />, className: "text-muted text-decoration-line-through" }
}
const paymentMethodMap = {
    COD: { className: "bg-warning" },
    BANKING: { className: "bg-success" },
    PAYPAL: { className: "bg-primary" },
}
const orderColumns = [
    {
        name: "#",
        selector: row => <Link to="" className="text-primary">#{row.id}</Link>,
        sortField: "id",
        sortable: true,
        width: "7%",
    },
    {
        name: "Tên khách hàng",
        selector: row => <span className="fw-bold text-secondary">{row.nameCustomer}</span>,
        sortField: "nameCustomer",
        sortable: true,
        width: "20%",
    },
    {
        name: "Tổng tiền",
        selector: row => formatCurrencyVN(row.totalPrice),
        sortField: "totalPrice",
        sortable: true,
        width: "15%",
        cell: row => <span className="fw-bold text-danger">{formatCurrencyVN(row.totalPrice)}</span>,
    },
    {
        name: "Trạng thái thanh toán",
        selector: row => row.payment.paymentStatus,
        width: "15%",
        cell: row => {
            const paymentStatus = paymentStatusMap[row.payment.paymentStatus] || {};
            return (
                <span className={paymentStatus.className}>
                    {paymentStatus.icon} {row.payment.paymentStatus}
                </span>
            );
        },
    },
    {
        name: "Phương thức thanh toán",
        selector: row => row.payment.paymentMethod,
        width: "15%",
        cell: row => {
            const paymentMethod = paymentMethodMap[row.payment.paymentMethod] || {};
            return (
                <span className={`p-1 text-white rounded ${paymentMethod.className}`}>
                    {row.payment.paymentMethod}
                </span>
            );
        },
    },
    {
        name: "Trạng thái vận chuyển",
        selector: row => <span className="fw-bold text-secondary">{row.deliveryStatus}</span>,
        width: "15%",
    },
    {
        name: "Ngày",
        selector: row => <span className="text-secondary">{formatDateTimeVN(row.createdOn)}</span>,
        sortField: "createdOn",
        sortable: true,
        width: "15%",
    }
];
const productColumns = (onEdit, onLock) => [
    {
        name: "#",
        selector: row => <Link to="" className="text-primary">#{row.id}</Link>,
        sortField: "id",
        sortable: true,
        width: "7%",
    },
    {
        name: "",
        selector: row => row.thumbnailImage || ThumbnailImage,
        cell: row => (
            <Image
                src={row.thumbnailImage || ThumbnailImage}
                loading="lazy"
                thumbnail
                width="60"
            />
        ),
        width: "10%",
    },
    {
        name: "Tên",
        selector: row => row.name,
        sortField: "name",
        sortable: true,
        width: "30%",
        cell: row => <span className="fw-bold text-secondary">{row.name}</span>,
    },
    {
        name: "Giá",
        selector: row => formatCurrencyVN(row.salePrice),
        sortField: "salePrice",
        sortable: true,
        width: "15%",
        cell: row => <span className="fw-bold text-danger">{formatCurrencyVN(row.salePrice)}</span>,
    },
    {
        name: "Hãng",
        selector: row => row.brand.name,
        width: "15%",
        cell: row => <span className="fw-bold text-warning">{row.brand.name}</span>,
    },
    {
        name: "Trạng thái",
        selector: row => row.isActive,
        width: "15%",
        cell: row => (
            <span className={`bg-${row.isActive ? 'success' : 'danger'} text-white p-2 rounded`}>
                {row.isActive ? 'Công khai' : 'Ẩn'}
            </span>
        ),
    },
    {
        name: "Sửa",
        width: "10%",
        cell: row => (
            <Dropdown drop="down-centered">
                <Dropdown.Toggle variant="Light">
                    <span>...</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className="text-secondary" onClick={() => onEdit(row)}>Sửa</Dropdown.Item>
                    <Dropdown.Item className="text-secondary" onClick={() => onLock(row)}>Khóa</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ),
    },
];
const handleFullname = (firstName = "", lastName = "", username) => {
    return firstName || lastName ? `${firstName} ${lastName}` : username;
};
const userColumns = (onEdit, onLock) => [
    {
        name: "#",
        selector: row => <Link to="" className="text-primary">#{row.id}</Link>,
        sortField: "id",
        sortable: true,
        width: "7%",
    },
    {
        name: "",
        cell: row => (
            <Image
                src={row.avatar || UserAvatar}
                loading="lazy"
                roundedCircle
                width="60"
            />
        ),
        width: "10%",
    },
    {
        name: "Tên",
        selector: row => handleFullname(row.firstName, row.lastName, row.username),
        cell: row => <span className="fw-bold text-secondary">{handleFullname(row.firstName, row.lastName, row.username)}</span>,
        width: "20%",
    },
    {
        name: "Email",
        selector: row => <span className="fw-bold text-secondary">{row.email}</span>,
        width: "20%",
    },
    {
        name: "Quyền",
        cell: row => (
            <>
                {row.listRoles?.map((role) => (
                    <Badge bg="warning" className="me-1" key={role.id}>{role.name}</Badge>
                ))}
            </>
        ),
        width: "20%",
    },
    {
        name: "Trạng thái",
        cell: row => (
            <span className={`bg-${true ? "success" : "danger"} text-white p-2 rounded`}>
                {true ? "Công khai" : "Ẩn"}
            </span>
        ),
        width: "15%",
    },
    {
        name: "Sửa",
        cell: row => (
            <Dropdown drop="down-centered">
                <Dropdown.Toggle variant="Light">
                    <span>...</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className="text-secondary" onClick={() => onEdit(row)}>Sửa</Dropdown.Item>
                    <Dropdown.Item className="text-secondary" onClick={() => onLock(row)}>Khóa</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ),
        width: "10%",
    },
];
const commonColumns = (onEdit, onLock) => [
    {
        name: "#",
        selector: row => <Link to="" className="text-primary">#{row.id}</Link>,
        sortable: true,
        width: "10%",
    },
    {
        name: "Tên",
        selector: row => row.name,
        cell: row => <span className="fw-bold text-secondary">{row.name}</span>,
        sortable: true,
        width: "50%",
    },
    {
        name: "Trạng thái",
        cell: row => (
            <span className={`bg-${row.isActive ? "success" : "danger"} text-white p-2 rounded`}>
                {row.isActive ? "Công khai" : "Ẩn"}
            </span>
        ),
        width: "20%",
    },
    {
        name: "Sửa",
        cell: row => (
            <Dropdown drop="down-centered">
                <Dropdown.Toggle variant="Light">
                    <span>...</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className="text-secondary" onClick={() => onEdit(row)}>Sửa</Dropdown.Item>
                    <Dropdown.Item className="text-secondary" onClick={() => onLock(row)}>Khóa</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ),
        width: "20%",
    },
];
export {
    paginationOptions,
    customStyles,
    commonColumns,
    userColumns,
    productColumns,
    orderColumns
}