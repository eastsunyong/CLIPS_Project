import Swal from "sweetalert2";

export const corfirmAlert = (messge) => {
  return Swal.fire({
    title: messge,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "취소",
    confirmButtonColor: "#0099ff",
    cancelButtonColor: "#d33",
    confirmButtonText: "초기화하겠습니다",
  });
};

export const successAlert = (messge) => {
  return Swal.fire({
    icon: "success",
    title: messge,
  });
};

//느낌표 아이콘
export const warningAlert = (messge) => {
  return Swal.fire({
    icon: "warning",
    title: messge,
  });
};

//실패 아이콘
export const failAlert = (messge) => {
  return Swal.fire({
    icon: "error",
    title: messge,
  });
};

//타임아웃 알림
export const successTimerAlert = (messge) => {
  return Swal.fire({
    icon: "success",
    title: messge,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const avatarAlert = () => {
  return Swal.fire({
    icon: "warning",
    title: "구현중인 기능입니다",
    showConfirmButton: false,
    timer: 1100,
  });
};

//없는 지역 알림창
export const areaWithout = () => {
  return Swal.fire({
    icon: "warning",
    title: "찾을 수 없습니다",
    showConfirmButton: false,
    timer: 1000,
  });
};

//----최신

// 컨펌
export const confirm = (msg, type) => {
  return Swal.fire({
    title: msg,
    icon: type,
    confirmButtonText: "확인",
    confirmButtonColor: "#00D685",
    showCancelButton: true,
    cancelButtonText: "취소",
    cancelButtonColor: "#FF5252",
  });
};

// 타이머
export const timer = (msg, type) => {
  return Swal.fire({
    title: msg,
    icon: type,
    timer: 1000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
