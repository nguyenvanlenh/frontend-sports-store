import React from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSortAttribute } from "../../../../redux/filterSlice";
import { setPage } from "../../../../redux/paginationSlice";

export const DropDownSorting = React.memo(() => {
    const dispatch = useDispatch();
    const sortAttribute = useSelector(state => state.filter.sortAttribute);
    const sortObj = (field, direction, label) => {
        return {
            field,
            direction,
            label
        }
    }
    const isChecked = (sort) => {
        return sortAttribute.field === sort.field &&
            sortAttribute.direction === sort.direction
    }
    const handleSortChange = (value) => {
        dispatch(setSortAttribute(value));
        dispatch(setPage(0));
    };
    return (
        <Dropdown data-bs-theme="light">
            <Dropdown.Toggle variant="light" className="w-100">
                {sortAttribute?.label || "Sắp xếp sản phẩm"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("salePrice", "asc", e.target.textContent))}
                    active={isChecked(sortObj("salePrice", "asc"))}
                >
                    Giá thấp - cao
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("salePrice", "desc", e.target.textContent))}
                    active={isChecked(sortObj("salePrice", "desc"))}
                >
                    Giá cao - thấp
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("lastModifiedOn", "desc", e.target.textContent))}
                    active={isChecked(sortObj("lastModifiedOn", "desc"))}
                >
                    Sản phẩm mới nhất
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("lastModifiedOn", "asc", e.target.textContent))}
                    active={isChecked(sortObj("lastModifiedOn", "asc"))}
                >
                    Sản phẩm cũ nhất
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("name", "asc", e.target.textContent))}
                    active={isChecked(sortObj("name", "asc"))}
                >
                    Tên: A - Z
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("name", "desc", e.target.textContent))}
                    active={isChecked(sortObj("name", "desc"))}
                >
                    Tên: Z - A
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}); 