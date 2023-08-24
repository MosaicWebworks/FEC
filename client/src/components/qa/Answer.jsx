import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';
import axios from 'axios';
import Report from './Report.jsx';
import {StyledButton, Button} from '../Styles/ButtonStyles.jsx';
import PhotoEntry from './Photo.jsx';
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
    if (!isHelpful) {
      setIsHelpful(true);
      axios.put(`data/qa/answers/${answer.id}/helpful`)
        .then(() => {
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
        <Button >Already Reported</Button>
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
        <Button  onClick={changeHelpful}>Helpful? Yes({helpfulness})</Button>
        {reportButton()}
      </StyledButton>
      <AnswerPhotos>
        {
          answer.photos && answer.photos.map((photo, index) => (
            <PhotoEntry photo={photo} key={index}/>
          ))
        }
      </AnswerPhotos>
    </div>
  )
}

export default Answer;