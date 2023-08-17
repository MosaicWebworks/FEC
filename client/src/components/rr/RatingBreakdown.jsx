import React, { useState } from 'react';
import styled from 'styled-components';
//import exampleDataList from './exampleDataList';
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

const DetailsContainer = styled.div`
`;

const FilterMessage = styled.div`
`;

const RemoveFilters = styled.a`
  cursor: pointer;
`;

const RatingBar = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const Label = styled.span`

`;

const BarContainer = styled.div`
  width: 100px;
  display: flex;
  height: 10px;
  overflow: hidden;
`;

const GreenBar = styled.div`
  background-color: green;
  flex-basis: ${({ percentage }) => percentage}%;
`;

const GrayBar = styled.div`
  flex-grow: 1;
  background-color: gray;
`;

const Count = styled.span`
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

//detailed ratings
const RatingDetails = ({ reviews, filterRatings, appliedFilters }) => {
  const countRatings = (rating) => reviews.filter((r) => r.rating === rating).length;
  const totalReviews = reviews.length;

  return (
    <DetailsContainer>
      {appliedFilters.length > 0 && (
        <FilterMessage>
          <RemoveFilters onClick={() => filterRatings([])}>Remove all filters</RemoveFilters>
        </FilterMessage>
      )}
      {[5, 4, 3, 2, 1].map((star) => (
        <RatingBar key={star} onClick={() => filterRatings(star)}>
          <Label>{star} Stars</Label>
          <BarContainer>
            <GreenBar percentage={(countRatings(star) / totalReviews) * 100} />
            <GrayBar />
          </BarContainer>
          <Count>{countRatings(star)}</Count>
        </RatingBar>
      ))}
    </DetailsContainer>
  );
};

const RatingBreakdown = () => {
  const { reviews, updateFilteredReviews, filteredReviews } = useReviews();
  const { averageRating, totalReviews, recommendationPercentage } = calculateRatingSummary(reviews);
  const [appliedFilters, setAppliedFilters] = useState([]);
  //const { updateFilteredReviews } = useReviews();

  const filterRatings = (rating) => {
    //const isFilterApplied = appliedFilters.includes(rating);
    let newFilters;

    if (Array.isArray(rating)) {
      newFilters = [];
    } else {
      const isFilterApplied = appliedFilters.includes(rating);
      if (isFilterApplied) {
        // Remove the filter
        newFilters = appliedFilters.filter((filter) => filter !== rating);
      } else {
        // Add the filter
        newFilters = [...appliedFilters, rating];
      }
    }

    setAppliedFilters(newFilters);

    if (newFilters.length === 0) {
      updateFilteredReviews(reviews);
    } else {
      const newFilteredReviews = reviews.filter((review) => newFilters.includes(review.rating));
      updateFilteredReviews(newFilteredReviews);
    }
  };


  return (
    <div>
      <RatingSummary averageRating={averageRating} totalReviews={totalReviews} recommendationPercentage = {recommendationPercentage}/>
      <RatingDetails reviews={filteredReviews} filterRatings={filterRatings} appliedFilters={appliedFilters} />
    </div>
  );
};


export default RatingBreakdown;