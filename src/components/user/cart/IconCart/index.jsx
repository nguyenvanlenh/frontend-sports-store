import React from "react";
import { Badge } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";

const iconContainerStyle = {
    position: 'relative',
    display: 'inline-block'
};

const badgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-10px'
};

export const IconCart = ({ size }) => {
    const [itemCount, setItemCount] = React.useState(1);

    return (
        <div style={iconContainerStyle}>
            <FaShoppingBag size={size} />
            {itemCount > 0 && (
                <Badge
                    pill
                    bg="warning"
                    style={badgeStyle}
                >
                    {itemCount}
                </Badge>
            )}
        </div>
    );
};
