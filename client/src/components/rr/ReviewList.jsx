import React, { useState } from 'react';
import styled from 'styled-components';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
import ReviewTile from './ReviewTile.jsx';

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
      {reviews.slice(0, loadedReviewsCount).map((review) => (
        <ReviewTile key={review.id} review={review} />
      ))}
      {loadedReviewsCount < reviews.length && (
        <Button>
        <input type="submit" value="see more reviews" />
    </Button>
      )}
    </Container>
  );
};


export default ReviewList;