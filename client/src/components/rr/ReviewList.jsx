import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useReviews} from './ReviewsContext.jsx';
import { ReviewsProvider } from './ReviewsContext.jsx';
//import { handleLoadMoreReviews } from './ReviewsContext.jsx';
import ReviewTile from './ReviewTile.jsx';
//import exampleDataList from './exampleDataList';
import RatingBreakdown from './RatingBreakdown.jsx';
import NewReviewForm from './NewReviewForm.jsx';
import Modal from 'react-modal';
import { StyledButton } from '../Styles/ButtonStyles.jsx';
import { Section,  theme } from '../Styles/LayoutStyles.jsx';

const Container = styled.div`
// border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: flex-end;
`;

// const Container = styled.div`
//   display: grid;
//   width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 20px;
//   background-color: ${(props) => props.theme.colors.background};
//   color: ${(props) => props.theme.colors.text};
//   font-family: ${(props) => props.theme.fonts.main};
// `;

const Button = styled.div`
  color: ${({theme}) => theme.colors.textSecondary};
  border: 2px solid ${({theme}) => theme.colors.textSecondary};
  padding: 5px;
  border-radius: 5px;
`
;

const SortingDropdown = ({ selectedSort, onChange }) => {
  return (
    <select value={selectedSort} onChange={onChange}>
      <option value="relevant">Relevant</option>
      <option value="helpful">Helpful</option>
      <option value="newest">Newest</option>
    </select>
  );
};

const ReviewList = () => {
  const { reviews, loadedReviewsCount, handleLoadMoreReviews,  filteredReviews,  setFilteredReviews } = useReviews();
  const [selectedSort, setSelectedSort] = useState('relevant');
  //window for new review
  const [isModalOpen, setIsModalOpen] = useState(false);

  // // Reapply the sorting when reviews or filters change
  // useEffect(() => {
  //     handleSortChange({ target: { value: selectedSort } });
  //   }, [filteredReviews]);

  const sortReviews = (reviewsToSort, sortOption) => {

    //copy of sorted Reveiws
    //const sortedReviews = [...filteredReviews];
    const sortedReviews = [...reviewsToSort];

    if (sortOption === 'helpful') {
      sortedReviews.sort ((a, b) => {
        const helpfulA = a.helpfulness;
        const helpfulB = b.helpfulness;
        return helpfulB - helpfulA;
      });
    };

    if (sortOption === 'newest') {
        sortedReviews.sort ((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
      });
    };

    if (sortOption === 'relevant') {
      sortedReviews.sort((a, b) => {
        const helpfulA = a.helpfulness;
        const helpfulB = b.helpfulness;
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();

        //relevance score is calculated by taking into account two main factors: helpful and datetime submitted
        //more helpful(larger helpful number) and more recent the date(larger timestamps), more relevant
        const relevanceA = helpfulA + dateA;
        const relevanceB = helpfulB + dateB;
        return relevanceB - relevanceA;
    });
  }

  return sortedReviews;
  }

  const handleSortChange = (e) => {
    const newSelectedSort = e.target.value;
    setSelectedSort(newSelectedSort);

    const sortedReviews = sortReviews(filteredReviews, newSelectedSort);
    setFilteredReviews(sortedReviews);
  };

  return (
    <Container data-testid="reviewList-component">
      <SortContainer>
        <span>Sort by: </span>
        <SortingDropdown selectedSort={selectedSort} onChange={handleSortChange} />
      </SortContainer>
      {filteredReviews.slice(0, loadedReviewsCount).map((review) => (
        <Section data-testid="reviewTile-component">
        <ReviewTile key={review.review_id} review={review} />
        </Section>
      ))}
      {loadedReviewsCount <filteredReviews.length && (
        <Button onClick={handleLoadMoreReviews}>
          See More Reviews
        </Button>
      )}
      <Button onClick={() => setIsModalOpen(true)}>Write Your Review</Button>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <NewReviewForm />
      </Modal>
    </Container>
  );
};


export default ReviewList;
