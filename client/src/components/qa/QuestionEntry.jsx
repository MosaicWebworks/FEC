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
  const [answersToRender, setAnswersToRender] = useState([]);
  // let i;
  const [numberToRender, setNumberToRender] = useState(2);
  let answers = [];
  for (let i = 0; i < answersID.length; i++) {
    answers.push(exampleData.results[0].answers[answersID[i]]);
  }

  console.log('answers to render:  ',answers)

  useEffect(() => {
    setAnswersToRender(answers.slice(0, numberToRender));
  }, [numberToRender])

  const handleSubmit = (e) => {
    e.preventDefault();
    setNumberToRender(numberToRender + 2);
    console.log('btn clicked. toRender is:',numberToRender);
  }

  return (
    <>
    <Border>
      <Question>Q: {exampleData.results[0].question_body}</Question>
      <AnswerDesign>
        {
          answersToRender.map((answer,index) => (
            <Answer answer={answer} key={answersID[index]}/>
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