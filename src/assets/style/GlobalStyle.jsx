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
  // 모바일에서 파란 하이라이트 없애기
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    &::-webkit-scrollbar {
      display: none;
    }
  }

  ul, ol, li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
  
  input::-webkit-input-placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  input::-moz-placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  input:-ms-input-placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  input:-moz-placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }
  input::placeholder { color: ${(props) => props.theme.color.disable}; font-size: 95%; }

  // 아이콘 크기
  .lg {
    width: 2.1rem;
    height: 2.1rem;
  }

  .md {
    width: 1.75rem;
    height: 1.75rem;
  }

  .sm {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

export default GlobalStyle;
