import React, { useState } from 'react';
import styled from 'styled-components';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
import ReviewTile from './ReviewTile.jsx';
import exampleDataList from './exampleDataList';

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
border: solid black;
width: 100%;
height: 100vh;
`;


const ReviewList = () => {
  const { reviews, loadedReviewsCount } = useReviews();

  // more review button
  const handleLoadMoreReviews = () => {
    // Increase the loadedReviewsCount to load more reviews
  };

  return (
    <Container>
      {exampleDataList.results.map((review) => (
        <ReviewTile key={review.review_id} review={review} />
      ))}
      {loadedReviewsCount < reviews.length && (
        <button onClick={handleLoadMoreReviews}>
        See More Reviews
      </button>
      )}
    </Container>
  );
};


export default ReviewList;