import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { RandingPage } from ".";
import { ToggleReview, WriteList, WriteReview, ReviewList } from "components/page/review";

const Review = () => {
  const isLoading = useSelector((state) => state.review.isLoading);
  const type = useSelector((state) => state.review.type);

  return (
    <>
      {isLoading && <RandingPage />}
      <Section>
        <ToggleReview type={type} />
        <Article>{type ? <WriteList /> : <ReviewList />}</Article>
      </Section>
      <WriteReview />
    </>
  );
};

export default Review;

const Section = styled.section`
  display: flex;
  flex-flow: column;

  height: 100%;
  padding-top: 2.4rem;
`;

const Article = styled.article`
  flex: 1;
  overflow: scroll;

  padding: ${(props) => props.theme.size.m};

  & > *:not(:last-child) {
    margin-bottom: 1.6rem;
  }
`;
