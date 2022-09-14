import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.size.m};
  border-radius: ${(props) => props.theme.size.xs};
  box-shadow: 0px 0.2rem 0.8rem rgba(75, 85, 99, 0.25);
`;

export default Card;
