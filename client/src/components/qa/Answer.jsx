import React from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';

const StyledButton = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
`



const Answer = ({answer}) =>{
  //separate date added into mon,day,year components
  const year = answer.date.slice(0,4);
  const month = answer.date.slice(5,7);
  const day = answer.date.slice(8,10);
  //converts time into date object
  const dateAdded = new Date(year, month, day);
  //formats according date according to desired format
  const formattedDate = format(dateAdded, 'MMM-dd-yyyy');


  return (
    <div>
      <div>
      <b>A:</b> {answer.body}
      </div>
      <div className="username"><b>{answer.answerer_name}</b></div>
      <small className="data-answered">{formattedDate}</small>
      <StyledButton>
        <button className="btn-helpfulness">Helpful? Yes({answer.helpfulness})</button>
        <button className="btn-report">Report</button>
      </StyledButton>
    </div>
  )
}

export default Answer;