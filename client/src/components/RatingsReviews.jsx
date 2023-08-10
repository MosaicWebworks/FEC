import React, { useState } from 'react';
import styled from 'styled-components';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewList from './ReviewList.jsx';

const RatingsReviews = () => (
  <div>
    <ReviewList/>
    <RatingBreakdown/>
    <ProductBreakdown/>
  </div>

)

export default RatingsReviews;