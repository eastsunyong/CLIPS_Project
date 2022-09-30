import Swal from "sweetalert2";

// 성공 아이콘
export const successAlert = (messge) => {
  return Swal.fire({
    target: document.querySelector("#serviceItem"),
    customClass: {
      container: "serviceAlert",
    },
    icon: "success",
    title: messge,
  });
};

// 느낌표 아이콘
export const warningAlert = (messge) => {
  return Swal.fire({
    target: document.querySelector("#serviceItem"),
    customClass: {
      container: "serviceAlert",
    },
    icon: "warning",
    title: messge,
  });
};

// 실패 아이콘
export const failAlert = (messge) => {
  return Swal.fire({
    target: document.querySelector("#serviceItem"),
    customClass: {
      container: "serviceAlert",
    },
    icon: "error",
    title: messge,
  });
};

//----최신

// 컨펌
export const confirm = (msg, type) => {
  return Swal.fire({
    target: document.querySelector("#serviceItem"),
    customClass: {
      container: "serviceAlert",
    },
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
    target: document.querySelector("#serviceItem"),
    customClass: {
      container: "serviceAlert",
    },
    title: msg,
    icon: type,
    timer: 1000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
