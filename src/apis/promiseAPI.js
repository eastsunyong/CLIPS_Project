import { axios } from "utils";

// 리스트 조회
export const getList = async () => {
  const answer = { result: true };
  try {
    const res = await axios.default.get("/promise");
    answer.list = res.data;
  } catch (err) {
    answer.result = false;
    console.log(err);
  }
  return answer;
};

// 상세조회
export const getPromise = async (promiseId) => {
  const answer = { result: true };
  try {
    const res = await axios.default.get(`/promise/${promiseId}`);
    answer.promise = res.data;
  } catch (err) {
    answer.result = false;
    console.log(err);
  }
  return answer;
};

// 약속 생성
export const addList = async (list) => {
  const answer = { result: true };
  try {
    const res = await axios.default.post("/promise", list);
    answer.msg = res.data;
  } catch (err) {
    answer.result = false;
    console.log(err);
  }
  return answer;
};

// 친구 찾기
export const findFriend = async (nickname) => {
  const answer = { result: true };
  try {
    const sendData = { friendList: [nickname] };
    const res = await axios.default.post("/promise/user/check", sendData);
    answer.friend = res.data;
  } catch (err) {
    answer.result = false;
    answer.msg = err.response.data;
  }
  return answer;
};
