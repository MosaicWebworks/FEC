import React, { useState } from 'react';
import styled from 'styled-components';
//import exampleDataList from './exampleDataList.js';
import StarRating from '../SharedComponent/StarRating.jsx';
import { ThemeProvider } from 'styled-components';
import { Container, Section, Heading1, Heading2, theme } from '../Styles/LayoutStyles.jsx';
import { StyledButton } from '../Styles/ButtonStyles.jsx';

const Tile = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
`;

const Summary = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Recommend = styled.div`
  color: ${props => (props.recommend ? 'green' : 'red')};
  margin-bottom: 10px;
`;

const Body = styled.div`
  word-wrap: break-word;
  max-width: 800px;
  margin-bottom: 10px;
`;

const DateReviewer = styled.div`
  color: #777;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Helpfulness = styled.div`
  margin-bottom: 10px;
`;

// const Button = styled.button`
//   background-color: #e7e7e7;
//   border: none;
//   color: black;
//   padding: 5px 10px;
//   text-align: center;
//   text-decoration: none;
//   display: inline-block;
//   font-size: 14px;
//   margin: 5px 2px;
//   cursor: pointer;
//   &:hover {
//     background-color: #ccc;
//   }
// `;

const Reviewer = styled.div`

`;

const Photo = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
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

  //helpfulness buttons
  const [hasVoted, setHasVoted] = useState(false);
  const [yesVotes, setYesVotes] = useState(0);
  const [noVotes, setNoVotes] = useState(0);

  const handleYesVote = () => {
    if (!hasVoted) {
      setYesVotes(yesVotes + 1);
      setHasVoted(true);
    }
  };

  const handleNoVote = () => {
    if (!hasVoted) {
      setNoVotes(noVotes + 1);
      setHasVoted(true);
    }
  };

  return (
    <Tile data-testid='reviewTile-component'>
      <StarRating rating={rating} />
      <Summary>{summary}</Summary>
      <Recommend>{recommend ? 'I recommend this product' : ''}</Recommend>
      <Body>{body}</Body>
      <Date>Reviewed on {date}</Date>
      <Reviewer>{reviewer_name}</Reviewer>
      <Helpfulness>{helpfulness} people found this helpful</Helpfulness>
        <div>Was this review helpful?
          <StyledButton onClick={handleYesVote}>Yes ({yesVotes})</StyledButton>
          <StyledButton onClick={handleNoVote}>No ({noVotes})</StyledButton>
        </div>
        {photos && photos.map((photo) => (
          <Photo key={photo.id} src={photo.url} />
        ))
      }

    </Tile>
  );
};



export default ReviewTile;

