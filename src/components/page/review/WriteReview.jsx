import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { Btn, Card, InputDiv, Modal, PageTop, TextBox } from "components/common";
import { DeleteIcon, LeftArrowIcon, LocationIcon, PlusIcon } from "assets/iconList";
import { reviewAPI } from "apis";
import { useEffect } from "react";

const WriteReview = (props) => {
  const promise = props.writeToggle.promise;

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (props.writeToggle.toggle) {
      reset();
      setFileList([]);
      setImgPreview([]);
    }
  }, [props.writeToggle]);

  // 멀티 업로드 and 미리보기
  const [fileList, setFileList] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const maxCnt = 7;
  const selectMutiFile = (files) => {
    const dt = new DataTransfer();
    const remainCnt = maxCnt - fileList.length;
    if (!fileList) {
      if (files.length > maxCnt) alert(`사진은 최대 ${maxCnt}개 가능`);
      Array.from(files)
        .filter((file, i) => i < maxCnt)
        .forEach((file) => {
          dt.items.add(file);
          setImgPreview((imgPreview) => [...imgPreview, URL.createObjectURL(file)]);
        });
      setFileList(dt.files);
      return;
    }
    if (remainCnt < files.length) alert(`사진은 최대 ${maxCnt}개 가능`);
    Array.from(fileList).forEach((file) => dt.items.add(file));
    Array.from(files)
      .filter((file, i) => i < remainCnt)
      .forEach((file) => {
        dt.items.add(file);
        setImgPreview((imgPreview) => [...imgPreview, URL.createObjectURL(file)]);
      });
    setFileList(dt.files);
  };

  // 이미지 선택 취소
  const cancelSelected = (fileIndex) => {
    const dt = new DataTransfer();
    Array.from(fileList)
      .filter((file, i) => i !== fileIndex)
      .forEach((file) => dt.items.add(file));
    setFileList(dt.files);

    setImgPreview(imgPreview.filter((view, i) => i !== fileIndex));
  };

  // submit후 데이터 세팅 및 결과값
  const setSendData = async (data) => {
    const formData = new FormData();
    formData.append("content", data.content);
    for (let i = 0; i < fileList.length; i++) {
      formData.append("image", fileList[i]);
    }

    const answer = await reviewAPI.addReview(promise.promiseId, formData);
    if (answer.result) {
      props.setWriteToggle({ promise, toggle: !props.writeToggle.toggle });
    }
  };

  return (
    <CustomModal toggle={props.writeToggle.toggle}>
      <PageTop>
        <div>
          <div
            className="icon"
            onClick={() => {
              props.setWriteToggle({ promise, toggle: !props.writeToggle.toggle });
            }}
          >
            <LeftArrowIcon />
          </div>
          <div className="title">후기 작성하기</div>
        </div>
      </PageTop>
      <Section>
        <CustomCard key={promise?.promiseId}>
          <TextBox>
            <div>
              <div className="title">{promise?.title}</div>
              <div>{promise?.countFriend !== 0 ? `회원님 외 ${promise?.countFriend}명` : "자신과의 약속"}</div>
              <div className="info">
                <span>{promise?.date}</span>
                <span>
                  <span className="pin">
                    <LocationIcon />
                  </span>
                  {promise?.location ? promise.location : "장소를 불러올 수 없습니다."}
                </span>
              </div>
            </div>
          </TextBox>
        </CustomCard>
        <FormArea onSubmit={handleSubmit(setSendData)}>
          <div>
            <p className="title">후기 남기기</p>
            <InputDiv className="inner">
              <textarea {...register("content", { required: "후기 내용은 필수입니다.", minLength: 5 })} placeholder="다녀오신 약속은 어땠나요?" />
            </InputDiv>
          </div>

          <div>
            <p className="title">사진 추가</p>
            <ImgArea>
              <FileAddBtn htmlFor="file">
                <PlusIcon />
              </FileAddBtn>
              {imgPreview.map((image, i) => {
                return (
                  <PreviewImg key={i}>
                    <img src={image} alt={`프리뷰${i}`} />
                    <div
                      onClick={() => {
                        cancelSelected(i);
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  </PreviewImg>
                );
              })}
            </ImgArea>
            <input
              {...register("image")}
              hidden
              id="file"
              type="file"
              accept=".jpg, .png"
              multiple
              onChange={(e) => selectMutiFile(e.target.files)}
            />
          </div>
          <Btn>저장하기</Btn>
        </FormArea>
      </Section>
    </CustomModal>
  );
};

export default WriteReview;

const CustomModal = styled(Modal)`
  display: flex;
  flex-flow: column;
`;

const Section = styled.div`
  flex: 1;
  overflow: scroll;

  padding: ${(props) => props.theme.size.m};

  &::-webkit-scrollbar {
    display: none;
  }
`;

const CustomCard = styled(Card)`
  cursor: pointer;
  display: flex;

  margin-bottom: calc(${(props) => props.theme.size.xs} * 2);

  .info {
    display: flex;
    align-items: center;
    margin: ${(props) => props.theme.size.m} 0;
    & > :last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: ${(props) => props.theme.size.m};
      .pin {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: calc(${(props) => props.theme.size.xs} / 2);
        fill: ${(props) => props.theme.color.disable};
      }
    }
  }
  .icon {
    cursor: pointer;
    width: ${(props) => props.theme.size.xl};
    height: ${(props) => props.theme.size.xl};
    display: flex;
    justify-content: center;
  }
`;

const FormArea = styled.form`
  & > * {
    margin-bottom: ${(props) => props.theme.size.m};
  }
  .title {
    margin-bottom: calc(${(props) => props.theme.size.m} / 2);
    font-size: ${(props) => props.theme.size.s};
    font-weight: bold;
  }
  .inner {
    height: 16rem;
  }
`;

const ImgArea = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 8.2rem;
    height: 8.2rem;

    border-radius: ${(props) => props.theme.size.xs};
    margin-top: calc(${(props) => props.theme.size.xs} / 3);
  }
  & > *:not(:first-child, :nth-child(5)) {
    margin-left: calc(${(props) => props.theme.size.xs} / 3);
  }
`;

const FileAddBtn = styled.label`
  background: rgba(75, 85, 99, 0.1);
  fill: rgba(75, 85, 99, 0.2);
`;

const PreviewImg = styled.div`
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }

  div {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    margin: calc(${(props) => props.theme.size.xs} / 2);

    border-radius: 50%;

    fill: #4b5563;
    background: white;
  }
`;
