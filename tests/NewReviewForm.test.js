import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewReviewForm from '../client/src/components/rr/NewReviewForm.jsx';

describe('NewReviewForm', () => {
  it('renders the form title', () => {
    render(<NewReviewForm />);
    expect(screen.getByTestId('new-review-title')).toHaveTextContent('Write Your Review');
  });

  it('updates the overall rating when a star is clicked', () => {
    render(<NewReviewForm />);
    fireEvent.click(screen.getAllByText('★')[2]);
    expect(screen.getByText('Average')).toBeInTheDocument();
  });

  it('updates the recommendation when a radio button is clicked', () => {
    render(<NewReviewForm />);
    fireEvent.click(screen.getByLabelText('Yes'));
    expect(screen.getByLabelText('Yes')).toBeChecked();
  });

  it('updates the characteristics when a radio button is clicked', () => {
    render(<NewReviewForm />);
    fireEvent.click(screen.getAllByLabelText('1')[0]);
    expect(screen.getByText('none selected')).not.toBeInTheDocument();
  });

  it('updates the review summary when text is input', () => {
    render(<NewReviewForm />);
    fireEvent.change(screen.getByPlaceholderText('Example: Best purchase ever!'), { target: {value: 'Great product!' } });
    expect(screen.getByPlaceholderText('Example: Best purchase ever!')).toHaveValue('Great product!');
  });

  it('updates the nickname and email when text is input', () => {
    render(<NewReviewForm />);
    fireEvent.change(screen.getByPlaceholderText('Example: jackson11!'), { target: {value: 'myNickname' } });
    fireEvent.change(screen.getByPlaceholderText('Example: jackson11@email.com'), { target:{ value: 'myEmail@example.com'} });
    expect(screen.getByPlaceholderText('Example: jackson11!')).toHaveValue('myNickname');
    expect(screen.getByPlaceholderText('Example: jackson11@email.com')).toHaveValue('myEmail@example.com');
  });


  it('displays an error if the form is submitted without mandatory fields', () => {
    render(<NewReviewForm />);
    fireEvent.click(screen.getByText('Submit review'));
    expect(screen.getByText('You must enter the following:')).toBeInTheDocument();
    expect(screen.getByText('Overall rating is mandatory')).toBeInTheDocument();
    expect(screen.getByText('Recommendation is mandatory')).toBeInTheDocument();
  });

  it('displays an error if the email format is incorrect', () => {
    render(<NewReviewForm />);
    fireEvent.change(screen.getByPlaceholderText('Example: jackson11@email.com'), { target: { value:'invalid-email' } });
    fireEvent.click(screen.getByText('Submit review'));
    expect(screen.getByText('Email must be in valid format')).toBeInTheDocument();
  });

  it('displays an error if the review body is less than 50 characters', () => {
    render(<NewReviewForm />);
    fireEvent.change(screen.getByPlaceholderText('Why did you like the product or not?'), { target: { value:'Short' } });
    fireEvent.click(screen.getByText('Submit review'));
    expect(screen.getByText('Review body is less than 50 characters')).toBeInTheDocument();
  });

  it('updates the review body and displays the minimum reached message when text is input', () => {
    render(<NewReviewForm />);
    fireEvent.change(screen.getByPlaceholderText('Why did you like the product or not?'), { target: { value: 'This is a review body with more than fifty characters.' } });
    expect(screen.getByText('Minimum reached')).toBeInTheDocument();
  });


  it('displays a thank you message after submitting a valid form', () => {
    render(<NewReviewForm />);
    fireEvent.click(screen.getByText('Submit review'));

    expect(screen.getByText('Thanks for submitting your review!')).toBeInTheDocument();
  });

});



