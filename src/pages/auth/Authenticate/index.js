import React from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/common/Loading";
import { authService } from "../../../services/authService";
import { localStorages, setLogin } from "../../../utils/localStorage";
import { useDispatch } from "react-redux";
import { saveAuthentication } from "../../../redux/authSlice";
import { AUTH_TYPE, authType } from "../../../utils/constant";

export const Authenticate = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedin, setIsLoggedin] = React.useState(false);
    React.useEffect(() => {
        const handleAuthentication = async (authCode, type) => {
            try {
                const response = await authService.outboundUser(authCode, type);
                setLogin(response?.data);
                dispatch(saveAuthentication(response?.data));
                setIsLoggedin(true);
            } catch (error) {
                console.error(`An error occurred while logging in with ${type}: ${error}`);
                navigation("/login");
            }
        };
        const type = localStorages.getDataByKey(AUTH_TYPE);

        const authCodeRegex = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCodeRegex);
        if (window.location.href.includes("error")) {
            navigation("/login");
            return;
        }
        if (isMatch) {
            const authCode = isMatch[1];
            switch (type) {
                case authType.GITHUB: handleAuthentication(authCode, authType.GITHUB);
                    break;
                case authType.GOOGLE: handleAuthentication(authCode, authType.GOOGLE);
                    break;
                default:
                    alert("Unknown authentication type");
                    navigation("/login");
                    break;
            }
        }
    }, [dispatch, navigation]);

    React.useEffect(() => {
        if (isLoggedin) {
            navigation("/home");
        }
    }, [isLoggedin, navigation]);
    return (
        <>
            <Loading />
        </>
    )
}