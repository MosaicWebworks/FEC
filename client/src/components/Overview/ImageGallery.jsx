import React from 'react';
import styled from 'styled-components';
import { sampleProduct, sampleStyles } from './sampleData.js';

// const gallery = styled.div`
//   display: flex;
//   max-height: 100px;
//   object-fit: contain;
//   justify-content: center;
// `
// const Gallery = styled.div`
//   display: flex;
//   height: 100%;
//   width: 100%;
//   border: 1px dotted black;
//   justify-content: center;
// `

const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`

const ImageGallery = () => {
  return(
    <StyledImg src={sampleStyles.results[0].photos[1].url} />
)
}

export { ImageGallery };