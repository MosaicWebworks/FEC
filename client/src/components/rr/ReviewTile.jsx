import React, { useState } from 'react';
import styled from 'styled-components';
//import exampleDataList from './exampleDataList.js';
import StarRating from '../SharedComponent/StarRating.jsx';
import { ThemeProvider } from 'styled-components';
import { Container, Section, theme } from '../Styles/LayoutStyles.jsx';
import { StyledButton } from '../Styles/ButtonStyles.jsx';

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ReviewerAndDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 14px;
`;

const HelpfulnessSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Summary = styled.div`
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 20px;
`;

const Recommend = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  &:before {
    content: '\\2713'; // Unicode for  checkmark
    color: ${({theme}) => theme.colors.primary}
    font-size: 20px; // Adjust the size if you want
    margin-right: 10px; // Space between the checkmark and the text
  }
`;

const Body = styled.div`
  word-wrap: break-word;
  max-width: 800px;
  margin-bottom: 20px;
`;

const ReviewDate = styled.div`
  color: #777;
  font-size: 14px;
  margin-bottom: 20px;
`;

const Helpfulness = styled.div`
  margin-bottom: 20px;
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
margin-bottom: 20px;
`;

const Photo = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
`;

const ThumbUpIcon = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

const ThumbDownIcon = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;

//date same as qa
const formatDate = (dateString) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const inputDate = new Date(dateString);
  const month = months[inputDate.getMonth()];
  const day = String(inputDate.getDate()).padStart(2, '0');
  const year = inputDate.getFullYear();
  return `${month}-${day}-${year}`;
};

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

  const formattedDate = formatDate(date);

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
      <TopSection>
        <div>
          <StarRating rating={rating} />
          <Summary>{summary}</Summary>
          <Recommend>{recommend ? 'I recommend this product' : ''}</Recommend>
          <Body>{body}</Body>
        </div>
        <ReviewerAndDate>
          <ReviewDate>Reviewed on {formattedDate}</ReviewDate>
          <Reviewer>{reviewer_name}</Reviewer>
        </ReviewerAndDate>
      </TopSection>

        {photos && photos.map((photo) => (
          <Photo key={photo.id} src={photo.url} />
        ))
      }

      <HelpfulnessSection>
        <Helpfulness>{helpfulness} people found this helpful</Helpfulness>
        <div>Was this review helpful?
          <StyledButton onClick={handleYesVote}>Yes ({yesVotes})</StyledButton>
          <StyledButton onClick={handleNoVote}>No ({noVotes})</StyledButton>
        </div>
      </HelpfulnessSection>
    </Tile>
  );
};



export default ReviewTile;

