import React, {useState, useEffect, createContext, useContext, useMemo} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import exampleData from './exampleData.js'
import Answer from './Answer.jsx';
import AnswerModal from './AnswerModal.jsx';
import axios from 'axios';
import Report from './Report.jsx';
import {StyledButton, Button, InputSubmit} from '../Styles/ButtonStyles.jsx';
import {theme} from '../Styles/LayoutStyles.jsx';
import {Question, Border, AnswerDesign} from './QuestionEntryStyles.jsx';
import {ModalContext, AnswerModalContext} from '../../contexts.js'
export const QuestionContext = createContext();
export const AnswerContext = createContext();
export const IdContext = createContext();
const QuestionEntry = ({id, qObject, list, index}) => {
  //converts answer id object into array. will help with determining how many answers exist
  const [answersID, setAnswersID] = useState(Object.keys(qObject.answers))
  //answers that will be rendered. initially empty
  const [answersToRender, setAnswersToRender] = useState([]);
  //how many answers will be rendered
  const [numberToRender, setNumberToRender] = useState(2);



  const [isAnswerModalShown, setIsAnswerModalShown] = useContext(AnswerModalContext);
  const [isModalShown, setIsModalShown, closeModal] = useContext(ModalContext);


  const [addAnswer, setAddAnswer] = useState(true);
  let answers = Object.entries(qObject.answers);
  const [isReported, setIsReported] = useState(false);



  const compareHelpfulness = (a, b) => {
    return b[1].helpfulness - a[1].helpfulness;
  }



  answers.sort(compareHelpfulness);

  useEffect(() => {
    setAnswersToRender(answers.slice(0, numberToRender));
  }, [numberToRender])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (numberToRender === 2) {
      setNumberToRender(answersID.length);
    } else {
      setNumberToRender(2)
    }
  }

  const moreAnswersButton = () => {
    if (answersID.length < 2) {
      return (
        <div></div>
      )
    } else if (numberToRender < answersID.length) {
      return (
        <InputSubmit type="submit" value="see more answers" />
        )
      } else if (numberToRender > 2) {
        return(
          <InputSubmit type="submit" value="collapse answers" />
        )
    }
  }

  const toggleModal = () => {
    if ( !isAnswerModalShown) {
      setIsAnswerModalShown(true);
    } else {
      setIsAnswerModalShown(false);
    }
  }


  const displayModal = () => {
    if (isAnswerModalShown) {
      return (
          <AnswerModal
          product_id={id}
          setIsAnswerModalShown={setIsAnswerModalShown}
          info={list[index]}/>
      )
    }
  }

  const reportButton = () => {
    if (!isReported) {
      return (
        <Report path={'questions'} id={qObject.question_id} setIsReported={setIsReported}/>
      )
    } else {
      return (
        <Button className="btn-report">Already Reported</Button>
      )
    }
  }

  return (
    <Border onClick={closeModal}>
      <Question>
        <b>Q: {qObject.question_body}</b>
        <StyledButton>
          <Button onClick={toggleModal}>
            add answer
          </Button>
          {reportButton()}
        </StyledButton>
          {displayModal()}
      </Question>
      <AnswerDesign>
        {
          answersToRender.map((answer,index) => (
            <Answer
              answer={answer[1]}
              key={answersID[index]}/>
          ))
        }
      </AnswerDesign>
      <form onSubmit={handleSubmit}>
          {moreAnswersButton()}
      </form>
    </Border>
  )
}

export default QuestionEntry;