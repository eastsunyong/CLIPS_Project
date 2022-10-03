import styled from "styled-components";

/**
 * 1. bgColor : Boolean
 */
const TextField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 0.6rem 1.2rem;

  background: white;
  border: 0.1rem solid ${(props) => (props.bdColor ? props.theme.color.error.main : props.theme.color.disable)};
  border-radius: 0.8rem;

  input,
  textarea {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    font-size: 1.6rem;
  }
  textarea {
    resize: none;
    min-height: 10rem;
  }
`;

export default TextField;
