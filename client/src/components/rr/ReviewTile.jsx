import React from 'react';
import styled from 'styled-components';
import exampleDataList from './exampleDataList.js';
//import StarRating from './StarRating.jsx';

const Tile = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;


const StarContainer = styled.div`
  display: inline-block;
  font-size: 24px;
`;

const Star = styled.span`
  color: ${({ isActive }) => (isActive ? 'gold' : 'gray')};
`;

const StarRating = ({ rating, totalStars }) => {
  return (
    <StarContainer>
      {[...Array(totalStars)].map((star, index) => {
        const isActive = index < Math.floor(rating);

        return (
          <Star
            key={index}
            isActive={isActive}
          >
            &#9733;
          </Star>
        );
      })}
    </StarContainer>
  );
};


const Summary = styled.div`
  font-weight: bold;
`;

const Recommend = styled.div`

`;

const Body = styled.div`
  margin-top: 10px;
`;

const Date = styled.div`

`;

const Reviewer = styled.div`

`;

const Helpfulness = styled.div`

`;

const Photo = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  cursor: pointer;
`;


const ReviewTile = ({ review }) => {
  const {
    rating,
    summary,
    recommend,
    body,
    date,
    reviewer_name,
    helpfulness,
    photos,
  } = review;

  return (
    <Tile>
      <StarRating rating={rating} totalStars={5} />
      <Summary>{summary}</Summary>
      <Recommend>{recommend ? 'I recommend this product' : ''}</Recommend>
      <Body>{body}</Body>
      <Date>Reviewed on {date}</Date>
      <Reviewer>{reviewer_name}</Reviewer>
      <Helpfulness>{helpfulness} people found this helpful</Helpfulness>
      {photos.map((photo) => (
        <Photo key={photo.id} src={photo.url} alt="Review Photo" />
      ))}
    </Tile>
  );
};



export default ReviewTile;
