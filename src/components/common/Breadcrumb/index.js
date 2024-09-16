import { Breadcrumb, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { routeNames } from "../../../utils/constant";

export const BreadcrumbComponent = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    const getFriendlyName = (pathname) => {
        return routeNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
    };

    if (location.pathname === "/" ||
        location.pathname === "/home" ||
        location.pathname.includes("/product")) {
        return null;
    }

    return (
        <div className="pt-3 pb-2 mb-4" style={{
            backgroundColor: "rgb(245, 245, 245)",
            marginTop: "-14px"
        }}>
            <Container >
                <Breadcrumb>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
                        Trang chủ
                    </Breadcrumb.Item>
                    {pathnames.map((name, index) => {
                        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                        const isLast = index === pathnames.length - 1;
                        const displayName = getFriendlyName(name);

                        return isLast ? (
                            <Breadcrumb.Item key={name} active>
                                {displayName}
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={name} linkAs={Link} linkProps={{ to: routeTo }}>
                                {displayName}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </Container>
        </div>
    );
};
