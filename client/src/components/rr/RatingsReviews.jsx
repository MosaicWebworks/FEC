import React, { useState } from 'react';
import styled from 'styled-components';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewList from './ReviewList.jsx';

const RatingsReviews = () => (
  <div>
    <h3>Review List</h3>
    <ReviewList/>
    <h3>Rating Breakdown</h3>
    <RatingBreakdown/>
    <h3>Product Breakdown</h3>
    <ProductBreakdown/>
  </div>

)

export default RatingsReviews;