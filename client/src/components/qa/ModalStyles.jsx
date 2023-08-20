import styled from 'styled-components';

const ModalContainer = styled.div`
display: grid;
grid-template-areas: 'productName productName'
                      'question question'
                     'form form'
                     'photos submit';
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 50%;
height: 50%;
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

const Warning = styled.div`
color: red;
`
const Submit = styled.div`
grid-area: submit;
max-height: 125px;
max-width: 200px;
`

const Photos = styled.div`
grid-area: photos;
max-height: 125px;
max-width: 200px;
`

export {
  Photos,
  Submit,
  Warning,
  Question,
  Product,
  CloseModal,
  ModalForm,
  ModalContainer
}