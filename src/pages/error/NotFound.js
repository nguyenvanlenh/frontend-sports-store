import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROLE } from '../../utils/constant';
const NotFound = () => {
    const authentication = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const handleRedirect = () => {
        if ((authentication?.listRoles || []).includes(ROLE.ADMIN))
            navigate("/admin/dashboard")
        else
            navigate("/home")
    }
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center row">
                <div className=" col-md-6">
                    <img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" alt=""
                        className="img-fluid" />
                </div>
                <div className=" col-md-6 mt-5">
                    <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                    <p className="lead">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <Link onClick={handleRedirect} className="btn btn-primary">Go Home</Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;