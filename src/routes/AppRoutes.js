import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Home } from "../pages/user/Home";
import { UserLayout } from "../layouts/user/UserLayout";
import { Login } from "../pages/auth/Login";
import NotFound from "../pages/error/NotFound";
import { AdminLayout } from "../layouts/admin/AdminLayout";
import { Search } from "../pages/user/Search";
import { Cart } from "../pages/user/Cart";
import { ProductDetail } from "../pages/user/ProductDetail";
import { ListProducts } from "../pages/user/ListProducts";
import { Register } from "../pages/auth/Register";
import { Checkout } from "../pages/user/Checkout";
import { UserOrders } from "../components/user/profile/UserOrders";
import { Profile } from "../pages/user/Profile";
import { Account } from "../components/user/profile/Account";
import { Authenticate } from "../pages/auth/Authenticate";
import { PaymentProcessing } from "../pages/user/PaymentProcessing";
import { CreateProduct } from "../pages/admin/products/CreateProduct";
import { ProductsManagement } from "../pages/admin/products/ProductsManagement";
import { Dashboard } from "../pages/admin/dashboard";
import { UsersManagement } from "../pages/admin/users/UsersManagement";
import { BrandsManagement } from "../pages/admin/brands/BrandsManagement";
import { CategoriesManagement } from "../pages/admin/categories/CategoriesManagement";
import { SizesManagement } from "../pages/admin/sizes/SizesManagement";
import { OrdersManagement } from "../pages/admin/orders/OrdersManagement";

export const AppRoutes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/authenticate",
        element: <Authenticate />
    },
    {
        path: "/register",
        element: <Register />
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
                path: "product/:productId",
                element: <ProductDetail />
            }
            , {
                path: "list-products",
                element: <ListProducts />
            },
            {
                path: "checkout",
                element: <Checkout />
            },
            {
                path: "payment-processing",
                element: <PaymentProcessing />
            },
            {
                path: "profile",
                element: <Profile />,
                children: [
                    {
                        path: "/profile",
                        element: <Navigate to="customer-account" replace />
                    },
                    {
                        path: "order-history",
                        element: <UserOrders />
                    }
                    , {
                        path: "customer-account",
                        element: <Account />
                    }
                ]
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
            {
                path: "products",
                element: <ProductsManagement />
            },
            {
                path: "create-product",
                element: <CreateProduct />
            },
            {
                path: "users",
                element: <UsersManagement />
            },
            {
                path: "brands",
                element: <BrandsManagement />
            },
            {
                path: "categories",
                element: <CategoriesManagement />
            },
            {
                path: "sizes",
                element: <SizesManagement />
            },
            {
                path: "orders",
                element: <OrdersManagement />
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