import { axios } from "utils";

// 로그인
export const login = async (data) => {
  const answer = { result: true };
  try {
    const res = await axios.default.post("/auth/signin", data);
    answer.accessToken = res.data.accessToken;
    answer.refreshToken = res.data.refreshToken;
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
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key]?.length > 0) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.default.post("/auth/signup", formData, config);
    answer.msg = res.data.message;
  } catch (err) {
    answer.result = false;
    answer.msg = "회원가입에 실패하셨습니다.";
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
    await axios.default.delete("/auth/signout", {
      data: {
        refreshToken,
      },
    });
    localStorage.clear();
  } catch (err) {
    answer.result = false;
    answer.msg = err.response;
  }
  return answer;
};
