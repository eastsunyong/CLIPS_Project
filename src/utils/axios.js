import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const kakaoAxios = axios.create({
  baseURL: "https://dapi.kakao.com/v2",
  timeout: 2000,
  headers: {
    Authorization: "KakaoAK " + process.env.REACT_APP_KAKAORESTKEY,
    "Content-Type": "application/json",
  },
});
export default instance;
