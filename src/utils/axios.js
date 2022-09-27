import axios from "axios";
import { isExpired } from "react-jwt";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

instance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return config;

  if (isExpired(accessToken)) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const respense = await axios.post(process.env.REACT_APP_SERVER + `/auth/token`, { refreshToken });
      localStorage.setItem("accessToken", respense.data.accessToken);

      config.headers.Authorization = `Bearer ${respense.data.accessToken}`;
      return config;
    } catch (error) {
      localStorage.clear();
      window.location.reload();
      return config;
    }
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
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
