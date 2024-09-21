import { Button } from "react-bootstrap"
import { successAlert } from "../../../utils/sweetAlert"

export const CustomButton = ({ variant, style = {}, onClick, className = "", children }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            successAlert(
                "Thông báo",
                "Chức năng này đang được phát triển",
                3000
            );
        }
    };
    return (
        <Button
            className={className}
            variant={variant}
            style={style}
            onClick={handleClick}
        >{children}</Button>
    )
}