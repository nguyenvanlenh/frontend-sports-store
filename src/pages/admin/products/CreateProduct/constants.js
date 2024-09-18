import * as Yup from "yup";
import { MAXIMUM_NUMBER_PRODUCTS } from "../../../../utils/constant";
export const validationProduct = Yup.object({
    name: Yup.string().required("Tên sản phẩm không được để trống"),
    shortDescription: Yup.string(),
    description: Yup.string().required("Mô tả sản phẩm không được để trống"),
    salePrice: Yup.number()
        .min(1000, "Giá bán sản phẩm phải lớn hơn 1000 và nhỏ hơn 1 tỷ")
        .max(1000000000, "Giá bán sản phẩm phải nhỏ hơn 1 tỷ")
        .required("Giá bán sản phẩm không được để trống"),
    regularPrice: Yup.number()
        .min(1000, "Giá sản phẩm phải lớn hơn 1000 và nhỏ hơn 1 tỷ")
        .max(1000000000, "Giá sản phẩm phải nhỏ hơn 1 tỷ")
        .required("Giá sản phẩm không được để trống"),
    brand: Yup.number().required("Hãng sản phẩm không được để trống"),
    category: Yup.number().required("Loại sản phẩm không được để trống"),
    listImages: Yup.array().nullable(),
    listSizes: Yup.array()
        .of(
            Yup.object({
                id: Yup.number()
                    .min(1, "ID phải lớn hơn hoặc bằng 1")
                    .required("ID không được để trống"),
                quantity: Yup.number()
                    .min(1, "Số lượng phải lớn hơn hoặc bằng 1")
                    .max(MAXIMUM_NUMBER_PRODUCTS, `Số lượng phải nhỏ hơn hoặc bằng ${MAXIMUM_NUMBER_PRODUCTS}`)
                    .required("Số lượng không được để trống")
            })
        )
        .min(1, "Danh sách kích cỡ phải có ít nhất một phần tử")
        .required("Danh sách kích cỡ không được để trống"),
});
