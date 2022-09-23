import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { reviewAPI } from "apis";
import { Card, DropDownMenu, TextBox } from "components/common";
import { DeleteIcon, LocationIcon } from "assets/iconList";
import { jwt, sweetalert } from "utils";

const ReviewList = () => {
  const [list, setList] = useState([]);

  const getReview = async () => {
    const answer = await reviewAPI.getList();
    if (answer.result) {
      setList(answer.list);
    }
  };

  useEffect(() => {
    getReview();
  }, []);

  const deleteHandler = async (reviewId) => {
    sweetalert.avatarAlert();
    // const result = await sweetalert.confirm("정말로 삭제하시겠습니까?");
    // if (result.isConfirmed) {
    //   const answer = await reviewAPI.deleteReview(reviewId);
    //   if (answer.result) {
    //     sweetalert.successTimerAlert(answer.msg);
    //     getReview();
    //   }
    // }
  };

  return (
    <Article>
      {list.map((review) => {
        return (
          <CustomCard key={review.promiseId + review.reviewId}>
            <TextBox>
              <div>
                {review.image && (
                  <div className="reviewImg">
                    <img src={review.image} alt="후기 이미지" />
                  </div>
                )}
                <div>{review.content}</div>
                <div className="info">
                  <span>{review.date}</span>
                  <span>
                    <span className="pin">
                      <LocationIcon />
                    </span>
                    {review.location ? review.location : "장소를 불러올 수 없습니다."}
                  </span>
                </div>
              </div>
            </TextBox>

            {review.promiseUserId === jwt.getUserId() && (
              <DropDownMenu>
                <DeleteBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHandler(review.reviewId);
                  }}
                >
                  <DeleteIcon />
                </DeleteBtn>
              </DropDownMenu>
            )}
          </CustomCard>
        );
      })}
    </Article>
  );
};

export default ReviewList;

const Article = styled.article`
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

  margin-bottom: ${(props) => props.theme.size.m};

  .reviewImg {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-height: 12rem;
    }
    margin-bottom: ${(props) => props.theme.size.m};
  }

  .info {
    display: flex;
    align-items: center;
    margin-top: ${(props) => props.theme.size.m};
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

const DeleteBtn = styled.li`
  fill: red;
`;
