import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
//import { handleLoadMoreReviews } from './ReviewsContext.jsx';
import ReviewTile from './ReviewTile.jsx';
//import exampleDataList from './exampleDataList';
import RatingBreakdown from './RatingBreakdown.jsx';

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

const SortingDropdown = ({ selectedSort, onChange }) => {
  return (
    <select value={selectedSort} onChange={onChange}>
      <option value="relevant">Relevant</option>
      <option value="helpful">Helpful</option>
      <option value="newest">Newest</option>
    </select>
  );
};

const ReviewList = () => {
  const { reviews, loadedReviewsCount, handleLoadMoreReviews, updateReviews, filteredReviews } = useReviews();
  const [selectedSort, setSelectedSort] = useState('relevant');

  // Reapply the sorting when reviews or filters change
  useEffect(() => {
      handleSortChange({ target: { value: selectedSort } });
    }, [filteredReviews]);

  const handleSortChange = (event) => {
    const newSelectedSort = event.target.value;
    setSelectedSort(newSelectedSort);

    const sortedReviews = [...reviews];

    if (newSelectedSort === 'helpful') {
      sortedReviews.sort ((a, b) => {
        const helpfulA = a.helpfulness;
        const helpfulB = b.helpfulness;
        return helpfulB - helpfulA;
      });
    };

    if (newSelectedSort === 'newest') {
        sortedReviews.sort ((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
      });
    };

    if (newSelectedSort === 'relevant') {
      sortedReviews.sort((a, b) => {
        const helpfulA = a.helpfulness;
        const helpfulB = b.helpfulness;
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        //relevance score is calculated by taking into account two main factors: helpful and datetime submitted
        //more helpful(larger helpful number) and more recent the date(larger timestamps), more relevant
        const relevanceA = helpfulA + dateA;
        const relevanceB = helpfulB + dateB;
        return relevanceB - relevanceA;
    });
  }

    updateReviews(sortedReviews);
  }

  return (
    <Container data-testid="reviewList-component">
      <SortingDropdown selectedSort={selectedSort} onChange={handleSortChange} />
      {filteredReviews.slice(0, loadedReviewsCount).map((review) => (
        <ReviewTile key={review.review_id} review={review} />
      ))}
      {loadedReviewsCount <filteredReviews.length && (
        <Button onClick={handleLoadMoreReviews}>
          See More Reviews
        </Button>
      )}
    </Container>
  );
};


export default ReviewList;