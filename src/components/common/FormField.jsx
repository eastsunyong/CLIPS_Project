import styled from "styled-components";

const FormField = styled.form`
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;

  padding-top: 1.6rem;

  .inputArea {
    flex: 1;
    overflow: scroll;
  }

  .inputArea > *:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  .titie {
    margin-bottom: 0.8rem;

    font-size: 1.2rem;
    font-weight: bold;
  }

  .error {
    margin-top: 0.8rem;

    color: ${(props) => props.theme.color.error.main};
    font-size: 1.2rem;
  }
`;

export default FormField;
