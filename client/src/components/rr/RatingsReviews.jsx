import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ReviewList from './ReviewList.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
// import {ProductContext} from '../../contexts.js';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  // border: solid black;
  // width: 100%;
`;

const LeftSection = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  flex: 2;
`;


const RatingsReviews = () => {
  // const product = useContext(ProductContext);
  return (
    <ReviewsProvider>
    <Container>
      <LeftSection>
        <RatingBreakdown />
        <ProductBreakdown />
      </LeftSection>
      <RightSection>
        <ReviewList />
      </RightSection>
    </Container>
    </ReviewsProvider>
  );

  }

export default RatingsReviews;