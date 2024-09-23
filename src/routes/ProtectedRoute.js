import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
    const userRoles = useSelector(state => state.auth)?.listRoles;

    const hasAccess = roles.every(role => userRoles.includes(role));

    return hasAccess ? children : <Navigate to="*" replace />;
};

export default ProtectedRoute;
