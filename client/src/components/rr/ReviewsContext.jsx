import React, { createContext, useContext, useState } from 'react';
import exampleDataList from './exampleDataList';

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState(exampleDataList.results);
  const [loadedReviewsCount, setLoadedReviewsCount] = useState(2); // Initial value is 2

  const handleLoadMoreReviews = () => {
    // Increment the loadedReviewsCount by 2 each time the button is clicked
    setLoadedReviewsCount(prevCount => prevCount + 2);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, loadedReviewsCount, handleLoadMoreReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewsContext);
