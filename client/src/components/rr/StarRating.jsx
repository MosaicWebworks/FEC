import React, { useState } from 'react';
import styled from 'styled-components';

const StarContainer = styled.div`
  display: inline-block;
  font-size: 24px;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? 'gold' : 'gray')};
`;

const StarRating = ({ totalStars }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleHalfStarClick = (selectedRating) => {
    setRating(selectedRating + 0.5);
  };

  return (
    <div>
      <StarContainer>
        {[...Array(totalStars)].map((star, index) => {
          const isActive = index < Math.floor(rating);

          return (
            <Star
              key={index}
              onClick={() => handleStarClick(index + 1)}
              isActive={isActive}
            >
              &#9733;
            </Star>
          );
        })}
      </StarContainer>
      <p>{rating} out of {totalStars} stars</p>
    </div>
  );
};

export default StarRating;
