import Swer from "sweetalert2"

export const corfirmAlert = (messge) => {

    return Swer.fire({
        title: messge,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText:"취소",
        confirmButtonColor: '#0099ff',
        cancelButtonColor: '#d33',
        confirmButtonText: '초기화하겠습니다'
    }).then((result) => {
        if (result.isConfirmed) {
            Swer.fire(
                '삭제되었습니다!',
                '',
                 'success'
            )
        }
    })
}

export const successAlert = (messge) => {
    return Swer.fire({
        icon: "success",
        title: messge,
    })
}

//느낌표 아이콘
export const warningAlert = (messge) => {
    return Swer.fire({
        icon: 'warning',
        title: messge,
    })
}

//실패 아이콘
export const failAlert = (messge) => {
    return Swer.fire({
        icon: 'error',
        title: messge,
    })
}

//타임아웃 알림
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
        timer: 1100
    })
}

//없는 지역 알림창
export const areaWithout = () => {
    return Swer.fire({
        icon: 'warning',
        title: "찾을 수 없습니다",
        showConfirmButton: false,
        timer: 1000
    })
}
