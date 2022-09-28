import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isExpired } from "react-jwt";

import { setLogin } from "store/modules/loginSlice";

const KaKaoLogin = () => {
  const search = window.location.search;
  const nav = useNavigate();
  const dispatch = useDispatch();

  // 토큰 유효성 검증 및 로컬스토리지 올리기
  const jwtValide = (token) => {
    const type = Object.keys(token)[0];
    const value = token[type];
    const flag = !isExpired(value);
    if (flag) {
      localStorage.setItem(type, value);
    }
    return flag;
  };

  useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      const accessToken = params.get("accesstoken");
      const refreshToken = params.get("refreshToken");
      if (jwtValide({ accessToken }) && jwtValide({ refreshToken })) {
        dispatch(setLogin(accessToken));
      }
    }
    nav("/");
  }, []);

  return <></>;
};

export default KaKaoLogin;
