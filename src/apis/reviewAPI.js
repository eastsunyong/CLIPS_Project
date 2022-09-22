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
  }
  return answer;
};

// 후기 삭제
export const deleteReview = async (reviewId) => {
  const answer = { result: true };
  try {
    const res = await axios.default.delete(`/review/${reviewId}`);
    console.log(res);
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

    let list = [];
    res.data.reviewImageData.forEach((review, i) => {
      if (review.length !== 0) {
        let tmp = {};
        tmp.reviewId = review[0].reviewId;
        tmp.image = review[0]["ReviewImages.image"];
        tmp.content = review[0].content;

        tmp.promiseUserId = res.data.promiseData[i].userId;
        tmp.promiseId = res.data.promiseData[i].promiseId;
        tmp.date = res.data.promiseData[i].date;
        tmp.location = res.data.promiseData[i].location;
        list.push(tmp);
      }
    });

    answer.list = list;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};
