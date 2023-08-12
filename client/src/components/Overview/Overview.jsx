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
  grid-template-areas: "one     two"
                       "three three";
  column-gap: 15px;
  row-gap: 15px;
`
const One = styled.div`
  grid-area: one;
  border: 1px solid red;
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
      <One><ImageGallery/></One>
      <Two>Product Info</Two>
      <Three>Product Information details</Three>
    </Container>

  )
}

export { Overview };