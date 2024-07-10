import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Home } from "../pages/user/Home";
import { UserLayout } from "../layouts/user/UserLayout";
import { Login } from "../pages/auth/Login";
import NotFound from "../pages/error/NotFound";
import { AdminLayout } from "../layouts/admin/AdminLayout";
import { Dashboard } from "../pages/admin/Dashboard";
import { Search } from "../pages/user/Search";
import { Cart } from "../pages/user/Cart";
import { ProductDetail } from "../pages/user/ProductDetail";

export const AppRoutes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <ProtectedRoute roles={["ROLE_USER"]}><UserLayout /></ProtectedRoute>,
        children: [
            {
                path: "/",
                element: <Navigate to="home" replace />
            },
            {
                path: "home",
                element: <Home />
            }, {
                path: "search",
                element: <Search />
            }, {
                path: "cart",
                element: <Cart />
            }, {
                path: "product-detail",
                element: <ProductDetail />
            }
        ]
    },
    {
        path: "/admin",
        element: <ProtectedRoute roles={["ROLE_ADMIN"]}><AdminLayout /></ProtectedRoute>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => AppRoutes.dispose());
}