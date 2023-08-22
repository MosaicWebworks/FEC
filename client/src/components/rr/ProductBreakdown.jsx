import React, { useState } from 'react';
import styled from 'styled-components';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';

const RatingContainer = styled.div`
  margin: 10px 0;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
`;

const RatingBar = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: gray;
`;

const Icon = styled.div`
  position: absolute;
  height: 10px;
  width: 10px;
  background-color: blue;
  left: ${props => props.position}%;
`;

const Labels = styled.div`
  display: flex;
  justify-content: space-between;
`;

const allLabels = {
  Size: ["too small", "too big"],
  Width: ["too narrow", "too wide"],
  Comfort: ["uncomfortable", "comfortable"],
  Quality: ["poor", "great"],
  Fit: ["too small", "too big"],
  Length: ["too short", "too long"]
};

function AllRating({ characteristic, minValueLabel , maxValueLabel , average }) {
  const barWidth = 100; // Total width of the bar in percent
  // Position of the icon in percent, ratings out of 5 stars
  const iconPosition = (average / 5) * barWidth; // Position of the icon in percent, ratings out of 5 star

  return (
    <RatingContainer>
      <Label>{characteristic}</Label>
      <RatingBar>
        <Icon position={iconPosition} />
      </RatingBar>
      <Labels>
        <span>{minValueLabel}</span>
        <span>{maxValueLabel}</span>
      </Labels>
    </RatingContainer>
  );
}

const ProductBreakdown = () => {
  const { reviewMeta } = useReviews();
  const characteristics = reviewMeta.characteristics;

  console.log('reviewMeta is ',reviewMeta);

  if (!characteristics) {
    return <div>Loading...</div>; // or some other placeholder
  }

  return (
    <div>
      {Object.entries(characteristics).map(([characteristic, { value }]) => (
        <AllRating
          key={characteristic}
          characteristic={characteristic}
          average={value}
          minValueLabel={allLabels[characteristic][0]}
          maxValueLabel={allLabels[characteristic][1]}
        />
      ))}
    </div>
  );

}

export default ProductBreakdown;
