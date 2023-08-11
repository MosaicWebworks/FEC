<<<<<<< HEAD
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import exampleData from './exampleData.js'
import Answer from './Answer.jsx'
=======
import React, {useState} from 'react';
import styled from 'styled-components';
import exampleData from './exampleData.js';
import Answer from './Answer.jsx';
>>>>>>> 1cbbee599b4624b39e54c476828eb34a599b054c
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

<<<<<<< HEAD
const AnswerDesign = styled.div`
=======
const Answers = styled.div`
>>>>>>> 1cbbee599b4624b39e54c476828eb34a599b054c
grid-area: answer;
display: flex;
flex-direction: column;`

const Button = styled.form`
grid-area: button;
display: flex;
justify-content: flex-end;`




const QuestionEntry = () => {
<<<<<<< HEAD
  const [answersID, setAnswersID] = useState(Object.keys(exampleData.results[0].answers))
  console.log(answersID)
  let answersArray = [];
  for (let i = 0; i < answersID.length;i++) {
    answersArray.push(exampleData.results[0].answers[answersID[i]])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

=======
  const [answerID, setAnswerID] = useState(Object.keys(exampleData.results[0].answers))
  console.log(answerID);
  let answerArray = [];
  for (let i = 0; i < answerID.length; i++) {
    answerArray.push(exampleData.results[0].answers[answerID[i]])
  }
  console.log('answers:   ',answerArray);
>>>>>>> 1cbbee599b4624b39e54c476828eb34a599b054c

  return (
    <>
    <Border>
      <Question>Q: {exampleData.results[0].question_body}</Question>
<<<<<<< HEAD
      <AnswerDesign>
        {
          answersArray.map((answer) => (
            <Answer answer={answer}/>
          ))
        }
      </AnswerDesign>
      <form onSubmit={handleSubmit}>
=======
      <Answers>
        {
          answerArray.map((answer) => (
            <Answer answer={answer} />
          ))
        }
      </Answers>
      <Button>
>>>>>>> 1cbbee599b4624b39e54c476828eb34a599b054c
          <input type="submit" value="see more answers" />
      </form>


    </Border>
    </>
  )
}

export default QuestionEntry;