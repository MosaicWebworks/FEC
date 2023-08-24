import React from 'react';
import styled from 'styled-components';
import { theme } from '../Styles/LayoutStyles.jsx';

const StarContainer = styled.div`
  display: inline-block;
  font-size: 24px;
`;

const Star = styled.span`
  color: ${({ isActive, theme }) => (isActive ? theme.colors.textContrast : theme.colors.secondary)};
`;

const FullStar = styled(Star)`
  color: ${({theme}) => theme.colors.textContrast};
`;

const HalfStar = styled(Star)`
  position: relative;
  // color:  ${({theme}) => theme.colors.secondary}

  &::before {
    content: '\2605';
    position: absolute;
    width: 50%;
    overflow: hidden;
    color: ${({theme}) => theme.colors.textContrast};
    z-index: 1;
    left: 0;
    top: 0;
  }
`;


const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating - fullStars;

  const renderStar = (index) => {

    if (index < fullStars) {
      return <FullStar key={index} isActive>&#9733;</FullStar>;
    } else if (index === fullStars) {
      if (decimalPart >= 0.75) {
        return <FullStar key={index} isActive>&#9733;</FullStar>;
      } else if (decimalPart >= 0.25) {
        return <HalfStar key={index} isActive>&#9733;</HalfStar>;
      } else {
        return <Star key={index}>&#9734;</Star>;
      }
    } else {
      return <Star key={index}>&#9734;</Star>;
    }


  };

  return <StarContainer>{[...Array(5)].map((star, index) => renderStar(index))}</StarContainer>;
};

export default StarRating;
