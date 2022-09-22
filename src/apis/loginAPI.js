import { axios } from "utils";

// 로그인
export const login = async (data) => {
  const answer = { result: true };
  try {
    const res = await axios.default.post("/auth/signin", data);
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    answer.msg = res.data.message;
  } catch (err) {
    answer.result = false;
    answer.msg = err.response.data.message;
  }
  return answer;
};

// 회원가입
export const signup = async (data) => {
  const answer = { result: true };
  try {
    const res = await axios.default.post("/auth/signup", data);
    answer.msg = res.data.message;
  } catch (err) {
    answer.result = false;
    answer.msg = err.response.data.message;
  }
  return answer;
};

//중복 체크
export const dupCheck = async (data) => {
  const answer = { result: true };
  try {
    const res = await axios.default.post(`/auth/${Object.keys(data)[0]}`, data);
    answer.msg = res.data.message;
  } catch (err) {
    answer.result = false;
    answer.msg = err.response.data.message;
  }
  return answer;
};

//로그아웃 
export const logout = async (refreshToken) => {
  const answer = { result: true };
  try {
    const res = await axios.default.delete("/auth/signout", {
      data: {
        refreshToken
      }
    });
    console.log(res)
    localStorage.clear()
  } catch (err) {
    answer.result = false;
    answer.msg = err.response;
  }
  return answer;
};
