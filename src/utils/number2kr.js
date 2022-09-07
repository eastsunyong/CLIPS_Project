const number2kr = (number) => {
  const kr = {
    1: "첫",
    2: "두",
    3: "세",
    4: "네",
    5: "다섯",
    6: "여섯",
    7: "일곱",
    8: "여덟",
    9: "아홉",
    10: "열",
    11: "열한",
    12: "열두",
  };
  return kr[number];
};

export default number2kr;