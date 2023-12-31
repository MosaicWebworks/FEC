import React, {useState, useEffect, useContext, createContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {ModalContainer, ModalForm, CloseModal, Product, Header, Warning, Submit, PhotoSection, AlignContent, StyledPhotos} from '../Styles/ModalStyles.jsx';
import {Button} from '../Styles/ButtonStyles.jsx';
import {PhotoContext} from '../../contexts.js';
import PhotoModal from './PhotoModal.jsx';
import PhotoEntry from './Photo.jsx';


export const IdContext = createContext();

const AnswerModal = ({product_id, setIsAnswerModalShown, info}) => {
  const [productName, setProductName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);

  const [question_id, setQuestionID] = useState(0);
  const [question_body, setQuestionBody] = useState('...Loading');

  const [isPhotoModalShown, setIsPhotoModalShown] = useState(false);

  const [isInvalid, setIsInvalid] = useState(false)
  useEffect( () => {
    if (info) {
      setQuestionID(info[1].question_id);
      setQuestionBody(info[1].question_body);
    }

    axios.get(`data/products/${product_id}`)
      .then((results) => {
        setProductName(results.data.name);
      })
      .catch((err) => console.log(err));
  }, [])


  const handleSubmit = () => {
    axios.post(`data/qa/questions/${question_id}/answers`, {
      name: name,
      email: email,
      body: body,
      photos: []
    })
    .then((results) => {
      setIsAnswerModalShown(false);
    })
    .catch(() => {
      setIsInvalid(true);
    })
  }

  const invalidEntry = () => {
    if (isInvalid) {
     return (
      <Warning>
        <small>You must enter the following:<br/>This may have occurred if:
            <li>A mandatory field is blank</li>
            <li>The email address provided is not in correct email format</li>
            <li>The images selected are invalid or unable to be uploaded.</li>
        </small>
      </Warning>
     )
    } else {
      return <div></div>
    }
  }


  const togglePhoto = () => {
    if (!isPhotoModalShown) {
      setIsPhotoModalShown(true);
    }
  }






  return (
    <PhotoContext.Provider value={[photos,setPhotos, setIsPhotoModalShown]}>
      {info &&
      <AlignContent>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <Header>
            <h1>Submit your answer</h1>
            <b>{productName}:</b> {question_body}
          </Header>
          <ModalForm>
            <form>
              <label>*Answer:
                <textarea
                  name="body"
                  placeholder="type answer here..."
                  required
                  onChange={(e) => setBody(e.target.value)}
                  rows="5" cols="50"
                />
              </label>
              <br/><br/>
              <label>*Username:
                <input
                  name="name"
                  type="text"
                  placeholder="Example: jack543!"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <br/>
              <small>For privacy reasons, do not use your full name or email address</small><br/><br/>
              <label>*email:
                <input
                  name="email"
                  type="text"
                  placeholder="Example: jack@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <br/>
              <small>For authentication reasons, you will not be emailed</small><br/><br/>

            </form>
            {invalidEntry()}
            <StyledPhotos>
              {photos.map((photo, index) => (
                <PhotoEntry photo={photo} key={index}/>
              ))}
            </StyledPhotos>
          </ModalForm>
          <Submit>
            {photos.length < 5 ? <Button onClick={togglePhoto}>Photos</Button> : <div></div>}
            {isPhotoModalShown ? <PhotoModal/> : <div></div>}
            <Button onClick={handleSubmit}>submit</Button>
          </Submit>
          <PhotoSection>
          </PhotoSection>
        </ModalContainer>

      </AlignContent>
      }
    </PhotoContext.Provider>
  )
}

export default AnswerModal;


