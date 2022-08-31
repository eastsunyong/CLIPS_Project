import Modal from "components/common/Modal";
import { useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  flex-flow: column;
  min-width: 100%;
  min-height: 100%;
  padding: 0 2rem 2rem 2rem;
`;

export const Title = styled.div`
  font-size: 4rem;
  margin-bottom: 2rem;
`;

export const BntArea = styled.div`
  button:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const Btn = styled.button`
  font-weight: bold;
  color: white;

  background: rgb(255, 204, 204);
  border: 0.1rem solid rgb(255, 204, 204);
  border-radius: 2.5rem;

  &:hover {
    background: white;
    color: rgb(255, 204, 204);
  }
`;

export const LocaionSearchModal = (props) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Modal toggle={toggle}>
      <div></div>
    </Modal>
  );
};
