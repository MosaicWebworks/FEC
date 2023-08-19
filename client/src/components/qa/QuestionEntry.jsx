import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import exampleData from './exampleData.js'
import Answer from './Answer.jsx';
import AnswerModal from './AnswerModal.jsx';
import axios from 'axios';


const Border = styled.div`
  display: grid;
  grid-template-areas: "question"
                       "answer"
                       "answer"
                       "button";
  border-bottom: solid black;
  height: 210px;
  max-height: 50%;
`
const Question = styled.div`
grid-area: question;
margin-bottom: 20px;`


const AnswerDesign = styled.div`
grid-area: answer;
display: flex;
flex-direction: column;
overflow-y: auto;`


const Button = styled.form`
grid-area: button;
display: flex;
justify-content: flex-end;`








const QuestionEntry = ({id, qObject}) => {
  //converts answer id object into array. will help with determining how many answers exist
  const [answersID, setAnswersID] = useState(Object.keys(qObject.answers))
  //answers that will be rendered. initially empty
  const [answersToRender, setAnswersToRender] = useState([]);
  //how many answers will be rendered
  const [numberToRender, setNumberToRender] = useState(2);

  const [isModalShown, setIsModalShown] = useState(false);
  const [addAnswer, setAddAnswer] = useState(true);
  //creates an array of object. contains an array of arrays [0] = id and [1] = answer
  let answers = Object.entries(qObject.answers);

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
      setNumberToRender(2)
    }
  }


  const answersShownButton = () => {
    if (numberToRender < answersID.length) {
      return (
        <input type="submit" value="see more answers" />
        )
      } else {
        return(
          <input type="submit" value="collapse answers" />
        )
    }
  }

  const toggleModal = () => {
    if (!isModalShown) {
      console.log('modal now shown');
      setIsModalShown(true);
    } else {
      console.log('modal no longer being shown');
      setIsModalShown(false);
    }
  }

  const displayModal = () => {
    if (isModalShown) {
      return (
          <AnswerModal question_id={qObject.question_id} product_id={id} question={qObject.question_body}setIsModalShown={setIsModalShown}/>

      )
    }
  }



  return (
    <Border>
      <Question>
        <b>Q:</b> {qObject.question_body}
        <button onClick={toggleModal}>add answer</button>
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
          {answersShownButton()}
      </form>
      <form>
        <input type="submit" value="add an answer"/>
      </form>
    </Border>

  )
}


export default QuestionEntry;