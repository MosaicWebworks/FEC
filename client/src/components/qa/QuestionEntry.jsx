import React, {useState, useEffect, createContext, useContext} from 'react';
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


const QuestionEntry = ({id, qObject}) => {
  //converts answer id object into array. will help with determining how many answers exist
  const [answersID, setAnswersID] = useState(Object.keys(qObject.answers))
  //answers that will be rendered. initially empty
  const [answersToRender, setAnswersToRender] = useState([]);
  //how many answers will be rendered
  const [numberToRender, setNumberToRender] = useState(2);


  const [isAnswerModalShown, setIsAnswerModalShown] = useContext(AnswerModalContext);
  const [isModalShown, setIsModalShown, closeModal] = useContext(ModalContext);


  const [addAnswer, setAddAnswer] = useState(true);

  //creates an array of object. contains an array of arrays [0] = id and [1] = answer
  let answers = Object.entries(qObject.answers);

  const [isReported, setIsReported] = useState(false);


  //sorting function to sort by helpfulness with most helpful being at the top/front
  const compareHelpfulness = (a, b) => {
    return b[1].helpfulness - a[1].helpfulness;
  }


  //calls sort function on array while sorting
  answers.sort(compareHelpfulness);


  //intiailly renders 2 answers for the question
  useEffect(() => {
    setAnswersToRender(answers.slice(0, numberToRender));
  }, [numberToRender])



  //handle submit of clicking on see more answers
  const handleSubmit = (e) => {
    e.preventDefault();
    if (numberToRender === 2) {
      setNumberToRender(answersID.length);
    } else {
      console.log('number to render', numberToRender)
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
    if (!isAnswerModalShown) {
      console.log('modal now shown');
      setIsAnswerModalShown(true);
    } else {
      console.log('modal no longer being shown');
      setIsAnswerModalShown(false);
    }
  }

  //need to create a useContext for the setIsModalShown
  const displayModal = () => {
    if (isAnswerModalShown) {
      return (
        <QuestionContext.Provider value={[qObject]}>
          <AnswerModal product_id={id}/>
        </QuestionContext.Provider>

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
            <Answer answer={answer[1]} key={answersID[index]}/>
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