import React from 'react';
import styled from 'styled-components';
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

const Answer = styled.div`
grid-area: answer;
display: flex;
flex-direction: column;`

const Button = styled.form`
grid-area: button;
display: flex;
justify-content: flex-end;`




const QuestionEntry = () => {



  return (
    <>
    <Border>
      <Question>Question goes here</Question>
      <Answer>
        <div>Answer1 goes here</div>
        <div>Answer2 goes here</div>
      </Answer>
      <Button>
          <input type="submit" value="see more answers" />
      </Button>

    </Border>
    </>
  )
}

export default QuestionEntry;