import React from 'react';
import {render, screen} from '@testing-library/react'
import QuestionList from '../client/src/components/qa/QuestionList';


// test('should render button', () => {
//   render(<QuestionList/>);

//   let seen = screen.getByText(/see more questions/i);
//   expect(seen).toBeTruthy();

// })

describe('should render entire questionList', () => {
  it('should render "see more questions" button', () => {
    render(<QuestionList/>);

    let seen = screen.getByText(/see more questions/i);
    expect(seen).toBeTruthy();
  })
})


