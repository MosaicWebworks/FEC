import React from 'react';
import styled from 'styled-components';
import { sampleProduct, sampleStyles } from './sampleData.js';
import { ImageGallery } from './ImageGallery.jsx';
import { GalleryOverlay } from './GalleryOverlay.jsx';

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
  max-height: 100%;
  max-width: 100%;
  position: relative;
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
  const [styles, setStyles] = React.useState(sampleStyles);
  const [selectedThumbnail, setSelectedThumbnail] = React.useState(0);
  return(
    <Container>
      <Gallery><ImageGallery selectedThumbnail={selectedThumbnail} /><GalleryOverlay setSelectedThumbnail={setSelectedThumbnail} /></Gallery>
      <Two>Product Info</Two>
      <Three>Product Information details</Three>
    </Container>

  )
}

export { Overview };