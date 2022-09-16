import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
    line-height: 1;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "SUIT", sans-serif;
  }

  ul, ol, li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  // 모바일에서 파란 하이라이트 없애기
  input,
  textarea,
  button,
  select,
  a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  
  input::-webkit-input-placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  input::-moz-placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  input:-ms-input-placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  input:-moz-placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  input::placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  
  .fcc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyle;
