import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';
import axios from 'axios';
import Report from './Report.jsx';
import {StyledButton} from '../Styles/ButtonStyles.jsx';
import Photos from './Photo.jsx';
import {AnswerPhotos} from '../Styles/ModalStyles.jsx';


const Answer = ({setAddedEntity, answer}) =>{
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
    }
  }

  const reportButton = () => {
    if (!isReported) {
      return (
        <Report path={'answers'} id={answer.id} setIsReported={setIsReported}/>
      )
    } else {
      return (
        <button className="btn-report">Already Reported</button>
      )
    }
  }


  return (
    <div>
      <div>
      <b>A:</b> {answer.body}
      </div>
      <div className="username">by {answer.answerer_name}, <small className="data-answered">{formattedDate}</small></div>
      <StyledButton>
        <button data-testid="answer-helpful" className="btn-helpfulness" onClick={changeHelpful}>Helpful? Yes({helpfulness})</button>
        {reportButton()}
      </StyledButton>
      <AnswerPhotos>
        {
          answer.photos && answer.photos.map((photo, index) => (
            <Photos photo={photo} key={index}/>
          ))
        }
      </AnswerPhotos>
    </div>
  )
}

export default Answer;