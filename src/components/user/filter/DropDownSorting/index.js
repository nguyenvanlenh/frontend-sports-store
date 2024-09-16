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
                    onClick={(e) => handleSortChange(sortObj("price", "asc", e.target.textContent))}
                    active={isChecked(sortObj("price", "asc"))}
                >
                    Giá thấp - cao
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("price", "desc", e.target.textContent))}
                    active={isChecked(sortObj("price", "desc"))}
                >
                    Giá cao - thấp
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("lastMofifiedOn", "desc", e.target.textContent))}
                    active={isChecked(sortObj("lastMofifiedOn", "desc"))}
                >
                    Sản phẩm mới nhất
                </Dropdown.Item>
                <Dropdown.Item
                    onClick={(e) => handleSortChange(sortObj("lastMofifiedOn", "asc", e.target.textContent))}
                    active={isChecked(sortObj("lastMofifiedOn", "asc"))}
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