import React from 'react';
import styled from 'styled-components';
//import exampleDataList from './exampleDataList.js';
import StarRating from '../SharedComponent/StarRating.jsx';

const Tile = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
`;


// const StarContainer = styled.div`
//   display: inline-block;
//   font-size: 24px;
// `;

// const Star = styled.span`
//   color: ${({ isActive }) => (isActive ? 'gold' : 'gray')};
// `;

// const FullStar = styled(Star)`
//   color: gold;
// `;

// const HalfStar = styled(Star)`
//   position: relative;
//   color: gray;

//   &::before {
//     content: '\2605';
//     position: absolute;
//     width: 50%;
//     overflow: hidden;
//     color: gold;
//     z-index: 1;
//     left: 0;
//     top: 0;
//   }
// `;


// const StarRating = ({ rating, totalStars }) => {
//   const fullStars = Math.floor(rating);
//   const decimalPart = rating - fullStars;

//    //console.log('rating is: ', rating);
//   //  console.log(fullStar);
//   //  console.log(decimalPart);

//   const renderStar = (index) => {

//     console.log('index:', index, 'fullStars:', fullStars, 'decimalPart:', decimalPart);

//     if (index < fullStars) {
//       return <FullStar key={index} isActive>&#9733;</FullStar>;
//     } else if (index === fullStars) {
//       if (decimalPart >= 0.75) {
//         return <FullStar key={index} isActive>&#9733;</FullStar>;
//       } else if (decimalPart >= 0.25) {
//         return <HalfStar key={index} isActive>&#9733;</HalfStar>;
//       } else {
//         return <Star key={index}>&#9734;</Star>;
//       }
//     } else {
//       return <Star key={index}>&#9734;</Star>;
//     }


//   };

//   return <StarContainer>{[...Array(totalStars)].map((star, index) => renderStar(index))}</StarContainer>;
// };

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
      <StarRating rating={rating} />
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
