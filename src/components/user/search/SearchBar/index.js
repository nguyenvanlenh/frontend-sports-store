import React from "react";
import { useNavigate } from "react-router-dom";
import { InputGroup, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Suggestion } from "../Suggestion";
import { useDebounce } from "../../../../hooks/useDebounce";
import { searchService } from "../../../../services/searchService";
import { clearFilters } from "../../../../redux/filterSlice";
import { displaySuggest, hideSuggest, searchByName } from "../../../../redux/searchSlice";

export const SearchBar = React.forwardRef(({ className }, ref) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = React.useState("");
    const [suggestions, setSuggestions] = React.useState([]);
    const showSuggest = useSelector(state => state.search.showSuggest);
    const containerRef = React.useRef(null);
    const searchButtonRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const debouncedQuery = useDebounce(query, 1000);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleClickOutside = React.useCallback((event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            dispatch(hideSuggest());
        }
    }, [dispatch]);

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);


    React.useEffect(() => {
        if (!debouncedQuery || !debouncedQuery.trim()) {
            setSuggestions([]);
            dispatch(hideSuggest());
            return;
        }
        const fetchSuggestProduct = async (name) => {
            try {
                const res = await searchService.searchProduct(name);
                const suggestData = res?.data?.content || [];
                setSuggestions(suggestData);
                if (suggestData.length > 0)
                    dispatch(displaySuggest());
                else
                    dispatch(hideSuggest());
            } catch (error) {
                console.error("Failed to fetch suggestions:", error);
            }
        };
        fetchSuggestProduct(debouncedQuery);
    }, [debouncedQuery, dispatch]);

    React.useEffect(() => {
        if (ref)
            ref.current = inputRef.current;
    }, [ref]);

    const handleSearch = () => {
        if (!debouncedQuery.trim()) return;
        dispatch(clearFilters());
        dispatch(searchByName({ content: debouncedQuery, showSuggest: true }));
        dispatch(hideSuggest());
        navigate("/list-products");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter")
            searchButtonRef.current.click();
    };

    return (
        <div ref={containerRef} className={`position-relative d-flex justify-content-center align-items-center flex-fill ms-5 me-4 ${className}`}>
            <InputGroup>
                <Form.Control
                    ref={inputRef}
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên áo đấu ..."
                />
                <Button
                    className="bg-light btn-outline-light text-secondary"
                    ref={searchButtonRef}
                    onClick={handleSearch}
                >
                    Tìm kiếm
                </Button>
            </InputGroup>
            {showSuggest && <Suggestion suggestions={suggestions} />}
        </div>
    );
});
