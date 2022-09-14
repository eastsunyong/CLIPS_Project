// rem이란 : 최상위 엘리먼츠 폰트 사이즈에 영향을 받아 가변으로 크기가 지정됨
// 현재 1rem = 10px
const size = {
  xs: "1.2rem", // 12px
  s: "1.4rem", // 14px
  m: "1.6rem", // 16x
  l: "1.8rem", // 18px
  xl: "2rem", // 20px
};

const color = {
  brand: "#0099ff",
  disable: "gray",
  hidden: "rgba(0,0,0,0)",
};

const level = {
  back: -1,
  default: 0,
  front: {
    low: 5,
    middle: 10,
    top: 100,
  },
};

const theme = {
  size: size,
  color: color,
  level: level,
  lineHeight: "8rem",
};

export default theme;
