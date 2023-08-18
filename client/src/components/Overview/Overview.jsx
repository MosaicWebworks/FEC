import React from 'react';
import styled from 'styled-components';
import { sampleProduct, sampleStyles } from './sampleData.js';
import { ImageGallery } from './ImageGallery.jsx';
import { GalleryOverlay } from './GalleryOverlay.jsx';
import {ProductInfo} from './ProductInfo.jsx';
import axios from 'axios';



const Container = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  grid-template-rows: minmax(0, 3fr) minmax(0, 1fr);
  grid-template-areas: "gallery info"
                       "three  three";
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
const Info = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  border: 1px solid blue;
`
const Three = styled.div`
  grid-area: three;
  border: 1px solid green;
`

const Overview = () => {
  const [styles, setStyles] = React.useState(sampleStyles);
  const [product, setProduct] = React.useState(sampleProduct);
  const [selectedThumbnail, setSelectedThumbnail] = React.useState(0);
  return(
    <Container>
      <Gallery><ImageGallery styles={styles} selectedThumbnail={selectedThumbnail} /><GalleryOverlay styles={styles} setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail} /></Gallery>
      <Info><ProductInfo product={product} styles={styles}/></Info>
      <Three>Product Information details</Three>
      <button onClick={(e) => {
        axios.get(`http://localhost:3000/data/products/403${Math.floor(Math.random() * 10) + 44}/styles`)
        .then((res) => {
          setStyles(res.data);
          axios.get(`http://localhost:3000/data/products/${res.data.product_id}`)
          .then((res) => {
            setProduct(res.data);
          })
        });
        }}>Random Style</button>
    </Container>

  )
}

export { Overview };