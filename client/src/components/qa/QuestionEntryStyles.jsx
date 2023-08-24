import styled from 'styled-components';


const Border = styled.div`
  display: grid;
  grid-template-areas: "question"
                       "answer"
                       "answer"
                       "button";
  border-bottom: solid lightgray;
  color: ${({theme}) => theme.colors.textSecondary};
  max-height: 50vh;
  `
const Question = styled.div`
grid-area: question;
margin-bottom: 10px;
text-align:center;
color: ${({theme}) => theme.colors.text};
`


const AnswerDesign = styled.div`
grid-area: answer;
display: flex;
flex-direction: column;
overflow-y: auto;`

export {
  Question,
  Border,
  AnswerDesign
}