import React from 'react';
import styled from 'styled-components';
import { sampleProduct, sampleStyles } from './sampleData.js';

// const gallery = styled.div`
//   display: flex;
//   max-height: 100px;
//   object-fit: contain;
//   justify-content: center;
// `
const Gallery = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  border: 1px dotted black;
  object-fit: contain;
`

const StyledImg = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const ImageGallery = () => {
  return(
    <Gallery><StyledImg src={sampleStyles.results[0].photos[0].url}/></Gallery>


)
}

export { ImageGallery };