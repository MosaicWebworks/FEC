import React, {useState, useEffect, useContext} from 'react';
import {PhotoContainer, ModalForm, PhotoHeader, Submit, AlignContent} from './ModalStyles.jsx';
import {PhotoContext} from './AnswerModal.jsx';
import styled from 'styled-components';




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
            <button onClick={handleSubmit}>Add Photo</button>
            <button onClick={() => setIsPhotoModalShown(false)}>Cancel</button>
          </Submit>
      </PhotoContainer>
    </AlignContent>

  )


}


export default PhotoModal;