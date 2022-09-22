import { decodeToken } from "react-jwt";

const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");

export const getUserId = () => {
  return decodeToken(accessToken).userId;
};
