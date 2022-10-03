import styled from "styled-components";

/**
 * 1. selected : Boolean
 * 2. size : Stirng => 사이즈 조절(sm)
 */
const Chip = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: max-content;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 0.8rem;
  }

  padding: ${(props) => (props.size === "sm" ? "0.6rem 1.4rem" : "1.2rem 1.6rem")};

  background: ${(props) => (props.selected ? props.theme.color.brand : "white")};
  border: none;
  box-shadow: 0 0.2rem 0.8rem rgba(17, 24, 39, 0.25);
  border-radius: 4rem;

  color: ${(props) => (props.selected ? "white" : "black")};
  font-size: ${(props) => (props.size === "sm" ? "1.2rem" : "1.4rem")};
  font-weight: bold;
`;

export default Chip;
