import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Image} from './ModalStyles.jsx';


const Photos = ({photo}) => {

  return (

    <Image>
      <img src={photo} alt="review photo" />
    </Image>

  )
}







export default Photos;

//object fit cover