import styled from "styled-components";

const ModalTop = styled.div`
  position: sticky;
  top: 0;
  justify-content: flex-start !important;
  background: white;
  padding: ${(props) => props.theme.size.s};
  font-size: calc(${(props) => props.theme.fontSize.s} * 1.2);
  font-weight: bold;

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default ModalTop;
