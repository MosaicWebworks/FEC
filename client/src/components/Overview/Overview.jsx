import React from 'react';
import styled from 'styled-components';
import { sampleProduct, sampleStyles } from './sampleData.js';
import { ImageGallery } from './ImageGallery.jsx';

const Text = styled.div`color: red;`
const Container = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 3fr) minmax(0, 1fr);
  grid-template-areas: "gallery two"
                       "three three";
  column-gap: 15px;
  row-gap: 15px;
`
const Gallery = styled.div`
  grid-area: gallery;
  display: flex;
  border: 1px solid red;
  max-height: 100%;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`
const Two = styled.div`
  grid-area: two;
  border: 1px solid blue;
`
const Three = styled.div`
  grid-area: three;
  border: 1px solid green;
`

const Overview = () => {

  return(
    <Container>
      <Gallery><ImageGallery/></Gallery>
      <Two>Product Info</Two>
      <Three>Product Information details</Three>
    </Container>

  )
}

export { Overview };