import Swal from "sweetalert2";

export const confirmAlert = (
    func,
    text,
    icon = "question",
    showCancelButton = true,
    confirmButtonText = "Đồng ý",
    cancelButtonText = "Hủy"
) => {
    return Swal.fire({
        text: text,
        icon: icon,
        confirmButtonColor: "#d81f19",
        showCancelButton: showCancelButton,
        cancelButtonText: cancelButtonText,
        confirmButtonText: confirmButtonText,
    }).then((result) => {
        if (result.isConfirmed) {
            func();
        }
    });
};
export const errorAlert = (title = "Oops...", text) => {
    return Swal.fire({
        icon: "error",
        title: title,
        text: text,
        confirmButtonColor: "#aa1814",
    });
};

export const successAlert = (title, text) => {
    return Swal.fire({
        icon: "success",
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1500
    })
}