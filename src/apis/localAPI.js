import { kakaoAxios } from "utils/axios";

// 입력한 주소가 존재하는 곳인지 확인
// 주소 => 좌표로 변환
export const searchAddress = async (address) => {
  let answer = { result: null };
  try {
    const res = await kakaoAxios.get(`local/search/address.json?query=${address}`);
    answer.docs = res.data.documents;
    answer.result = true;
  } catch (err) {
    console.log(err);
    answer.result = false;
  }
  return answer;
};

// 좌표 => 주소로 변환
export const addressTransfer = async (x, y) => {
  let answer = { result: null };
  try {
    const res = await kakaoAxios.get(`local/geo/coord2address.json?x=${x}&y=${y}`);
    answer.docs = res.data.documents;
    answer.result = true;
  } catch (err) {
    console.log(err);
    answer.result = false;
  }
  return answer;
};
