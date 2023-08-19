import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalContainer = styled.div`
display: grid;
grid-template-areas: 'productName question'
                     'form form'
                     'photos submit';
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 400px;
height: 800px;
background: white;

`
const ModalForm = styled.div`
grid-area: form;
color: black;
`

const CloseModal = styled.div`
grid-area: question;
width: 120px;
height: 100px;
`

const Product = styled.div`
grid-area: productName;
`
const Question = styled.div`
grid-area: question;`


const AnswerModal = ({question_id,product_id, question, setIsModalShown}) => {
  const [productName, setProductName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  axios.get(`data/products/${product_id}`)
    .then((results) => {
      console.log('products name:', results.data.name)
      setProductName(results.data.name);
    })
    .catch((err) => console.log(err));


  const toggleModal = () => {
    setIsModalShown(false);
  }

  const handleSubmit = () => {
    axios.post(`data/qa/questions/${question_id}/answers`, {
      name: name,
      email: email,
      body: body,
      product_id: product_id
    })
    .then((results) => {
      setIsModalShown(false);
      console.log('results posted')
    })
    .catch(() => console.log('err present'))
  }

  return (
    <ModalContainer>
      <Product>
        {productName}
      </Product>
      <Question>
        <b>Q:</b>{question}
      </Question>
      <ModalForm>
        <form>
          <label>Answer:<textarea name="body" placeholder="type answer here..." required onChange={(e) => setBody(e.target.value)}/></label><br/>
          <label>Username:<input name="name" type="text" placeholder="username" required onChange={(e) => setName(e.target.value)}/></label><br/>
          <label>email:<input name="email" type="text" placeholder="email@domain.com" required onChange={(e) => setEmail(e.target.value)}/></label>
        </form>
      </ModalForm>
      <button onClick={handleSubmit}>submit</button>
      <button>photos</button>
    </ModalContainer>
  )
}

export default AnswerModal;


