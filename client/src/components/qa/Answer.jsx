import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
`


const Answer = ({answer}) => (

  <div>
    <div>
    <b>A:</b> {answer.body}
    </div>
    <div className="username"><b>{answer.answerer_name}</b></div>
    <small className="data-answered">{answer.date}</small>
    <StyledButton>
      <button className="btn-helpfulness">Helpful?({answer.helpfulness})</button>
      <button className="btn-report">Report</button>
    </StyledButton>
  </div>
)

export default Answer;