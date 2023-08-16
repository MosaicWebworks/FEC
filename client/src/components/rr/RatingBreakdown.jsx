import React, { useState } from 'react';
import styled from 'styled-components';
import exampleDataList from './exampleDataList';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';

const StarContainer = styled.div`
  display: inline-block;
  font-size: 24px;
`;

const Star = styled.span`
  color: ${({ isActive }) => (isActive ? 'gold' : 'gray')};
`;

const StarRating = ({ rating, totalStars }) => {
  return (
    <StarContainer>
      {[...Array(totalStars)].map((star, index) => {
        const isActive = index < Math.floor(rating);

        return (
          <Star
            key={index}
            isActive={isActive}
          >
            &#9733;
          </Star>
        );
      })}
    </StarContainer>
  );
};


// const RatingSummary = ({ averageRating, totalReviews }) => {
//   const solidStars = Math.floor(averageRating);
//   const outlinedStars = 5 - solidStars;

//   return (
//     <div>
//       <div>
//         {Array.from({ length: solidStars }).map((_, index) => (
//           <Star key={`solid-${index}`} isActive />
//         ))}
//         {Array.from({ length: outlinedStars }).map((_, index) => (
//           <Star key={`outlined-${index}`} />
//         ))}
//       </div>
//       <div>Average Rating: {averageRating.toFixed(1)}</div>
//       <div>Total Reviews: {totalReviews}</div>
//     </div>
//   );
// };

const Recommendations = ({ recommendedPercentage }) => {
  return (
    <div>
      <h3>Recommendations</h3>
      <div>{recommendedPercentage}% recommend this product</div>
    </div>
  );
};


const RatingDetails = ({ ratingDistribution, onFilterClick }) => {
  return (
    <div>
      <h3>Rating Breakdown</h3>
      {ratingDistribution.map(({ stars, count, percentage }) => (
        <div
          key={stars}
          onClick={() => onFilterClick(stars)}
          className="filterable-rating"
        >
          <span>{stars} Stars</span>
          <div className="rating-bar">
            <div
              className="rating-bar-green"
              style={{ width: `${percentage}%` }}
            ></div>
            <div className="rating-bar-gray"></div>
          </div>
          <span>{count}</span>
        </div>
      ))}
    </div>
  );
};

const calculateAverageRating = (reviews) => {

  const totalRating = reviews.map((review) => review.rating).reduce((sum, rating) => sum + rating, 0);
  return totalRating / reviews.length;
};

const calculateRatingDistribution = (reviews) => {
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    ratingCounts[review.rating - 1]++;
  });
  const totalReviews = reviews.length;
  return ratingCounts.map((count, index) => ({
    stars: index + 1,
    count,
    percentage: (count / totalReviews) * 100,
  }));
};

const calculateRecommendedPercentage = (reviews) => {
  const recommendedCount = reviews.filter(review => review.recommend).length;
  const totalReviews = reviews.length;
  return ((recommendedCount / totalReviews) * 100).toFixed(2);
};


const RatingBreakdown = ({review}) => {

  const reviews = exampleDataList.results;

  return (
  <div>
    {/* {exampleDataList.results.map((review) => ( */}
    <StarRating rating={calculateAverageRating(reviews)} totalStars={reviews.length} />
    {/* <RatingDetails ratingDistribution={calculateRatingDistribution(reviews)} onFilterClick={handleFilterClick} /> */}
    <Recommendations recommendedPercentage={calculateRecommendedPercentage(reviews)} />
  {/* ))} */}
  </div>
  )
}
export default RatingBreakdown;