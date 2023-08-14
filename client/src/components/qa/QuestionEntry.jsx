import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import exampleData from './exampleData.js'
import Answer from './Answer.jsx'
const Border = styled.div`
  display: grid;
  grid-template-areas: "question"
                       "answer"
                       "answer"
                       "button";
  border: solid black;
  height: 200px
`
const Question = styled.div`
grid-area: question;`

const AnswerDesign = styled.div`
grid-area: answer;
display: flex;
flex-direction: column;
overflow-y: auto;`

const Button = styled.form`
grid-area: button;
display: flex;
justify-content: flex-end;`




const QuestionEntry = () => {
  const [answersID, setAnswersID] = useState(Object.keys(exampleData.results[0].answers))
  const [answersToRender, setAnswersToRender] = useState([]);
  const [numberToRender, setNumberToRender] = useState(2);

  //creates an array of object
  let answers = Object.entries(exampleData.results[0].answers);

  //sorting function to sort by helpfulness with most helpful being at the top/front
  const compareHelpfulness = (a,b) => {
    return b[1].helpfulness - a[1].helpfulness;
  }
  answers.sort(compareHelpfulness);

  //intiailly renders 2 answers for the question
  useEffect(() => {
    setAnswersToRender(answers.slice(0, numberToRender));
  }, [numberToRender])

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumberToRender(numberToRender + 2);
    console.log('number to render: ', numberToRender)
  }

  const displayButton = () => {
    if (numberToRender < answersID.length) {
      return (
        <input type="submit" value="see more answers" />
        )
      } else {
        <div></div>
    }
  }

  return (
    <>
    <Border>
      <Question><b>Q:</b> {exampleData.results[0].question_body}</Question>
      <AnswerDesign>
        {
          answersToRender.map((answer,index) => (
            <Answer answer={answer[1]} key={answersID[index]}/>
          ))
        }
      </AnswerDesign>
      <form onSubmit={handleSubmit}>
          {displayButton()}
      </form>


    </Border>
    </>
  )
}

export default QuestionEntry;