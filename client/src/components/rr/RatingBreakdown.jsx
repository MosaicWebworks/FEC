import React, { useState } from 'react';
import styled from 'styled-components';
//import exampleDataList from './exampleDataList';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
import StarRating from '../SharedComponent/StarRating.jsx';
import RatingSummarywithStar from '../SharedComponent/RatingSummarywithStar.jsx';
import { Section,theme } from '../Styles/LayoutStyles.jsx';


const RecommendationPercentage = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 15px 5px;
  color: ${(props) => props.theme.colors.textSecondary};
`;

const DetailsContainer = styled.div`
  padding: 10px;
`;

const FilterMessage = styled.div`
`;

const RemoveFilters = styled.a`
  cursor: pointer;
`;

const RatingBar = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const Label = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size:  ${(props) => props.theme.fonts.main};
  white-space: nowrap;
`;

const BarContainer = styled.div`
  width: 100%;
  display: flex;
  height: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.secondary};
  margin: 0 10px;
`;

const GreenBar = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  flex-basis: ${({ percentage }) => percentage}%;
`;

const GrayBar = styled.div`
  flex-grow: 1;
  background-color: ${(props) => props.theme.colors.secondary};
`;

const Count = styled.span`
  font-size:  ${(props) => props.theme.fonts.main};
  color: ${(props) => props.theme.colors.text};
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
  const { reviewMeta, updateFilteredReviews, reviews } = useReviews();
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
    <Section>
      <RatingSummarywithStar/>
      <RecommendationPercentage>{recommendationPercentage}% of reviews recommend this product</RecommendationPercentage>
      <RatingDetails ratings={reviewMeta.ratings} filterRatings={filterRatings} appliedFilters={appliedFilters} />
    </Section>
  );
};


export default RatingBreakdown;