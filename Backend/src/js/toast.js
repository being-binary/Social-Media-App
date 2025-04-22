class AppToast {
    toastSuccess(message) {
        Toastify({
            text: message,
            className: "success",
            style: {
                background: "linear-gradient(to right,rgb(50, 176, 0),rgb(61, 201, 73))", /* Green shades for positivity */
            },
            gravity: "top", // `top` or `bottom`
            position: "center",
            duration: 1000
        }).showToast();
    }
    toastInfo(message) {
        Toastify({
            text: message,
            className: "info",
            style: {
              background: "linear-gradient(to right, #2193b0, #6dd5ed)",
            },
            gravity: "top", // `top` or `bottom`
            position: "center",
            duration: 1000
        }).showToast();
    }
    toastError(message) {
        Toastify({
            text: message,
            className: "error",
            style: {
              background: "linear-gradient(to right, #ff5f6d, #ffc371)",
            },
            gravity: "top", // `top` or `bottom`
            position: "center",
            duration: 1000
        }).showToast();
    }
    toastWarning(message) {
        Toastify({
            text: message,
            className: "warning",
            style: {
              background: "linear-gradient(to right, #f7b733,rgb(252, 218, 26))",
            },
            gravity: "top", // `top` or `bottom`
            position: "center",
            duration: 1000
        }).showToast();
    }
}

const toast =  new AppToast()