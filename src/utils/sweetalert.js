import Swer from "sweetalert2"

export const successAlert = (messge)  => {
    return Swer.fire({
        icon: "success",
        title: messge,
    })
}

export const failAlert = (messge) => {
    return Swer.fire({
        icon: 'error',
        title: messge,
    })
}

export const successTimerAlert = (messge) => {
    return Swer.fire({
        icon: 'success',
        title: messge,
        showConfirmButton: false,
        timer: 1500
    })
}

export const avatarAlert = () => {
        return Swer.fire({
        icon: 'warning',
        title: "구현중인 기능입니다",
        showConfirmButton: false,
        timer: 1200
    })
}