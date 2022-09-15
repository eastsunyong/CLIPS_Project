import styled from "styled-components";

const MapControl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: ${(props) => props.theme.size.m};
`;

export default MapControl;
