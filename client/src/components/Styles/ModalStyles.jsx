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
background: white;
z-index: 1
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

const Warning = styled.div`
color: red;
`
const Submit = styled.div`
grid-area: submit;
max-height: 125px;
max-width: 200px;
`

const Fotos = styled.div`
grid-area: photos;
max-height: 125px;
max-width: 200px;
`
const StyledPhotos = styled.div`
display: flex;
justify-content: center;
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
  width: 100px;
  margin-left: 10px;
  margin-right: 10px;
`
export {
  Fotos,
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