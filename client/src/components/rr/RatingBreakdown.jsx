import React, { useState } from 'react';
import styled from 'styled-components';
//import exampleDataList from './exampleDataList';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
import StarRating from '../SharedComponent/StarRating.jsx';
import RatingSummarywithStar from '../SharedComponent/RatingSummarywithStar.jsx'

// const RatingSummaryContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const AverageRating = styled.span`
//   font-size: 36px;
//   font-weight: bold;
//   margin: 10px;

// `;

// const TotalReviews = styled.span`
//   margin: 10px;
// `;

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
    background-color: white;
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
  background-color: lightgrey;
`;

const Count = styled.span`
`;


//calculate average rating
const calculateRatingSummary = (ratings, recommended) => {
  const totalReviews = Object.values(ratings).reduce((sum, count) => sum + Number(count), 0);
  const totalRating = Object.entries(ratings).reduce((sum, [rating, count]) => sum + Number(rating) * Number(count), 0);
  const averageRating = totalRating / totalReviews;

  const recommendedCount = Number(recommended.true);
  const recommendationPercentage = ((recommendedCount / totalReviews) * 100).toFixed(2);

console.log(recommendedCount, totalReviews);

  return { averageRating, totalReviews,  recommendationPercentage };
};


// const RatingSummary = () => {
//   return (
//     <div>
//       <RatingSummarywithStar/>
//     </div>
//   );
// };

//detailed ratings
const RatingDetails = ({ ratings, filterRatings, appliedFilters }) => {
  const countRatings = (rating) => Number(ratings[rating]);
  const totalReviews = Object.values(ratings).reduce((sum, count) => sum + Number(count), 0);

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
  const { reviewMeta, updateFilteredReviews } = useReviews();
  if (!reviewMeta || !reviewMeta.ratings || !reviewMeta.recommended) {
    return <div>Loading...</div>;
  }
  const { averageRating, totalReviews, recommendationPercentage } = calculateRatingSummary(reviewMeta.ratings, reviewMeta.recommended);
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
      <RatingSummarywithStar/>
      <RecommendationPercentage>{recommendationPercentage}% of reviews recommend this product</RecommendationPercentage>
      <RatingDetails ratings={reviewMeta.ratings} filterRatings={filterRatings} appliedFilters={appliedFilters} />
    </div>
  );
};


export default RatingBreakdown;