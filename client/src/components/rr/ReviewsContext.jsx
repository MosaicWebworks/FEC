
import React, { createContext, useContext, useState } from 'react';

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [loadedReviewsCount, setLoadedReviewsCount] = useState(2);

  // Load more reviews function

  return (
    <ReviewsContext.Provider value={{ reviews, loadedReviewsCount }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewsContext);
