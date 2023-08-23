import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Image} from '../Styles/ModalStyles.jsx';


const PhotoEntry = ({photo}) => {

  return (

    <Image>
      <img src={photo} alt="review photo" />
    </Image>

  )
}







export default PhotoEntry;

//object fit cover