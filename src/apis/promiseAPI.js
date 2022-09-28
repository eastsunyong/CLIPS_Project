import { axios } from "utils";
import _ from "lodash";

// 리스트 조회
export const getList = async () => {
  const answer = { result: true };
  try {
    const res = await axios.default.get("/promise");

    // ios 크로스 브라우징 이슈 해결
    answer.list = _.map(res.data, (p) => {
      const iosDate = p.date.replaceAll(".", "/") + ":00";
      p.date = new Date(iosDate).getTime();
      return p;
    });
  } catch (err) {
    answer.result = false;
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
  }
  return answer;
};

// 약속 삭제
export const deletePromise = async (promiseId) => {
  const answer = { result: true };
  try {
    const res = await axios.default.delete(`/promise/${promiseId}`);
    answer.msg = res.data;
  } catch (err) {
    answer.result = false;
  }
  return answer;
};

// 약속 수정
export const modifyPromise = async (promiseId, data) => {
  const answer = { result: true };
  try {
    const res = await axios.default.put(`/promise/${promiseId}`, data);
    console.log(res);
    // answer.msg = res.data;
  } catch (err) {
    answer.result = false;
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
