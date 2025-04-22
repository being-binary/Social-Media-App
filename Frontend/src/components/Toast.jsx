import { ToastContainer, toast , Slide} from 'react-toastify';


export const toastsuccess = (message) => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
    })
}

export const toastinfo = (message) => {
    toast.info(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
    })
}


export const toastwarning = (message) => {
    toast.warning(message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Slide,
    })
}

export const toasterror = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 2000,
    })
}



