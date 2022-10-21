import { myPageAnswer } from "type/mypageType";
import { axios } from "utils";

// 유저 조회
export const getUser = async () => {
  const answer: myPageAnswer = { result: true };
  try {
    const res = await axios.default.get("/auth/mypage");
    answer.user = res.data.data;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};
