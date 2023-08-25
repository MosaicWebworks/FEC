import styled from 'styled-components';


const AlignContent = styled.div`
display: block;
text-align: center;`

const Required = styled.p`
color: red;`

const ModalContainer = styled.div`
display: grid;
grid-template-areas: 'header header'
                     'form form'
                     'photo photo'
                     'photos submit';
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
width: 70%;
height: 80%;
background: beige;
z-index: 7;
margin-left: auto;
margin-right: auto;
`
const ModalForm = styled.div`
grid-area: form;
color: black;
margin-bottom: 0;
`

const CloseModal = styled.div`
grid-area: header;
width: 120px;
height: 100px;
`


const Header = styled.div`
grid-area: header;
margin-top: 0;
margin-bottom: 0;`

const Warning = styled.ul`
color: red;
list-style-type: none;
`
const Submit = styled.div`
grid-area: submit;
max-height: 125px;
max-width: 200px;
`

const PhotoSection = styled.div`
grid-area: photos;
display: flex;
max-height: 125px;
max-width: 100px;
`
const StyledPhotos = styled.div`
display: flex;
justify-content: center;
gap: 20px;
`



const AnswerPhotos = styled(StyledPhotos)`
justify-content: start;
gap: 25px;
margin-bottom: 25px;
`


/**--------------------------------------
 *
 * PhotoModal Styles
 *
 */


const PhotoContainer = styled(ModalContainer)`
width: 100%;
height: 100%;
`

const PhotoHeader = styled(Header)`
margin-top: 10%;

`
const Image = styled.div`
  grid-area: photo;
  display: flex;
  height: 100px;
  max-height: auto;

  width: 100px;
  max-width: 100%;
  object-fit: cover;
  margin-left: 15px;
  margin-right: 15px;
  position: relative;




  `


export {
  PhotoSection,
  Submit,
  Warning,
  Header,
  CloseModal,
  ModalForm,
  ModalContainer,
  AlignContent,
  Required,
  PhotoContainer,
  PhotoHeader,
  Image,
  StyledPhotos,
  AnswerPhotos
}