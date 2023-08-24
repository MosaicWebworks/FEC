import React, { useState } from 'react';
import styled from 'styled-components';
//import exampleDataList from './exampleDataList';
import { useReviews} from '../rr/ReviewsContext.jsx';
import { ReviewsProvider } from '../rr/ReviewsContext.jsx';
import StarRating from './StarRating.jsx';

const RatingSummaryContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AverageRating = styled.span`
  font-size: 36px;
  font-weight: bold;
  margin: 10px;
  color: ${({theme}) => theme.colors.primary};
`;

const TotalReviews = styled.span`
  margin: 10px;
`;


//calculate average rating
const calculateRatingSummary = (ratings, recommended) => {
  const totalReviews = Object.values(ratings).reduce((sum, count) => sum + Number(count), 0);
  const totalRating = Object.entries(ratings).reduce((sum, [rating, count]) => sum + Number(rating) * Number(count), 0);
  const averageRating = totalRating / totalReviews;

  const recommendedCount = Number(recommended.true);
  const recommendationPercentage = ((recommendedCount / totalReviews) * 100).toFixed(2);

  return { averageRating, totalReviews,  recommendationPercentage };
};


const RatingSummarywithStar = () => {
  const { reviewMeta } = useReviews();

  if (!reviewMeta || !reviewMeta.ratings || !reviewMeta.recommended) {
    return <div>Loading...</div>;
  }

  const { averageRating, totalReviews } = calculateRatingSummary(reviewMeta.ratings, reviewMeta.recommended);

  return (
    <div>
      <RatingSummaryContainer>
        <AverageRating>{averageRating.toFixed(1)}</AverageRating>
        <StarRating rating={averageRating} />
        <TotalReviews>({totalReviews} reviews)</TotalReviews>
      </RatingSummaryContainer>
    </div>
  );
};


export default RatingSummarywithStar;
