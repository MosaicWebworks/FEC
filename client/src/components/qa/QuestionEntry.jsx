import React, {useState} from 'react';
import styled from 'styled-components';
import exampleData from './exampleData.js';
import Answer from './Answer.jsx';
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

const Answers = styled.div`
grid-area: answer;
display: flex;
flex-direction: column;`

const Button = styled.form`
grid-area: button;
display: flex;
justify-content: flex-end;`




const QuestionEntry = () => {
  const [answerID, setAnswerID] = useState(Object.keys(exampleData.results[0].answers))
  console.log(answerID);
  let answerArray = [];
  for (let i = 0; i < answerID.length; i++) {
    answerArray.push(exampleData.results[0].answers[answerID[i]])
  }
  console.log('answers:   ',answerArray);

  return (
    <>
    <Border>
      <Question>Q: {exampleData.results[0].question_body}</Question>
      <Answers>
        {
          answerArray.map((answer) => (
            <Answer answer={answer} />
          ))
        }
      </Answers>
      <Button>
          <input type="submit" value="see more answers" />
      </Button>

    </Border>
    </>
  )
}

export default QuestionEntry;