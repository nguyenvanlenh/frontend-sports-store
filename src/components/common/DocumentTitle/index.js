import React from "react";
import { useLocation } from "react-router-dom";
import { routeNames } from "../../../utils/constant";

export const DocumentTitle = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const getFriendlyTitle = (pathname) => {
        return routeNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
    };

    React.useEffect(() => {
        let pageTitle = pathnames.map((name) => getFriendlyTitle(name)).join(" - ");
        if (!pageTitle) {
            pageTitle = "Trang chủ";
        }

        document.title = `${pageTitle} - Sporter`;

        return () => {
            document.title = "Sporter shop";
        };
    }, [pathnames]);

    return null;
};
