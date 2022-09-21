import axios from "axios";
import * as reactJwt from "react-jwt";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

instance.interceptors.request.use(async (config) => {
  //   const accessToken = getToken().accessToken;
  //   request.headers.Authorization = `Bearer ${accessToken}`;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) return config;

  //기본 내장 메서드
  // isExpiredTkn 는 만료가 됐을시 트루

  const isExpiredTkn = reactJwt.isExpired(accessToken);
  if (isExpiredTkn === true) {
    //True인 경우
    // 1. 토큰이 만료된 경우
    // 2. 토큰이 없거나 이상한것이 들어있을 경우
    try {
      //성공한 경우
      // 1. 만료되지 않은 올바른 refreshToken이 도착해서 새accessToken을 반환하는 경우
      //액세스 토큰만 재발급
      const refreshToken = localStorage.getItem("refreshToken");
      const respense = await axios.post(process.env.REACT_APP_SERVER + `/auth/token`, { refreshToken });

      localStorage.setItem("accessToken", respense.data.accessToken);
      //리퀘스트 할거다
      config.headers.Authorization = `Bearer ${respense.data.accessToken}`;
      return config;
    } catch (error) {
      // 에러가뜬경우 (status가 4xx, 5xx인 경우)
      // 1. 토큰이 아닌게 왔을 경우
      // 2. 다른사람이 만든 토큰이 왔을 경우
      // 3. 만료된 refreshToken이 왔을 경우
      // 4. 알 수 없는 에러
      localStorage.clear();
      window.location.reload();
      return config;
    }
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  }
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
