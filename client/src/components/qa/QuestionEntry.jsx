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
  width: 600px;
  height: 200px
`
const Question = styled.div`
grid-area: question;`

const AnswerDesign = styled.div`
grid-area: answer;
display: flex;
flex-direction: column;`

const Button = styled.form`
grid-area: button;
display: flex;
justify-content: flex-end;`




const QuestionEntry = () => {
  const [answersID, setAnswersID] = useState(Object.keys(exampleData.results[0].answers))
  console.log(answersID)
  let answersArray = [];
  for (let i = 0; i < answersID.length;i++) {
    answersArray.push(exampleData.results[0].answers[answersID[i]])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <>
    <Border>
      <Question>Q: {exampleData.results[0].question_body}</Question>
      <AnswerDesign>
        {
          answersArray.map((answer) => (
            <Answer answer={answer}/>
          ))
        }
      </AnswerDesign>
      <form onSubmit={handleSubmit}>
          <input type="submit" value="see more answers" />
      </form>


    </Border>
    </>
  )
}

export default QuestionEntry;