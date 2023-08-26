import React, { createContext, useContext, useState, useEffect } from 'react';
//import exampleDataList from './exampleDataList';
import axios from 'axios';
import { ProductContext } from '../../contexts.js';


const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {

  const product = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);
  const [reviewMeta, setReviewMeta] = useState({});
  const [loadedReviewsCount, setLoadedReviewsCount] = useState(2); // Initial value is 2
  //ratingsdetail click filter:
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    //Fetch reviews
    axios.get(`/data/reviews?product_id=${product.id}`)
      .then((response) => {
        setReviews(response.data.results);
        setFilteredReviews(response.data.results);
      })
      .catch((error) => console.error('An error occurred while fetching reviews:', error));

    //Fetch review meta
    axios.get(`/data/reviews/meta?product_id=${product.id}`)
      .then((response) =>{
        setReviewMeta(response.data)
      })
      .catch((error) => console.error('An error occurred while fetching review meta:', error));
  }, [product.id]);

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
    <ReviewsContext.Provider value={{ reviews, reviewMeta, loadedReviewsCount, handleLoadMoreReviews,  filteredReviews,  setFilteredReviews, updateFilteredReviews}}>
      {children}
    </ReviewsContext.Provider>
  );
};


export const useReviews = () => useContext(ReviewsContext);
