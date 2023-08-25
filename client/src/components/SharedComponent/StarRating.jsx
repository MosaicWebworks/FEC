import React from 'react';
import styled from 'styled-components';
import { theme } from '../Styles/LayoutStyles.jsx';

const StarContainer = styled.div`
  font-size: 24px;
`;

const Star = styled.span`
  color: ${({ type, theme }) => {
    if (type === 'full') return theme.colors.textContrast;
    if (type === 'partial') return theme.colors.textContrast;
    if (type === 'empty') return theme.colors.secondary;
  }};

  &::before {
    content: '★';
    display: inline-block;
    clip-path: ${({ width }) => `inset(0 ${100 - width}% 0 0)`};
  }
`;

const StarRating = ({ rating }) => {
  return (
    <StarContainer>
      {[...Array(5)].map((_, index) => {
        if (rating > index) {
          const width = rating - index > 1 ? 100 : (rating - index) * 100;
          return <Star key={index} type={width === 100 ? 'full' : 'partial'} width={width} />;
        }
        return <Star key={index} type="empty" width={0} />;
      })}
    </StarContainer>
  );
};

export default StarRating;
