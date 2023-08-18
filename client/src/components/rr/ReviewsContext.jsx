import React, { createContext, useContext, useState, useEffect } from 'react';
//import exampleDataList from './exampleDataList';
import axios from 'axios';

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState({});
  const [loadedReviewsCount, setLoadedReviewsCount] = useState(2); // Initial value is 2

  useEffect(() => {
    //Fetch reviews
    axios.get('http://localhost:3000/data/reviews?product_id=40350')
      .then((response) => {
        setReviews(response.data.results);
        setFilteredReviews(response.data.results);
      })
      .catch((error) => console.error('An error occurred while fetching reviews:', error));

    //Fetch review meta
    axios.get('http://localhost:3000/data/reviews/meta?product_id=40350')
      .then((response) =>{
        console.log('Review meta response:', response);
        setReviewMeta(response.data)
      })
      .catch((error) => console.error('An error occurred while fetching review meta:', error));
  }, []);

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
    <ReviewsContext.Provider value={{ reviews, reviewMeta, loadedReviewsCount, handleLoadMoreReviews, updateReviews, filteredReviews, updateFilteredReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};


export const useReviews = () => useContext(ReviewsContext);
