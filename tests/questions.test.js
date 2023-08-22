import React from 'react';
import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import QuestionList from '../client/src/components/qa/QuestionList';
import exampleData from '../client/src/components/qa/exampleData'
import Answer from '../client/src/components/qa/Answer';
import QuestionEntry from '../client/src/components/qa/QuestionEntry';
import {ProductContext} from '../client/src/contexts';


describe('QuestionList', () => {
  it('should render "ask a question" button', () => {
    render(
        <QuestionList/>

      );
    let seen = screen.getByRole('button', {name: /ask a question/i});
    expect(seen).toBeTruthy();
  }),

  it('should render "see more questions" button', () => {
    render(
      <ProductContext.Provider value={sampleProduct}>
        <QuestionList/>
      </ProductContext.Provider>
      );
    let seen = screen.getByRole('button', {name: /see more questions/i});
    expect(seen).toBeTruthy();
  }),

  it('should render intial questions to screen', () => {
    render(<QuestionList />);
    const displayedQuestions = screen.getAllByText('Q:', {exact: false})
    expect(displayedQuestions.length).toBe(2);

  })

  it('should click "ask a question" button ', async () => {
    user.setup();
    render(<QuestionList/>)
    const questionButton = screen.getByRole('button', {name: /ask a question/i});
    await user.click(questionButton);
  })

  // it('should not render button after clicking multiple times (WIP)', async () => {
  //   user.setup();
  //   render(<QuestionList />);
  //   const questionButton = screen.getByRole('button', {name: "see more questions"});
  //   await user.click(questionButton);
  //   await user.click(questionButton);
  //   await user.click(questionButton);

  //   const isPresent = screen.queryByRole('button', {name: "see more questions"})
  //   expect(isPresent).toBeNull();
  // }),

  // it('should render all questions upon clicks to screen', async () => {
  //   user.setup();
  //   render(<QuestionList />);
  //   const questionButton = screen.getByRole('button', {name: "see more questions"});
  //   await user.click(questionButton);
  //   await user.click(questionButton);
  //   await user.click(questionButton);
  //   const displayedQuestions = screen.getAllByText('Q:', {exact: false})
  //   /// Will need to adjust as data is being rendered from db and not static data
  //   expect(displayedQuestions.length).toBe(5);

  // })
})

// describe('Answer', () => {
//   it('should display date', () => {
//     render(<QuestionList />);

//     const date = screen.getAllByRole('generic');
//     expect(date).toBeTruthy();
//   }),

//   it('should contain 4 answers on intial rendering of example data', () => {
//     render(<QuestionList />);

//     const answers = screen.getAllByText('A:', {exact: false});
//     expect(answers.length).toBe(4);
//   })
//   it('should render 6 answers on intial rendering of example data (WIP)', async () => {
//     //set up user to simulate user interation //must be done before render
//     user.setup();
//     //renders the component //this uses 3 components
//     render(<QuestionList />);
//     //since multiple buttons of same name exists, assigned each one its own variable name
//     //tuple assigning?
//     const [firstMoreAnswers, secondMoreAnswers] = screen.getAllByRole('button', {name: 'see more answers'});
//     //waits until first button is clicked. this is an async event so await makes sure event is done before moving on
//     await user.click(firstMoreAnswers);
//     //counting how many answers
//     const answers = screen.getAllByText('A:', {exact: false});
//     expect(answers.length).toBe(6);
//   })
// })


