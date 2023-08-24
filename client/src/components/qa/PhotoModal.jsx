import React, {useState, useEffect, useContext} from 'react';
import {PhotoContainer, ModalForm, PhotoHeader, Submit, AlignContent} from '../Styles/ModalStyles.jsx';
import {PhotoContext} from '../../contexts.js';
import styled from 'styled-components';
import {Button} from '../Styles/ButtonStyles.jsx'



const PhotoModal = () => {
  const [photoLink, setPhotoLink] = useState('');
  const [photos, setPhotos, setIsPhotoModalShown] = useContext(PhotoContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoLink !== '') {
      setPhotos([...photos, photoLink]);
    }
    setIsPhotoModalShown(false);
  }


  return  (
    <AlignContent>
      <PhotoContainer>
        <PhotoHeader>
            <b>Add your photos</b>
        </PhotoHeader>
          <ModalForm>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="add photo link" onChange={(e) => setPhotoLink(e.target.value)}/>
            </form>
          </ModalForm>
          <Submit>
            <Button onClick={handleSubmit}>Add Photo</Button>
            <Button onClick={() => setIsPhotoModalShown(false)}>Cancel</Button>
          </Submit>
      </PhotoContainer>
    </AlignContent>

  )


}


export default PhotoModal;