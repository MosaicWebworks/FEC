import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import user from '@testing-library/user-event';
import QuestionList from '../client/src/components/qa/QuestionList';
import exampleData from '../client/src/components/qa/exampleData'
import Answer from '../client/src/components/qa/Answer';
import QuestionEntry from '../client/src/components/qa/QuestionEntry';
import AnswerModal from '../client/src/components/qa/AnswerModal';
import QuestionModal from '../client/src/components/qa/QuestionModal';
import PhotoModal from '../client/src/components/qa/PhotoModal';
import SearchQuestions from '../client/src/components/qa/SearchQuestions';
import {ProductContext, ModalContext} from '../client/src/contexts';
import {mockQuestionData} from '../client/src/components/qa/mockQuestionData'
import axios from 'axios';
import {theme} from '../client/src/components/Styles/LayoutStyles';
import {ThemeProvider} from 'styled-components';

jest.mock('axios');


describe('QuestionList', () => {
  it('should render "ask a question" button', () => {
    const payload = {data: mockQuestionData}
    axios.get.mockResolvedValue({data: mockQuestionData});

    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    let seen = screen.getByRole('button', {name: /ask a question/i});
    expect(seen).toBeTruthy();
  }),

  it('should render "More answered questions" button', () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    let seen = screen.getByRole('button', {name: /More answered questions/i});
    expect(seen).toBeTruthy();
  }),

  it('should render intial questions to screen', () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const displayedQuestions = screen.getAllByText('Q:', {exact: false})
    expect(displayedQuestions.length).toBe(2);

  })

  it('should click "ask a question" button ', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const questionButton = screen.getByRole('button', {name: /ask a question/i});
    await user.click(questionButton);
  }),

  it('should not render button after clicking multiple times', async () => {
    user.setup();
    await render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
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
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const questionButton = screen.getByRole('button', {name: /more answered questions/i});
    await user.click(questionButton);
    await user.click(questionButton);
    await user.click(questionButton);
    const displayedQuestions = screen.getAllByText('Q:', {exact: false})

    expect(displayedQuestions.length).toBe(5);

  }),

  it('should render 4 questions on on clicking "more answered questions" button once', async () => {

    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const button = screen.getByRole('button', {name: /more answered questions/i});
    await user.click(button);
    const answers = screen.getAllByText('Q:', {exact: false});
    console.log('length', answers.length)
    expect(answers.length).toBe(4);
  })
})

describe('Answer', () => {
  it('should display date', () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );

    const date = screen.getAllByRole('generic');
    expect(date).toBeTruthy();
  }),

  it('should contain 4 answers on intial rendering of example data', () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );

    const answers = screen.getAllByText('A:', {exact: false});
    expect(answers.length).toBe(4);
  })
  it('should render 7 answers(all thats present in example data) on on clicking "more answered questions" button once', async () => {

    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const button = screen.getByRole('button', {name: /more answered questions/i});
    await user.click(button);
    const answers = screen.getAllByText('A:', {exact: false});
    console.log('length', answers.length)
    expect(answers.length).toBe(7);
  })
})

describe('Report', () => {
  it('should render a report question button', () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /report question/i})
    expect(button).toBeTruthy();
  })
  it('should render a report answer button', () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /report answer/i})
    expect(button).toBeTruthy();
  })
  it('should change to "already reported" upon clicking report question button', async () => {
    axios.put.mockResolvedValue({data: {status: 204}})
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [firstButton, secondButton] = screen.getAllByRole('button', {name: /report question/i})
    await user.click(firstButton);

    const reportButton = screen.getByRole('button', {name: /already reported/i})

    expect(reportButton).toBeTruthy();

  })
  it('should change to "already reported" upon clicking report answer button', async () => {
    axios.put.mockResolvedValue({data: {status: 204}})
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /report answer/i})
    await user.click(button[0]);

    const reportButton = screen.getByRole('button', {name: /already reported/i})

    expect(reportButton).toBeTruthy();
  })

  it('should change answer attribute to reported', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /report answer/i})
    await user.click(button[0]);

    const reportButton = screen.getByRole('button', {name: /already reported/i})

    expect(reportButton).toBeTruthy();
  })



})

describe('Helpful', () => {

  it('should render a helpful button', () => {

    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /helpful/i, exact: false})
    expect(button).toBeTruthy();
  })

  it('should allow click of helpfulness btn', async () => {

    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const button = screen.getByRole('button', {name: /helpful\? Yes\(18\)/i, exact: false})


    await user.click(button);
    expect(button).toBeTruthy();

  })

  it('should not allow click of helpfulness btn', async () => {

    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const button = screen.getByRole('button', {name: /helpful\? Yes\(18\)/i, exact: false})


    await user.click(button);

    const clickedButton = screen.getByRole('button', {name: /helpful\? Yes\(19\)/i})
    await user.click(clickedButton);

    const clickedNewButton = screen.getByRole('button', {name: /helpful\? Yes\(19\)/i})
    expect(clickedNewButton).toBeTruthy();

  })

})

describe('Modals', () => {
  it('should render the add answer button', () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /add answer/i, exact: false})
    expect(button).toBeTruthy();
  })

  it('should open answer modal upon click', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [firstButton, secondButton] = screen.getAllByRole('button', {name: /add answer/i, exact: false})
    await user.click(firstButton);
    //search for text in modal displayed

    const displayedText = screen.getByText(/Submit your question/i);
    expect(displayedText).toBeTruthy();
  })

  it('should display question modal', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const addQuestion = screen.getByRole('button', {name: /ask a question/i});

    await user.click(addQuestion);

    const textarea = screen.getByLabelText(/question/i);
    const username = screen.getByLabelText(/username/i);
    const email = screen.getByLabelText(/email/i);
    await user.type(textarea, '20');
    await user.type(username, 'john');
    await user.type(email,'email@domain.com');
    expect(username.value).toBe('john');
    expect(textarea.value).toBe('20');
    expect(email.value).toBe('email@domain.com');

  })

  it('should display answer modal', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );

    const [...addAnswer] = screen.getAllByRole('button', {name: /add answer/i});
    await user.click(addAnswer[0]);

    const textarea = screen.getByLabelText(/answer/i);
    const username = screen.getByLabelText(/username/i);
    const email = screen.getByLabelText(/email/i);
    await user.type(textarea, '20');
    await user.type(username, 'john');
    await user.type(email,'email@domain.com');
    expect(username.value).toBe('john');
    expect(textarea.value).toBe('20');
    expect(email.value).toBe('email@domain.com');
  })

  // it('should return successful response upon posting (WIP)', async () => {
  //   const data = {data: {name: '', body: '', email: '', photos:[]}}
  //   user.setup();
  //   render(<QuestionList/>);

  //   const [...addAnswer] = screen.getAllByRole('button', {name: /add answer/i});
  //   await user.click(addAnswer[0]);


  //   axios.post.mockResolvedValue({data: 201})


  //   await axios.post('/data/qa/questions/646821/answers', {})
  //   .then((results) => {

  //     expect(results.data).toBe(201);
  //   })
  // })



})







describe('Photo modal', () => {
  it('should display a photomodal upon clicking photos button on answer modal', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /add answer/i});
    // await user.click(button[0]);
    await user.click(button[0]);
    //search for text in modal displayed

    const photosButton = screen.getByRole('button', {name: /photos/i});
    await user.click(photosButton);
    const displayedText = screen.getByText(/add your photos/i);
    expect(displayedText).toBeTruthy();
  })

  it('should render "add photo" button on photo modal', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
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
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
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
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /add answer/i});

    await user.click(button[0]);

    const photosButton = screen.getByRole('button', {name: /photos/i});
    await user.click(photosButton);
    const displayedButton = screen.getByRole('button', {name: /cancel/i});
    await user.click(displayedButton);

    const displayedText = screen.getByText(/Submit your question/i);

    expect(displayedText).toBeTruthy();
  })

  it('should add photos when clicking add photo button', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );
    const [...button] = screen.getAllByRole('button', {name: /add answer/i});

    await user.click(button[0]);


    const photosButton = screen.getByRole('button', {name: /photos/i});
    await user.click(photosButton);
    const addPhotoButton = screen.getByRole('button', {name: /add photo/i});
    const [...currentPhotos] = screen.getAllByRole('img');

    const photoLink = screen.getByPlaceholderText(/add photo link/i);
    const link = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=962&q=80'
    await user.type(photoLink, link )
    expect(photoLink.value).toBe(link)
    await user.click(addPhotoButton);

    expect(screen.getAllByRole('img').length - currentPhotos.length).toBe(1);







  })
})


describe('Search bar', () => {

  it('should update search bar when typed', async () => {
    user.setup();
    render(
      <ThemeProvider theme={theme}>
        <QuestionList/>
      </ThemeProvider>
      );

    const search = screen.getByPlaceholderText(/have a question/i);
    expect(search).toBeTruthy();

    await user.type(search, 'You');
    expect(search.value).toBe('You');
  })

})