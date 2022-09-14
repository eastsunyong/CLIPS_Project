import styled from "styled-components";

const BottomBtn = styled.input`
  border-radius: ${(props) => props.theme.size.s};
  background: ${(props) => props.theme.themeColor};
  color: white;
  font-weight: bold;
`;

export default BottomBtn;
