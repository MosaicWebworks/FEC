import React from 'react';
import {render, screen} from '@testing-library/react';
import user from '@testing-library/user-event';
import QuestionList from '../client/src/components/qa/QuestionList';
import exampleData from '../client/src/components/qa/exampleData'
import Answer from '../client/src/components/qa/Answer';
import QuestionEntry from '../client/src/components/qa/QuestionEntry';
import AnswerModal from '../client/src/components/qa/AnswerModal';
import QuestionModal from '../client/src/components/qa/QuestionModal';
import PhotoModal from '../client/src/components/qa/PhotoModal';
import SearchQuestions from '../client/src/components/qa/SearchQuestions';
import {ProductContext} from '../client/src/contexts';
import {mockQuestionData} from '../client/src/components/qa/mockQuestionData'
import axios from 'axios';


jest.mock('axios');


describe('QuestionList', () => {
  it('should render "ask a question" button', () => {
    const payload = {data: mockQuestionData}
    axios.get.mockResolvedValue({data: mockQuestionData});

    render(
        <QuestionList/>
      );
    let seen = screen.getByRole('button', {name: /ask a question/i});
    expect(seen).toBeTruthy();
  }),

  it('should render "More answered questions" button', () => {
    render(
        <QuestionList/>
      );
    let seen = screen.getByRole('button', {name: /More answered questions/i});
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
  }),

  it('should not render button after clicking multiple times', async () => {
    user.setup();
    await render(<QuestionList />);
    const questionButton = screen.getByRole('button', {name: /more answered questions/i});
    await user.click(questionButton);
    await user.click(questionButton);
    await user.click(questionButton);
    await user.click(questionButton);
    await user.click(questionButton);

    const isPresent = screen.queryByRole('button', {name: /more answered questions/i})
    expect(isPresent).toBeNull();
  })

  it('should render all questions upon clicks to screen', async () => {
    user.setup();
    render(<QuestionList />);
    const questionButton = screen.getByRole('button', {name: /more answered questions/i});
    await user.click(questionButton);
    await user.click(questionButton);
    await user.click(questionButton);
    const displayedQuestions = screen.getAllByText('Q:', {exact: false})

    expect(displayedQuestions.length).toBe(5);

  }),

  it('should render 4 questions on on clicking "more answered questions" button once', async () => {

    user.setup();
    render(<QuestionList />);
    const button = screen.getByRole('button', {name: /more answered questions/i});
    await user.click(button);
    const answers = screen.getAllByText('Q:', {exact: false});
    console.log('length', answers.length)
    expect(answers.length).toBe(4);
  })
})

describe('Answer', () => {
  it('should display date', () => {
    render(<QuestionList />);

    const date = screen.getAllByRole('generic');
    expect(date).toBeTruthy();
  }),

  it('should contain 4 answers on intial rendering of example data', () => {
    render(<QuestionList />);

    const answers = screen.getAllByText('A:', {exact: false});
    expect(answers.length).toBe(4);
  })
  it('should render 7 answers(all thats present in example data) on on clicking "more answered questions" button once', async () => {

    user.setup();
    render(<QuestionList />);
    const button = screen.getByRole('button', {name: /more answered questions/i});
    await user.click(button);
    const answers = screen.getAllByText('A:', {exact: false});
    console.log('length', answers.length)
    expect(answers.length).toBe(7);
  })
})

describe('Report', () => {
  it('should render a report question button', () => {
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /report question/i})
    expect(button).toBeTruthy();
  })
  it('should render a report answer button', () => {
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /report answer/i})
    expect(button).toBeTruthy();
  })
  it('should change to "already reported" upon clicking report question button', async () => {
    axios.put.mockResolvedValue({data: {status: 204}})
    user.setup();
    render(<QuestionList/>);
    const [firstButton, secondButton] = screen.getAllByRole('button', {name: /report question/i})
    await user.click(firstButton);

    const reportButton = screen.getByRole('button', {name: /already reported/i})

    expect(reportButton).toBeTruthy();

  })
  it('should change to "already reported" upon clicking report answer button', async () => {
    axios.put.mockResolvedValue({data: {status: 204}})
    user.setup();
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /report answer/i})
    await user.click(button[0]);

    const reportButton = screen.getByRole('button', {name: /already reported/i})

    expect(reportButton).toBeTruthy();
  })

  it('should change answer attribute to reported', async () => {
    user.setup();
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /report answer/i})
    await user.click(button[0]);

    const reportButton = screen.getByRole('button', {name: /already reported/i})

    expect(reportButton).toBeTruthy();
  })



})

describe('Helpful', () => {

  it('should render a helpful button', () => {
    axios.put.mockResolvedValue({data: {status: 204}})
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /helpful/i, exact: false})
    expect(button).toBeTruthy();
  })

  it('should allow click of helpfulness btn', async () => {
    axios.put.mockResolvedValue({data: {status: 204}});
    user.setup();
    render(<QuestionList/>);
    const button = screen.getByRole('button', {name: /helpful\? Yes\(18\)/i, exact: false})


    await user.click(button);
    expect(button).toBeTruthy();
    // const newButton = screen.getByRole('button', {name: /helpful\? Yes\(18\)/i, exact: false})

    // expect(newButton).toBeTruthy()

  })

  it('should not allow click of helpfulness btn', async () => {
    axios.put.mockResolvedValue({data: {status: 204}});
    user.setup();
    render(<QuestionList/>);
    const button = screen.getByRole('button', {name: /helpful\? Yes\(18\)/i, exact: false})


    await user.click(button);

    const clickedButton = screen.getByRole('button', {name: /helpful\? Yes\(19\)/i})
    await user.click(clickedButton);

    const clickedNewButton = screen.getByRole('button', {name: /helpful\? Yes\(19\)/i})
    expect(clickedButton).toBeTruthy();

  })

})
// axios.post.mockResolvedValue({data: {status: 201}});
describe('Modals', () => {
  it('should render the add answer button', async () => {
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /add answer/i, exact: false})
    expect(button).toBeTruthy();
  })

  it('should open answer modal upon click', async () => {
    user.setup();
    render(<QuestionList/>);
    const [firstButton, secondButton] = screen.getAllByRole('button', {name: /add answer/i, exact: false})
    await user.click(firstButton);
    //search for text in modal displayed

    const displayedText = screen.getByText(/Submit your question/i);
    expect(displayedText).toBeTruthy();
  })





})







describe('Photo modal', () => {
  it('should display a photomodal upon clicking photos button on answer modal', async () => {
    user.setup();
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /add answer/i});
    // await user.click(button[0]);
    await user.click(button[0]);
    //search for text in modal displayed

    const photosButton = screen.getByRole('button', {name: /photos/i});
    await user.click(photosButton);
    const displayedText = screen.getByText(/add your photos/i);
    expect(displayedText).toBeTruthy();
  })

  it('should have placeholder text of "add photo link" on photo modal', async () => {
    user.setup();
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /add answer/i});
    // await user.click(button[0]);
    await user.click(button[0]);
    //search for text in modal displayed

    const photosButton = screen.getByRole('button', {name: /photos/i});
    await user.click(photosButton);
    const displayedText = screen.getByPlaceholderText(/add photo link/i);
    expect(displayedText).toBeTruthy();
  })

  it('should render "add photo" button on photo modal', async () => {
    user.setup();
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /add answer/i});
    // await user.click(button[0]);
    await user.click(button[0]);
    //search for text in modal displayed

    const photosButton = screen.getByRole('button', {name: /photos/i});
    await user.click(photosButton);
    const displayedButton = screen.getByRole('button', {name: /add photo/i});
    expect(displayedButton).toBeTruthy();
  })

  it('should render "cancel" button on photo modal', async () => {
    user.setup();
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /add answer/i});
    // await user.click(button[0]);
    await user.click(button[0]);
    //search for text in modal displayed

    const photosButton = screen.getByRole('button', {name: /photos/i});
    await user.click(photosButton);
    const displayedButton = screen.getByRole('button', {name: /cancel/i});
    expect(displayedButton).toBeTruthy();
  })

  it('should close "add photo" modal upon clicking cancel', async () => {
    user.setup();
    render(<QuestionList/>);
    const [...button] = screen.getAllByRole('button', {name: /add answer/i});
    // await user.click(button[0]);
    await user.click(button[0]);
    //search for text in modal displayed

    const photosButton = screen.getByRole('button', {name: /photos/i});
    await user.click(photosButton);
    const displayedButton = screen.getByRole('button', {name: /cancel/i});
    await user.click(displayedButton);

    const displayedText = screen.getByText(/Submit your question/i);

    expect(displayedText).toBeTruthy();
  })
})
