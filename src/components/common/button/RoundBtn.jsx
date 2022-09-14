import styled from "styled-components";

const RoundBtn = styled.button`
  display: flex;
  align-items: center;
  padding: ${(props) =>
    props.type === "small" ? `calc(${props.theme.size.s} / 2) ` + props.theme.size.s : props.theme.size.s + " " + props.theme.size.m};

  border: none;
  border-radius: calc(${(props) => props.theme.size.s} * 3);
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.2);
  background: ${(props) => (props.selected ? props.theme.color.brand : "white")};

  font-size: ${(props) => (props.type === "small" ? props.theme.size.xs : props.theme.size.s)};
  font-weight: bold;
  white-space: nowrap;

  color: ${(props) => (props.selected ? "white" : "black")};
  fill: ${(props) => (props.selected ? "white" : "inherit")};
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > :nth-child(2) {
    margin-left: calc(${(props) => props.theme.size.m} / 2);
  }
`;

export default RoundBtn;
