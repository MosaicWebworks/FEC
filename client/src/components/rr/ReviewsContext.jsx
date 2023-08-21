import React, { createContext, useContext, useState, useEffect } from 'react';
//import exampleDataList from './exampleDataList';
import axios from 'axios';

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState({});
  const [loadedReviewsCount, setLoadedReviewsCount] = useState(2); // Initial value is 2
  //ratingsdetail click filter:
  const [filteredReviews, setFilteredReviews] = useState([]);

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

  // const updateReviews = (updatedReviews) => {
  //   setReviews(updatedReviews);
  // };

  const updateFilteredReviews = (rating) => {
    if (Array.isArray(rating) || !rating) {
      // Reset the filtered reviews to the original reviews
      setFilteredReviews(reviews);
    } else {
      // Filter the reviews by the provided rating
      const newFilteredReviews = reviews.filter((review) => review.rating === rating);
      setFilteredReviews(newFilteredReviews);
    }
  };

  return (
    <ReviewsContext.Provider value={{ reviews, reviewMeta, loadedReviewsCount, handleLoadMoreReviews,  filteredReviews,  setFilteredReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};


export const useReviews = () => useContext(ReviewsContext);
