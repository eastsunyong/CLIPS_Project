import { axios } from "utils";

// 후기 추가
export const addReview = async (promiseId, data) => {
  const answer = { result: true };
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    // const res = await axios.default.post(`/review/${promiseId}`, data, config);
    // console.log(res);
    await axios.default.post(`/review/${promiseId}`, data, config);
  } catch (err) {
    answer.result = false;
    console.log(err);
  }
  return answer;
};

// 후기 리스트 조회
export const getList = async (promiseId, data) => {
  const answer = { result: true };
  try {
    const res = await axios.default.post(`/review/${promiseId}`, data);
    console.log(res);
  } catch (err) {
    answer.result = false;
    console.log(err);
  }
  return answer;
};
