import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, ol, li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
  
  .fcc {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default GlobalStyle;
