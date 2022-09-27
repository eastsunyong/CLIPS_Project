import { axios } from "utils";
import _ from "lodash";

// 후기 추가
export const addReview = async (promiseId, data) => {
  const answer = { result: true };
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    await axios.default.post(`/review/${promiseId}`, data, config);
  } catch (err) {
    answer.result = false;
  }
  return answer;
};

// 후기 삭제
export const deleteReview = async (reviewId) => {
  const answer = { result: true };
  try {
    const res = await axios.default.delete(`/review/${reviewId}`);
    answer.msg = res.data.message;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};

// 후기 리스트 조회
export const getList = async () => {
  const answer = { result: true };
  try {
    const res = await axios.default.get(`/review`);

    // 콘텐츠 있는거만(필수값)
    answer.list = _.filter(res.data, (review) => review.content);
  } catch (err) {
    answer.result = false;
  }
  return answer;
};
