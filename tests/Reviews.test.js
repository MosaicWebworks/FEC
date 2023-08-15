import { render, screen } from '@testing-library/react';
import React from 'react';
import ReviewList from '../client/src/components/rr/ReviewList.jsx';
import data from '../client/src/components/rr/exampleDataList.js';
import { ReviewsProvider } from '../client/src/components/rr/ReviewsContext.jsx';

describe('should render all ReviewList', () => {
  const reviews = data.results;

  it('ReviewList component successfully rendered', () => {
    render(
      <ReviewsProvider>
        <ReviewList />
      </ReviewsProvider>
    );

    const title = screen.getByTestId('reviewList-component');
    expect(title).toBeTruthy();
  });
});
