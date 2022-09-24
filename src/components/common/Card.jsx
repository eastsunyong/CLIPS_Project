import styled from "styled-components";

const Card = styled.div`
  padding: 1.6rem;

  box-shadow: 0px 2px 8px rgba(17, 24, 39, 0.25);
  border-radius: 8px;

  font-size: 1.2rem;
  color: ${(props) => props.theme.color.black.light};

  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .cardTitle {
    justify-content: space-between;
    color: black;
    font-size: 1.6rem;
    font-weight: bold;
  }

  .contentIcon {
    margin-right: 0.8rem;
  }

  & > *:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;

export default Card;
