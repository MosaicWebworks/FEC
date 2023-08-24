import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {ModalContainer, ModalForm, CloseModal, Product, Header, Warning, Submit, Photos, Required, AlignContent} from '../Styles/ModalStyles.jsx';
import {QuestionContext} from './QuestionEntry.jsx';
import {ProductContext} from '../../contexts.js';


const QuestionModal = ({setAddedEntity, product_id, setIsModalShown}) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const [isInvalid, setIsInvalid] = useState(false)

  //obtains product name
  const productName = useContext(ProductContext);

  const toggleModal = () => {
    setIsModalShown(false);
  }

  const handleSubmit = () => {
    axios.post(`data/qa/questions`, {
      name: name,
      email: email,
      body: body,
      product_id: product_id
    })
    .then((results) => {
      setIsModalShown(false);
      setAddedEntity(true);
      console.log('results posted')
    })
    .catch((err) => {
      setIsInvalid(true);
      console.log('Invalid Submission');
      console.log(err);
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
          </ol>
        </small>
      </Warning>
     )
    } else {
      return <div></div>
    }
  }

  return (
    <AlignContent>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <h1>Ask your question</h1>
            <small>
              About the {productName.name}
              </small>
        </Header>

        <ModalForm>
          <form>
            <label>*Question:
              <textarea
                name="body"
                placeholder="type question here..."
                required
                onChange={(e) => setBody(e.target.value)}
                rows="5" cols="50"
              />
            </label>
            <br/>

            <label>*Username:
              <input name="name"
                type="text"
                placeholder="Example: jackson11!"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br/>
            <small>For privacy reasons, do not use your full name or email address</small><br/>

            <label>*Email:
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
        </ModalForm>
        <Submit>
          <button onClick={handleSubmit}>submit</button>
        </Submit>
      </ModalContainer>
    </AlignContent>
  )
}

export default QuestionModal;


