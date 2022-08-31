import { kakaoAxios } from "utils/axios";

export const searchAddress = async (address) => {
  let answer = { result: null };
  try {
    const res = await kakaoAxios.get(`local/search/address.json?query=${address}`);
    answer.result = res.data.documents.length !== 0;
  } catch (err) {
    console.log(err);
    answer.result = false;
  }
  return answer;
};
