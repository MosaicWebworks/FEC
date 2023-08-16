import React, { useState } from 'react';
import styled from 'styled-components';
import exampleDataList from './exampleDataList';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
import StarRating from '../SharedComponent/StarRating.jsx';

const RatingSummaryContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AverageRating = styled.span`
  font-size: 36px;
  font-weight: bold;
  margin: 10px;

`;

const TotalReviews = styled.span`
  margin: 10px;
`;

const RecommendationPercentage = styled.div`
  font-size: 18px;
  margin: 5px;
`;


//calculate average rating
const calculateRatingSummary = (reviews) => {
  const totalRating = reviews.map((review) => review.rating).reduce((sum, rating) => sum + rating, 0);
  const totalReviews = reviews.length;
  const averageRating = totalRating / totalReviews;

  const recommendedCount = reviews.filter((review) => review.recommend).length;
  const recommendationPercentage = ((recommendedCount / totalReviews) * 100).toFixed(2);

  //console.log(recommendedCount, totalReviews);

  return { averageRating, totalReviews,  recommendationPercentage };
};


const RatingSummary = ({ averageRating, totalReviews,  recommendationPercentage }) => {
  return (
    <div>
      <RatingSummaryContainer>
        <AverageRating>{averageRating.toFixed(1)}</AverageRating>
        <StarRating rating={averageRating} />
        <TotalReviews>({totalReviews} reviews)</TotalReviews>
      </RatingSummaryContainer>
      <RecommendationPercentage>{recommendationPercentage}% of reviews recommend this product</RecommendationPercentage>
    </div>
  );
};

const RatingBreakdown = () => {
  const { reviews } = useReviews();
  const { averageRating, totalReviews, recommendationPercentage } = calculateRatingSummary(reviews);

  return (
    <div>
      <RatingSummary averageRating={averageRating} totalReviews={totalReviews} recommendationPercentage = {recommendationPercentage}/>
    </div>
  );
};


export default RatingBreakdown;