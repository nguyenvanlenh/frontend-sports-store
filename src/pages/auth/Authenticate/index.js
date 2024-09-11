import React from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/common/Loading";
import { authService } from "../../../services/authService";
import { setLogin } from "../../../utils/localStorage";
import { useDispatch } from "react-redux";
import { saveAuthentication } from "../../../redux/authSlice";

export const Authenticate = () => {
    const navigatiton = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedin, setIsLoggedin] = React.useState(false);
    React.useEffect(() => {

        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);
        const outboundUser = async (code) => {
            const response = await authService.outboundUserGG(code);
            setLogin(response?.data);
            dispatch(saveAuthentication(response?.data));

        }
        if (isMatch) {
            const authCode = isMatch[1];
            console.log(authCode);
            try {
                outboundUser(authCode)
                setIsLoggedin(true)
            } catch (error) {
                console.error(`An error occured while login with gg ${error}`);
                // navigatiton("/login");
            }

        }
    }, []);

    React.useEffect(() => {
        if (isLoggedin) {
            navigatiton("/home");
        }
    }, [isLoggedin, navigatiton]);
    return (
        <>
            <Loading />
        </>
    )
}