import React from "react";
import { InputGroup } from "react-bootstrap";

export const QuantityAdjuster = ({ min = 1, initialQuantity = 1, max = 20, onQuantityChange }) => {
    const [quantity, setQuantity] = React.useState(initialQuantity);
    const handleIncrease = () => {
        if (quantity < max) {
            setQuantity(prevQuantity => prevQuantity + 1);
            onQuantityChange(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > min) {
            setQuantity(prevQuantity => prevQuantity - 1);
            onQuantityChange(quantity - 1);
        }
    };

    return (
        <div className="mt-3 mb-3">
            <InputGroup className="mb-3">
                <InputGroup.Text
                    aria-readonly
                    className="bg-white user-select-none"
                    onClick={handleDecrease}
                    style={{
                        cursor: 'pointer',
                    }}>
                    -
                </InputGroup.Text>
                <InputGroup.Text
                    aria-readonly
                    className="bg-white user-select-none">
                    {quantity}
                </InputGroup.Text>
                <InputGroup.Text
                    aria-readonly
                    className="bg-white user-select-none"
                    onClick={handleIncrease}
                    style={{
                        cursor: 'pointer',
                    }} >
                    +
                </InputGroup.Text>
            </InputGroup>
        </div>
    )
}
