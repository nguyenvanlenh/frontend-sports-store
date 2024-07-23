import React from 'react';
import SelectSize from "../../../../data/img/size/select-pro.webp";
import { Image } from 'react-bootstrap';

const labelSize = {
    border: '1px solid #ccc',
    padding: '5px 10px',
    background: '#fff',
    color: '#000',
    borderRadius: '3px',
    marginRight: '3px',
    position: 'relative',
    cursor: 'pointer'
};

const imgStyle = {
    position: 'absolute',
    bottom: '0',
    right: '0'
};

const data = [
    {
        id: 1,
        name: "M",
        quantity: 20
    },
    {
        id: 2,
        name: "S",
        quantity: 20
    },
    {
        id: 3,
        name: "L",
        quantity: 20
    },
    {
        id: 4,
        name: "XL",
        quantity: 20
    },
]

export const ListSizes = ({ listSizes = [], onSizeChange }) => {
    const [selectedSize, setSelectedSize] = React.useState(() => {
        return listSizes[0]
    });
    const handleSelect = (size) => {
        setSelectedSize(size);
        onSizeChange(size);
    };
    return (
        <>
            <h5 className="fs-6">SIZE</h5>
            <div className="d-flex">
                {listSizes.map((size) => (
                    <SizeItem
                        key={size.id}
                        name={size.name}
                        isSelected={selectedSize.id === size.id}
                        onSelect={() => handleSelect(size)
                        }
                    />
                ))}
            </div>

        </>
    );
};

const SizeItem = ({ name, isSelected, onSelect }) => {
    return (
        <div style={labelSize} onClick={onSelect}>
            {name}
            {isSelected &&
                <Image src={SelectSize} alt="image select size" style={imgStyle} />}
        </div>
    );
};


