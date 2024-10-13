import React from "react";
import { Badge } from "react-bootstrap";
import { FaShoppingBag } from "react-icons/fa";
import { useSelector } from "react-redux";

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
    const cartItemsCount = (useSelector((state) => state.cart.cartItems) || []).length;
    return (
        <div style={iconContainerStyle}>
            <FaShoppingBag size={size} />
            {cartItemsCount > 0 && (
                <Badge
                    pill
                    bg="warning"
                    style={badgeStyle}
                >
                    {cartItemsCount}
                </Badge>
            )}
        </div>
    );
};
