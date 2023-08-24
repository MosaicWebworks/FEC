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
import { Section, theme } from '../Styles/LayoutStyles.jsx';

const zIndexStyle = {
  overlay: {
    zIndex: 1000
  }
};

const Container = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  // align-items: center;

`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: flex-end;
`;

const MoreReviewButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const WriteReviewButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px;
`;


const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.textContrast};
  }
`;

const StyledModal = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};

`;

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
      <WriteReviewButtonContainer>
        <Button onClick={() => setIsModalOpen(true)}>Write Your Review</Button>
      </WriteReviewButtonContainer>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} style={zIndexStyle}>
      <StyledModal>
        <NewReviewForm />
      </StyledModal>
      </Modal>
      <Section>
      <SortContainer>
        <span>Sort by: </span>
        <SortingDropdown selectedSort={selectedSort} onChange={handleSortChange} />
      </SortContainer>
      </Section>
      {filteredReviews.slice(0, loadedReviewsCount).map((review) => (
        <Section data-testid="reviewTile-component">
        <ReviewTile key={review.review_id} review={review} />
        </Section>
      ))}
      <MoreReviewButtonContainer>
      <Section>
      {loadedReviewsCount <filteredReviews.length && (
        <Button onClick={handleLoadMoreReviews}>
          See More Reviews
        </Button>
      )}
      </Section>
      </MoreReviewButtonContainer>

    </Container>
  );
};


export default ReviewList;
