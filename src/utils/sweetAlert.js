import Swal from "sweetalert2";

export const confirmAlert = (
    callBack,
    text,
    callBackCancel,
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
            callBack();
        }
        if (typeof callBackCancel === "function") {
            callBackCancel();
        }
    });
};
export const errorAlert = (title = "Oops...", text, time = 3500) => {
    return Swal.fire({
        icon: "error",
        title: title,
        text: text,
        timer: time,
        confirmButtonColor: "#aa1814",
    });
};

export const successAlert = (title, text, time = 1500, callback) => {
    return Swal.fire({
        icon: "success",
        title: title,
        text: text,
        showConfirmButton: false,
        timer: time
    }).then(() => {
        if (typeof callback === "function") {
            callback();
        }
    })
}