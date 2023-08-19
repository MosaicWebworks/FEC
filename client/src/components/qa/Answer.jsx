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
  //separate date added into mon,day,year components
  const year = answer.date.slice(0,4);
  const month = answer.date.slice(5,7);
  const day = answer.date.slice(8,10);
  //converts time into date object
  const dateAdded = new Date(year, month, day);
  //formats according date according to desired format
  const formattedDate = format(dateAdded, 'MMM-dd-yyyy');

  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulness, setHelpfulness] = useState(answer.helpfulness)
  const [isReported, setIsReported] = useState(false);

  //create button to increment helpful on button Click
  const changeHelpful = () => {
    // e.preventDefault();
    if (!isHelpful) {
      setIsHelpful(true);
      axios.put(`data/qa/answers/${answer.id}/helpful`)
        .then(() => {
          console.log('marked as helpful');
          setHelpfulness(helpfulness + 1);
      })
        .catch((err) => console.log(err));
    } else {
      console.log('already marked as helpful')
    }
  }

  const reportButton = () => {
    if (!isReported) {
      return (
        <button className="btn-report">Report</button>
      )
    } else {
      return (
        <button className="btn-report">Already Reported</button>
      )
    }
  }


  const reportAnswer = (e) => {
    e.preventDefault();
    if (!isReported) {
      setIsReported(true);
    } else {
      console.log('already reported');
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
        <button className="btn-helpfulness" onClick={changeHelpful}>Helpful? Yes({helpfulness})</button>
        {reportButton()}
      </StyledButton>
    </div>
  )
}

export default Answer;