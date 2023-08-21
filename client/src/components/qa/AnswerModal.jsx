import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {ModalContainer, ModalForm, CloseModal, Product, Question, Warning, Submit, Photos} from './ModalStyles.jsx';
import {QuestionContext} from './QuestionEntry.jsx';


const AnswerModal = ({product_id}) => {
  const [productName, setProductName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

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

  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <Product>
        {productName}
      </Product>
      <Question>
        <b>Q:</b>{question_body}
      </Question>
      <ModalForm>
        <form>
          <label>Answer:<textarea  name="body" placeholder="type answer here..." required onChange={(e) => setBody(e.target.value)}/></label><br/>
          <label>Username:<input name="name" type="text" placeholder="username" required onChange={(e) => setName(e.target.value)}/></label><br/>
          <label>email:<input name="email" type="text" placeholder="email@domain.com" required onChange={(e) => setEmail(e.target.value)}/></label>
        </form>
        {invalidEntry()}
      </ModalForm>
      <Submit>
        <button onClick={handleSubmit}>submit</button>
      </Submit>
      <Photos>
        <button>photos</button>
      </Photos>
    </ModalContainer>
  )
}

export default AnswerModal;

