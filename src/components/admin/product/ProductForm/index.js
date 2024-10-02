import React from "react";
import { Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { MdOutlineFileUpload } from "react-icons/md";
import { EditorComponent } from "../../../common/Editor";
import { useFormik } from "formik";
import { useFetchData } from "../../../../hooks/useFetchData";
import { brandService } from "../../../../services/brandService";
import { categoryService } from "../../../../services/categoryService";
import { sizeService } from "../../../../services/sizeService";
import { errorAlert, successAlert } from "../../../../utils/sweetAlert";
import { ItemImageDisplay } from "../ItemImageDisplay";
import { productService } from "../../../../services/productService";
import { productRequest } from "../../../../models/productRequest";
import { MAXIMUM_NUMBER_IMAGE, MAX_SIZE_IMAGE_MB, MINIMUM_NUMBER_IMAGE } from "../../../../utils/constant";
import { Loading } from "../../../common/Loading";
import { Link, useNavigate } from "react-router-dom";
import { validationProduct } from "./constants";
import { validateImageFile } from "../../../../utils/common";


const CustomSelect = ({ id, options, defaultValue, formik }) => (
    <Form.Group className="mb-3">
        <Form.Select
            id={id}
            name={id}
            value={formik.values[id]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={!!formik.errors[id] && formik.touched[id]}
        >
            <option value="">{defaultValue}</option>
            {options.map((option, idx) => (
                <option key={idx} value={option.id}>
                    {option.name}
                </option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
            {formik.errors[id]}
        </Form.Control.Feedback>
    </Form.Group>
);

export const ProductForm = ({ product }) => {
    const [imagePreviews, setImagePreviews] = React.useState(product ? product.listImages : []);
    const fileInputRef = React.useRef(null);
    const [description, setDescription] = React.useState(product ? product.description : "");

    const [listImages, setListImages] = React.useState([]);
    const [listSizes, setListSizes] = React.useState(product ? product.listSize : [{ id: 1, quantity: 0 }]);
    const [isSubmit, setSubmit] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();

    const {
        data: brands,
        isLoading: isLoadingBrands,
        isError: isErrorBrands,
        error: errorBrands
    } = useFetchData("brands", brandService.getAllBrands);

    const {
        data: categories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        error: errorCategories
    } = useFetchData("categories", categoryService.getAllCategories);

    const {
        data: sizes,
        isLoading: isLoadingSizes,
        isError: isErrorSizes,
        error: errorSizes
    } = useFetchData("sizes", sizeService.getAllSizes);

    const formik = useFormik({
        initialValues: {
            name: product?.name || "",
            shortDescription: product?.shortDescription || "",
            description: product?.description || "",
            salePrice: product?.salePrice || 0,
            regularPrice: product?.regularPrice || 0,
            brand: product?.brand?.id || "",
            category: product?.category?.id || "",
            listImages: product?.listImages || [],
            listSizes: listSizes
        },
        validationSchema: validationProduct,
        onSubmit: async (values) => {
            setSubmit(true);
            setLoading(true);

            if (imagePreviews.length < MINIMUM_NUMBER_IMAGE) {
                errorAlert("Oops...", `Ít nhất phải có ${MINIMUM_NUMBER_IMAGE} hình ảnh`);
                setLoading(false);
                return;
            }

            const request = productRequest({
                name: values.name,
                shortDescription: values.shortDescription,
                description: values.description,
                salePrice: values.salePrice,
                regularPrice: values.regularPrice,
                brandId: Number(values.brand),
                categoryId: Number(values.category),
                listSizes: values.listSizes,
                listImages: values.listImages
            });

            try {
                if (product) {
                    await productService.updateProduct(product.id, request, listImages);
                    successAlert(
                        "Cập nhật sản phẩm",
                        "Cập nhật sản phẩm thành công",
                        2000,
                        () => {
                            navigate("/admin/products");
                        }
                    );
                } else {
                    await productService.createProduct(request, listImages);
                    successAlert(
                        "Thêm sản phẩm",
                        "Thêm sản phẩm thành công",
                        2000,
                        () => navigate("/admin/products")
                    );
                }
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                errorAlert("Lỗi", `Yêu cầu thất bại: ${errorMessage}`, 3500);
            } finally {
                setLoading(false);
            }
        }
    });

    const handleFileChange = (event) => {
        const maxSizeInMB = 2;
        const files = Array.from(event.target.files);

        if (files?.length > MAXIMUM_NUMBER_IMAGE)
            errorAlert("Lỗi", `Số hình ảnh được tải lên tối đa là ${MAXIMUM_NUMBER_IMAGE}`);
        const validFiles = files.filter(file => {
            const validation = validateImageFile(file, maxSizeInMB);
            if (!validation.isValid) {
                errorAlert("Lỗi", validation.message);
                console.error(validation.message);
            }
            return validation.isValid;
        });

        if (validFiles.length > 0) {
            const previewUrls = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...previewUrls]);
            setListImages(files);
            event.target.value = null;
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        URL.revokeObjectURL(imagePreviews[indexToRemove]);
        const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
        setImagePreviews(updatedPreviews);
    };

    const triggerFileInput = () => fileInputRef.current.click();

    React.useEffect(() => {
        const productSystemRestImages = imagePreviews?.filter(
            (imgPr) => formik.values.listImages.some(
                imgSys => imgSys?.id === imgPr?.id));

        formik.setFieldValue("listImages", productSystemRestImages);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagePreviews]);

    React.useEffect(() => {
        formik.setFieldValue("listSizes", listSizes)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listSizes]);

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...listSizes];
        updatedSizes[index] = { ...updatedSizes[index], [field]: Number(value) };
        setListSizes(updatedSizes);
    };

    const handleAddSize = () => setListSizes([...listSizes, { id: "", quantity: 0 }]);

    const handleRemoveSize = (id) => setListSizes(listSizes.filter((item) => item.id !== id));

    const handleDescriptionChange = (content) => {
        setDescription(content);
        formik.setFieldValue("description", content);
    };

    if (isLoadingBrands || isLoadingCategories || isLoadingSizes) return <Loading />;

    if (isErrorBrands || isErrorCategories || isErrorSizes) {
        return (
            <div>
                {isErrorBrands && <div>Error loading brands: {errorBrands.message}</div>}
                {isErrorCategories && <div>Error loading categories: {errorCategories.message}</div>}
                {isErrorSizes && <div>Error loading sizes: {errorSizes.message}</div>}
            </div>
        );
    }

    return (
        <Form onSubmit={formik.handleSubmit} className="mb-5">
            <h1 className="fs-3">{product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h1>
            <InputGroup className="mb-3">
                <Form.Label htmlFor="name" visuallyHidden>
                    Tên sản phẩm
                </Form.Label>
                <Form.Control
                    id="name"
                    placeholder="Tên sản phẩm"
                    aria-label="Tên sản phẩm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    isInvalid={formik.touched.name && formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                </Form.Control.Feedback>
            </InputGroup>

            <InputGroup className="mb-3">
                <Form.Label htmlFor="shortDescription" visuallyHidden>
                    Mô tả ngắn
                </Form.Label>
                <Form.Control
                    id="shortDescription"
                    placeholder="Mô tả ngắn"
                    aria-label="Mô tả ngắn"
                    onChange={formik.handleChange}
                    value={formik.values.shortDescription}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Form.Label htmlFor="description">
                    Mô tả sản phẩm
                </Form.Label>
                <EditorComponent
                    value={description}
                    onEditorChange={handleDescriptionChange}
                    isInvalid={formik.touched.description && !!formik.errors.description}
                    feedback={formik.errors.description}
                />
            </InputGroup>

            <Row>
                <Col lg={6} xs={6}>
                    <InputGroup className="mb-3">
                        <Form.Label htmlFor="regularPrice" visuallyHidden>
                            Giá gốc
                        </Form.Label>
                        <Form.Control
                            id="regularPrice"
                            type="number"
                            placeholder="Giá gốc"
                            aria-label="Giá gốc"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.regularPrice}
                            isInvalid={formik.touched.regularPrice && formik.errors.regularPrice}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.regularPrice}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
                <Col lg={6} xs={6}>
                    <InputGroup className="mb-3">
                        <Form.Label htmlFor="salePrice" visuallyHidden>
                            Giá bán
                        </Form.Label>
                        <Form.Control
                            id="salePrice"
                            type="number"
                            placeholder="Giá bán"
                            aria-label="Giá bán"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.salePrice}
                            isInvalid={formik.touched.salePrice && formik.errors.salePrice}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.salePrice}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Row>

            <Row>
                <Col lg={6} xs={6}>
                    <CustomSelect
                        id="brand"
                        options={brands}
                        defaultValue="Hãng"
                        formik={formik}
                    />
                </Col>
                <Col lg={6} xs={6}>
                    <CustomSelect
                        id="category"
                        options={categories}
                        defaultValue="Loại"
                        formik={formik}
                    />
                </Col>
            </Row>

            <h5>Chọn kích cỡ và số lượng</h5>
            {formik.values.listSizes?.length === 0 && (
                <>
                    <Form.Text className="text-danger mb-3">
                        Chưa có kích cỡ sản phẩm
                    </Form.Text>
                    <br />
                </>
            )}
            {formik.values.listSizes.map((item, index) => (
                <Row key={index} className="mb-3">
                    <Col xs={6}>
                        <Form.Select
                            value={item.id}
                            onChange={(e) => handleSizeChange(index, "id", e.target.value)}
                            isInvalid={formik.touched.listSizes?.[index]?.id && formik.errors.listSizes?.[index]?.id}
                        >
                            <option value="">Chọn size</option>
                            {sizes.filter((size) =>
                                !formik.values.listSizes.some((selectedItem, selectedIndex) =>
                                    selectedItem.id === size.id && selectedIndex !== index
                                )
                            ).map((size) => (
                                <option key={size.id} value={size.id}>
                                    {size.name}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.listSizes?.[index]?.id}
                        </Form.Control.Feedback>
                    </Col>
                    <Col xs={4}>
                        <Form.Control
                            type="number"
                            placeholder="Số lượng"
                            value={item.quantity}
                            onChange={(e) => handleSizeChange(index, "quantity", e.target.value)}
                            isInvalid={formik.touched.listSizes?.[index]?.quantity && formik.errors.listSizes?.[index]?.quantity}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.listSizes?.[index]?.quantity}
                        </Form.Control.Feedback>
                    </Col>
                    <Col xs={2}>
                        <Button variant="danger" onClick={() => handleRemoveSize(item.id)}>
                            Xóa
                        </Button>
                    </Col>
                </Row>
            ))}
            <Button variant="outline-secondary" className="fw-bold mb-3" onClick={handleAddSize}>
                + Thêm kích cỡ
            </Button>

            <div className="mb-3">
                <Row>
                    {imagePreviews?.map((image, index) => (
                        <ItemImageDisplay
                            key={index}
                            image={image.path || image}
                            index={index}
                            removeImage={handleRemoveImage}
                        />
                    ))}
                </Row>
            </div>
            <InputGroup className="mb-3">
                <div
                    className="my-3 p-5 w-100 rounded d-flex justify-content-center align-items-center flex-column"
                    style={{
                        border: "1px dashed gray",
                        cursor: "pointer"
                    }}
                    onClick={triggerFileInput}
                >
                    <div className="d-flex justify-content-center align-items-center">
                        <span>Tải lên danh sách hình ảnh</span>
                        <MdOutlineFileUpload size={50} color="gray" />
                    </div>
                    <i>{`Lưu ý mỗi file không được vượt quá ${MAX_SIZE_IMAGE_MB}MB, Tải lên không quá ${MAXIMUM_NUMBER_IMAGE} hình ảnh`}</i>
                </div>
                <Form.Control
                    ref={fileInputRef}
                    type="file"
                    multiple
                    id="listImages"
                    aria-label="Upload file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                {
                    isSubmit && !(listImages?.length) &&
                    <Form.Control.Feedback type="invalid">
                        Chưa tải lên hình ảnh
                    </Form.Control.Feedback>
                }
            </InputGroup>
            <div className="d-flex justify-content-center">
                <Link to="/admin/products" className="btn btn-danger w-100">Quay lại</Link>
                <span className="mx-2"></span>
                <Button type="submit" variant="secondary" className="w-100">
                    {loading ? (
                        <>
                            <span>{product ? "Đang cập nhật sản phẩm" : "Đang thêm sản phẩm"} </span>
                            <Spinner animation="border" size="sm" role="status"></Spinner>
                        </>
                    ) : (
                        product ? "Cập nhật sản phẩm" : "Thêm sản phẩm"
                    )}
                </Button>
            </div>
        </Form>
    );
};
