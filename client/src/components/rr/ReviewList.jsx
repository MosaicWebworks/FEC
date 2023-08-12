import React, { useState } from 'react';
import styled from 'styled-components';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
//import { handleLoadMoreReviews } from './ReviewsContext.jsx';
import ReviewTile from './ReviewTile.jsx';
import exampleDataList from './exampleDataList';

const Container = styled.div`
border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
`
;

const ReviewList = () => {
  const { reviews, loadedReviewsCount, handleLoadMoreReviews } = useReviews();

  // // more review button
  // const handleLoadMoreReviews = () => {
  //   // Increase the loadedReviewsCount to load more reviews
  //   setLoadedReviewsCount(prevCount => prevCount + 2);
  // };

// console.log("loadedReviewsCount:", loadedReviewsCount);
// console.log("reviews.length:", reviews.length);
  return (
    <Container>
      {exampleDataList.results.slice(0, loadedReviewsCount).map((review) => (
        <ReviewTile key={review.review_id} review={review} />
      ))}
      {loadedReviewsCount < exampleDataList.results.length && (
        <Button onClick={handleLoadMoreReviews}>
          See More Reviews
        </Button>
      )}
    </Container>
  );
};


export default ReviewList;