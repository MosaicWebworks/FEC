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

  const updateReviews = (updatedReviews) => {
    setReviews(updatedReviews);
  };

  //ratingsdetail click filter:
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  const updateFilteredReviews = (rating) => {
    if (Array.isArray(rating) || !rating) {
      // If an array is passed or no rating is provided, reset the filtered reviews
      setFilteredReviews(reviews);
    } else {
      // Filter the reviews by the provided rating
      const newFilteredReviews = reviews.filter((review) => review.rating === rating);
      setFilteredReviews(newFilteredReviews);
    }
  };

  return (
    <ReviewsContext.Provider value={{ reviews, loadedReviewsCount, handleLoadMoreReviews, updateReviews, filteredReviews, updateFilteredReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};


export const useReviews = () => useContext(ReviewsContext);
