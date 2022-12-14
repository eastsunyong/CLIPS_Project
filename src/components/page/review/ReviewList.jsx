import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Card, DropDownMenu, OpacityModal, PageField } from "components/common";
import { CalendarI, Close, Delete, Location, Msg } from "assets/icons";
import { sweetalert } from "utils";
import { __deleteReview, __getReviewList } from "store/modules/reviewSlice";
import ReviewImgList from "./ReviewImgList";

const ReviewList = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.review.reviewList);

  const [imgToggle, setImgToggle] = useState({ toggle: false, url: null });

  useEffect(() => {
    dispatch(__getReviewList());
  }, []);

  const deleteHandler = async (reviewId) => {
    const result = await sweetalert.confirm("정말로 삭제하시겠습니까?");
    if (result.isConfirmed) {
      dispatch(__deleteReview(reviewId));
    }
  };

  return (
    <>
      {list.map((review) => {
        return (
          <NewCard key={review.promiseUserId}>
            {review.image.length !== 0 && <ReviewImgList image={review.image} setImgToggle={setImgToggle} />}

            <div className="cardTitle">
              {review.title}

              {review.reviewId && (
                <DropDownMenu>
                  <DeleteBtn
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteHandler(review.reviewId);
                    }}
                  >
                    <Delete className="lg" />
                  </DeleteBtn>
                </DropDownMenu>
              )}
            </div>

            <div className="cardBody">
              <div className="contentIcon">
                <Msg className="sm" />
              </div>
              {review.content}
            </div>

            <div>
              <div className="contentIcon">
                <CalendarI className="sm" />
              </div>
              {review.date}
            </div>

            <div>
              <div className="contentIcon">
                <Location className="sm" />
              </div>
              {review.location ? review.location : "장소를 불러올 수 없습니다."}
            </div>
          </NewCard>
        );
      })}

      <OpacityModal toggle={imgToggle.toggle}>
        <PageField
          icon={
            <div
              className="btn"
              onClick={() => {
                setImgToggle({ ...imgToggle, toggle: false });
              }}
            >
              <Close className="md" />
            </div>
          }
          title="확대 이미지"
        >
          <BigImg>
            <img src={imgToggle.url} alt="확대이미지" />
          </BigImg>
        </PageField>
      </OpacityModal>
    </>
  );
};

export default memo(ReviewList);

const NewCard = styled(Card)`
  .cardBody {
    font-size: ${(props) => props.theme.size.s};
    color: black;
  }
`;

const DeleteBtn = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.color.error.main};
  padding: 1rem;
`;

const BigImg = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
  }
`;
