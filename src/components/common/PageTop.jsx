import styled from "styled-components";

const PageTop = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: calc(${(props) => props.theme.size.xs} * 2) ${(props) => props.theme.size.m};

  & * {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > :first-child > :first-child {
    margin-right: ${(props) => props.theme.size.m};
  }

  .title {
    font-size: ${(props) => props.theme.size.xl};
    font-weight: bold;
  }

  .icon {
    cursor: pointer;
    width: calc(${(props) => props.theme.size.xs} * 2);
    height: calc(${(props) => props.theme.size.xs} * 2);
    svg {
      width: ${(props) => props.theme.size.xl};
      height: ${(props) => props.theme.size.xl};
    }
  }
`;

export default PageTop;
