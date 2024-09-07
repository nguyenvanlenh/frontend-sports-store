import React from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = ({ trigger }) => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [trigger, pathname]);
    return null;
};