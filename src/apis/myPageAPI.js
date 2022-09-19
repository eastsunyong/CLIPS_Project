import { axios } from "utils";

// 유저 조회
export const getUser = async () => {
  const answer = { result: true };
  try {
    const res = await axios.default.get("/profile");
    console.log(res);
  } catch (err) {
    answer.result = false;
    console.log(err);
  }
  return answer;
};
