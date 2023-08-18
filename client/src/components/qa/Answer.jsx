import React, {useState} from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';
import axios from 'axios';

const StyledButton = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
`



const Answer = ({answer}) =>{
  console.log('answers id:', answer.id)
  //separate date added into mon,day,year components
  const year = answer.date.slice(0,4);
  const month = answer.date.slice(5,7);
  const day = answer.date.slice(8,10);
  //converts time into date object
  const dateAdded = new Date(year, month, day);
  //formats according date according to desired format
  const formattedDate = format(dateAdded, 'MMM-dd-yyyy');

  const [isHelpful, setIsHelpful] = useState(false);
  const [isReported, setIsReported] = useState(false);

  //create button to increment helpful on button Click
  const changeHelpful = (e) => {
    e.preventDefault();
    if (!isHelpful) {
      setIsHelpful(true);
      axios.put(`/qa/answers/:${answer.id}/helpful`)
        .then(() => console.log('marked as helpful'))
        .catch((err) => console.log(err));
    } else {
      console.log('already marked as helpful')
    }
  }

  return (
    <div>
      <div>
      <b>A:</b> {answer.body}
      </div>
      <div className="username"><b>{answer.answerer_name}</b></div>
      <small className="data-answered">{formattedDate}</small>
      <StyledButton>
        <form onSubmit={changeHelpful}>
          <button className="btn-helpfulness">Helpful? Yes({answer.helpfulness})</button>
        </form>
        <button className="btn-report">Report</button>
      </StyledButton>
    </div>
  )
}

export default Answer;