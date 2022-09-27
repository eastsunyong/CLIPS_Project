import React, { memo, useState } from "react";
import styled from "styled-components";

import { Btn } from "components/common";
import { RightArrow } from "assets/icons";
import { OpacityModal } from "components/common";
import { Privacy } from ".";

const SignupStep1 = ({ setNext }) => {
  const privacySelect = [
    { id: 0, title: "이용약관 동의 (필수)" },
    { id: 1, title: "개인정보의 제 3자 제공 동의 (필수)" },
  ];

  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState([]);

  //정보 동의 얻는 모달창
  const [toggle, setToggle] = useState(false)

  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, id]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
      const idArray = [];
      privacySelect.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
    }
  };
  return (
    <>
      <div className="inputArea">
        <Title>CLIPs 회원가입을 위해</Title>
        <Title>서비스 이용약관에 동의해주세요</Title>
        <SelectBox>
          <AllSelcet>
            <input
              type="checkbox"
              onChange={(e) => handleAllCheck(e.target.checked)}
              // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
              checked={checkItems.length === privacySelect.length ? true : false}
            />
            <p>전체 동의합니다.</p>
          </AllSelcet>
          <OtherSelect>
            {privacySelect?.map((data, key) => (
              <RightGo key={key}>
                <div>
                  <input
                    type="checkbox"
                    onChange={(e) => handleSingleCheck(e.target.checked, data.id)}
                    // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                    checked={checkItems.includes(data.id) ? "unable" : ""}
                  />
                  <p>{data.title}</p>
                </div>
                <div onClick={()=> {setToggle(true)}} className="icon">
                  <RightArrow className="sm" />
                </div>
              </RightGo>
            ))}
          </OtherSelect>
        </SelectBox>
      </div>
      {checkItems.length === privacySelect.length ? (
        <Btn
          onClick={(e) => {
            e.preventDefault();
            setNext(true);
          }}
        >
          다음
        </Btn>
      ) : (
        <DisableBtn>다음</DisableBtn>
      )}
      <RenewalModal toggle={toggle}>
          <Privacy setToggle={setToggle}/>
      </RenewalModal>
    </>
  );
};

export default memo(SignupStep1);

const Title = styled.div`
  margin-bottom: 1rem;

  font-weight: bold;
  font-size: 1.6rem;
`;

const SelectBox = styled.div`
  width: 100%;
  p {
    margin-left: 1.5rem;
  }
`;

const AllSelcet = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: 5rem;

  border-bottom: 0.1rem solid #ccc;

  font-weight: 700;
  font-size: 1.6rem;
`;

const OtherSelect = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  div {
    display: flex;
    align-items: center;
    height: 5rem;
  }

  p {
    font-weight: 400;
    font-size: 1.6rem;
  }
`;
const RightGo = styled.div`
  display: flex;
  justify-content: space-between;

  .icon {
    cursor: pointer;
    color: ${(props) => props.theme.color.brand};
  }
`;

const DisableBtn = styled(Btn)`
  opacity: 0.5;
`;

const RenewalModal = styled(OpacityModal)`
  background: rgba(17, 24, 39, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`
