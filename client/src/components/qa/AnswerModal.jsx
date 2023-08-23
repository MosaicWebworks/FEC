import React, {useState, useEffect, useContext, createContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {ModalContainer, ModalForm, CloseModal, Product, Header, Warning, Submit, Fotos, AlignContent, StyledPhotos} from '../Styles/ModalStyles.jsx';
import {QuestionContext} from './QuestionEntry.jsx';
import PhotoModal from './PhotoModal.jsx';
import PhotoEntry from './Photo.jsx';




export const PhotoContext = createContext();

const AnswerModal = ({product_id}) => {
  const [productName, setProductName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [photos, setPhotos] = useState([]);

  const [isPhotoModalShown, setIsPhotoModalShown] = useState(false);
  const [displayPhotoModal, setDisplayPhotoModal] = useState(false);


  const [shouldAddPhoto, setShouldAddPhoto] = useState(false)
  const [qObject, setIsModalShown] = useContext(QuestionContext)
  const {question_id, question_body} = qObject;

  const [isInvalid, setIsInvalid] = useState(false)
  useEffect( () => {
    axios.get(`data/products/${product_id}`)
      .then((results) => {
        setProductName(results.data.name);
      })
      .catch((err) => console.log(err));
  }, [])


  const toggleModal = () => {
    setIsModalShown(false);
  }

  const handleSubmit = () => {
    axios.post(`data/qa/questions/${question_id}/answers`, {
      name: name,
      email: email,
      body: body,
      photos: []
    })
    .then((results) => {
      setIsModalShown(false);
      console.log('answer submitted')
    })
    .catch(() => {
      setIsInvalid(true);
      console.log('Invalid Submission');
    })
  }

  const invalidEntry = () => {
    if (isInvalid) {
     return (
      <Warning>
        <small>You must enter the following:<br/>This may have occurred if:
          <ol>
            <li>A mandatory field is blank</li>
            <li>The email address provided is not in correct email format</li>
            <li>The images selected are invalid or unable to be uploaded.</li>
          </ol>
        </small>
      </Warning>
     )
    } else {
      return <div></div>
    }
  }


  const togglePhoto = () => {
    // debugger;
    if (!isPhotoModalShown) {
      setIsPhotoModalShown(true);
      console.log('is shown');
    }
  }




  return (
    <PhotoContext.Provider value={[photos,setPhotos, setIsPhotoModalShown]}>
      <AlignContent>
        <ModalContainer onClick={(e) => e.stopPropagation()}>

          <Header>
            <h1>Submit your question</h1>
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
              <br/>

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
              <small>For privacy reasons, do not use your full name or email address</small><br/>

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
              <small>For authentication reasons, you will not be emailed</small>

            </form>
            {invalidEntry()}
            <StyledPhotos>
              {photos.map((photo, index) => (
                <PhotoEntry photo={photo} key={index}/>
              ))}
            </StyledPhotos>

          </ModalForm>
          <Submit>
            <button onClick={handleSubmit}>submit</button>
          </Submit>
          <Fotos>
            {photos.length < 5 ? <button onClick={togglePhoto}>Photos</button> : <div></div>}
            {isPhotoModalShown ? <PhotoModal/> : <div></div>}
          </Fotos>
        </ModalContainer>

      </AlignContent>
    </PhotoContext.Provider>
  )
}

export default AnswerModal;


