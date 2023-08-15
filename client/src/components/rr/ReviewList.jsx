import React, { useState, useEffect } from 'react';
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
  const { reviews, loadedReviewsCount, handleLoadMoreReviews, updateReviews } = useReviews();
  const [selectedSort, setSelectedSort] = useState('relevant');

  useEffect(() => {
    console.log('Reviews updated:', reviews);
  }, [reviews]);

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
    }

      if (newSelectedSort === 'newest') {
        sortedReviews.sort ((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        })
    };

    //console.log(sortedReviews);

    updateReviews(sortedReviews);

    console.log('Reviews updated:', sortedReviews)
  }

  return (
    <Container data-testid="reviewList-component">
      <SortingDropdown selectedSort={selectedSort} onChange={handleSortChange} />
      {reviews.slice(0, loadedReviewsCount).map((review) => (
        <ReviewTile key={review.review_id} review={review} />
      ))}
      {loadedReviewsCount <reviews.length && (
        <Button onClick={handleLoadMoreReviews}>
          See More Reviews
        </Button>
      )}
    </Container>
  );
};


export default ReviewList;