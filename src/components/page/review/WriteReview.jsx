import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

import { Btn, Card, FormField, Modal, PageField, TextField } from "components/common";
import { CalendarI, Delete, LeftArrow, Location, My, Plus } from "assets/icons";
import { endWriteReview, __addReview } from "store/modules/reviewSlice";

const WriteReview = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.review.selectPromise);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selected.toggle) {
      reset();
      setFileList([]);
      setImgPreview([]);
    }
  }, [selected.toggle, reset]);

  // 멀티 업로드 and 미리보기
  const [fileList, setFileList] = useState([]);
  const [imgPreview, setImgPreview] = useState([]);
  const maxCnt = 5;

  const selectMutiFile = async (files) => {
    const dt = new DataTransfer();
    const remainCnt = maxCnt - fileList.length;

    if (!fileList.length) {
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

  // registerOpt
  const contentOpt = {
    required: "후기는 필수 입력입니다",
    minLength: { value: 1, message: "최소 1글자 이상 입력해주세요" },
    maxLength: { value: 100, message: "100 글자 이하로 입력해주세요" },
  };

  return (
    <Modal toggle={selected.toggle}>
      <PageField
        icon={
          <div
            className="btn"
            onClick={() => {
              dispatch(endWriteReview());
            }}
          >
            <LeftArrow className="md" />
          </div>
        }
        title="후기 작성하기"
      >
        <Container>
          <Card key={selected.promise?.promiseId}>
            <div className="cardTitle">{selected.promise?.title}</div>

            <div>
              <div className="contentIcon">
                <My className="sm" />
              </div>
              {selected.promise && selected.promise.countFriend !== 0 ? `회원님 외 ${selected.promise.countFriend}명` : "자신과의 약속"}
            </div>

            <div>
              <div className="contentIcon">
                <CalendarI className="sm" />
              </div>
              {selected.promise ? dayjs(selected.promise.date).format("YYYY.MM.DD HH:mm") : null}
            </div>

            <div>
              <div className="contentIcon">
                <Location className="sm" />
              </div>
              {selected.promise?.location ? selected.promise.location : "장소를 불러올 수 없습니다."}
            </div>
          </Card>

          <FormField
            onSubmit={handleSubmit((data) => {
              data.image = fileList;
              dispatch(__addReview({ promiseId: selected.promise.promiseId, data }));
            })}
          >
            <div className="inputArea">
              <div>
                <p className="titie">후기 남기기</p>
                <TextField bdColor={!!errors.content?.message}>
                  <textarea autoComplete="off" placeholder="다녀오신 약속은 어땠나요?" {...register("content", contentOpt)} />
                </TextField>
                <p className="error">{errors.content?.message}</p>
              </div>

              <div>
                <p className="titie">사진 추가</p>
                <ImgPreviewArea>
                  <ImgAddBtn htmlFor="file">
                    <Plus className="md" />
                  </ImgAddBtn>

                  {imgPreview.map((blob, i) => {
                    return (
                      <ImgPreview key={blob + i}>
                        <img src={blob} alt="미리보기" />
                        <div
                          className="deleteBtn"
                          onClick={() => {
                            cancelSelected(i);
                          }}
                        >
                          <Delete className="md" />
                        </div>
                      </ImgPreview>
                    );
                  })}
                </ImgPreviewArea>
              </div>

              <input
                {...register("image", { onChange: (e) => selectMutiFile(e.target.files) })}
                hidden
                id="file"
                type="file"
                accept="image/*"
                multiple
              />
            </div>

            <Btn>저장하기</Btn>
          </FormField>
        </Container>
      </PageField>
    </Modal>
  );
};

export default WriteReview;

const Container = styled.div`
  display: flex;
  flex-flow: column;

  width: 100%;
  height: 100%;

  padding: 1.6rem 0.5rem 0 0.5rem;
`;

const ImgPreviewArea = styled.div`
  display: flex;
  flex-flow: wrap;

  & > * {
    position: relative;
    overflow: hidden;

    width: calc(25% - 0.5rem);
    padding-bottom: calc(25% - 0.5rem);
    margin: 0 0.5rem 0.5rem 0;

    border-radius: 0.8rem;
  }
`;

const ImgAddBtn = styled.label`
  border: 0.1rem solid ${(props) => props.theme.color.disable};
  background: ${(props) => props.theme.color.disable};
  color: ${(props) => props.theme.color.black.light};
  cursor: pointer;

  & > svg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const ImgPreview = styled.div`
  border: 0.1rem solid ${(props) => props.theme.color.disable};

  & > * {
    position: absolute;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .deleteBtn {
    cursor: pointer;
    color: ${(props) => props.theme.color.black.dark};
    padding: 0.5rem;

    top: 0;
    right: 0;
  }
`;
