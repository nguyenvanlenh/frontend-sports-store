import React from 'react';
import { Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideSuggest } from '../../../../redux/searchSlice';

const suggestStyle = {
    backgroundColor: "white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "4px",
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    zIndex: 1,
    marginTop: "4px"
};
const suggestItemStyle = {
    maxHeight: "50px",
}
const suggestItemImageStyle = {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    marginRight: "20px"
}

export const Suggestion = ({ suggestions }) => {
    if (!Array.isArray(suggestions) || suggestions.length === 0) return null;
    return (
        <div style={suggestStyle}>
            {suggestions?.map((suggestion, index) => (
                <div key={index} style={{ padding: "8px", cursor: "pointer" }}>
                    {<SuggestionItem product={suggestion} />}
                </div>
            ))}
        </div>)
};

const SuggestionItem = ({ product }) => {
    const dispatch = useDispatch();
    const handleClick = () => dispatch(hideSuggest());
    return (
        <Link
            to={`/product/${product?.id}`}
            className="text-dark"
            onClick={handleClick}
            title={product?.name} >
            <div className="d-flex justify-content-start align-items-center" style={suggestItemStyle}>
                <Image src={product.thumbnailImage || product.listImages[0]?.path} thumbnail style={suggestItemImageStyle} />
                <span className="text-uppercase"
                    style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: "1.2em"
                    }}
                >{product?.name || "Áo đấu chính hãng"}</span>
            </div>
        </Link>
    )
}
