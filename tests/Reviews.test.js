
import { render, screen, waitFor, fireEvent,  act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ReviewList, { sortReviews } from '../client/src/components/rr/ReviewList.jsx';
import data from '../client/src/components/rr/exampleDataList.js';
import { ReviewsProvider, useReviews, ReviewsContext} from '../client/src/components/rr/ReviewsContext.jsx';
import { ProductContext } from '../client/src/contexts.js';
import ReviewTile from '../client/src/components/rr/ReviewTile.jsx';
import axios from 'axios';
import Modal from 'react-modal';

//reviewList

// Define a default mock value
const defaultReviewsMock = {
  reviews: [],
  loadedReviewsCount: 0,
  handleLoadMoreReviews: jest.fn(),
  filteredReviews: [],
  setFilteredReviews: jest.fn(),
};

// Mock the useReviews function
jest.mock('../client/src/components/rr/ReviewsContext', () => ({
  ...jest.requireActual('../client/src/components/rr/ReviewsContext'),
  useReviews: jest.fn(),
}));

// Reset the mock before each test and set a default return value
beforeEach(() => {
  useReviews.mockReset();
  useReviews.mockReturnValue(defaultReviewsMock);
});

describe('ReviewList', () => {
  const reviewsData = data.results;

  it('ReviewList component successfully rendered', () => {
    render(
      <ReviewsProvider>
        <ReviewList />
      </ReviewsProvider>
    );

    const title = screen.getByTestId('reviewList-component');
    expect(title).toBeTruthy();
  });

  it('changes sorting when a different option is selected', () => {
    render(
      <ReviewsProvider>
        <ReviewList />
      </ReviewsProvider>
    );

    const sortingDropdown = screen.getByRole('combobox');
    fireEvent.change(sortingDropdown, { target: { value: 'helpful' } });
    expect(sortingDropdown.value).toBe('helpful');
  });


  it('displays "See More Reviews" button when there are more reviews', () => {
    // Define the values you want to provide in the context
    const reviewsMock = {
      reviews: reviewsData,
      loadedReviewsCount: 2,
      handleLoadMoreReviews: jest.fn(),
      filteredReviews: reviewsData,
      setFilteredReviews: jest.fn(),
    };

    useReviews.mockReturnValue(reviewsMock);

    render(
      <ReviewsProvider>
        <ReviewList />
      </ReviewsProvider>
    );

    const button = screen.getByText(/See More Reviews/);
    expect(button).toBeTruthy();
  });



  it('opens modal when "Write Your Review" button is clicked', () => {
    render(
      <ReviewsProvider>
        <ReviewList />
      </ReviewsProvider>
    );

    const button = screen.getByText('Write Your Review');
    fireEvent.click(button);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeTruthy();
  });

  it('renders the correct number of reviews', () => {
    const reviewsMock = {
      reviews: data.results,
      loadedReviewsCount: 2, // adjust this number as needed
      handleLoadMoreReviews: jest.fn(),
      filteredReviews: data.results,
      setFilteredReviews: jest.fn(),
    };

    // Directly set the mock return value
    useReviews.mockReturnValue(reviewsMock);

    render(
      <ReviewsProvider>
        <ReviewList />
      </ReviewsProvider>
    );

    const reviews = screen.getAllByTestId('reviewTile-component');
    expect(reviews.length).toBe(reviewsMock.loadedReviewsCount);
  });


  it('sorts reviews by newest date', () => {
    render(
      <ReviewsProvider>
        <ReviewList />
      </ReviewsProvider>
    );

    const sortingDropdown = screen.getByRole('combobox');
    fireEvent.change(sortingDropdown, { target: { value: 'newest' } });
  });

});



//reviewTile

describe('<ReviewTile />', () => {
  const review = data.results[0];

  test('renders all the elements correctly', () => {
    render(<ReviewTile review={review} />);


    expect(screen.getByText('gives you wings')).toBeInTheDocument();
    expect(screen.queryByText('I recommend this product')).not.toBeInTheDocument();
    expect(screen.getByText('these shoes are not only stylish but also comfortable. in fact, i sprouted 4 pairs of sentient wings that lifted me away.')).toBeInTheDocument();
    expect(screen.getByText('Reviewed on 2022-07-22T00:00:00.000Z')).toBeInTheDocument();
    expect(screen.getByText('stuck in antarctica')).toBeInTheDocument();
    expect(screen.getByText('49 people found this helpful')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://res.cloudinary.com/dky0ccpc4/image/upload/v1658460919/ropzkwtevo8ebw2m3swc.png');
  });

  test('increments yes/no helpful correctly', () => {
    render(<ReviewTile review={review} />);

    // Clicking on yes button
    const yesButton = screen.getByText(/^Yes/);
    fireEvent.click(yesButton);
    expect(screen.getByText('Yes (1)')).toBeInTheDocument();

    // Clicking on no button
    const noButton = screen.getByText(/^No/);
    fireEvent.click(noButton);
    expect(screen.getByText('No (0)')).toBeInTheDocument();

    // Trying to click again on yes , not change the vote
    fireEvent.click(yesButton);
    expect(screen.getByText('Yes (1)')).toBeInTheDocument();
  });
});



