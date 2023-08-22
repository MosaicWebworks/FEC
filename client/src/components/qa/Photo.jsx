import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Image} from './ModalStyles.jsx';


const Photo = ({photo}) => {

  return (

    <Image>
      <img src={photo} alt="review photo" />
    </Image>

  )
}







export default Photo;

//object fit cover