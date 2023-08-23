import React from 'react';
import styled from 'styled-components';
import { sampleProduct, sampleStyles } from './sampleData.js';
import { ImageGallery } from './ImageGallery.jsx';
import { GalleryOverlay } from './GalleryOverlay.jsx';
import {ProductInfo} from './ProductInfo.jsx';
import {ProductDetails} from './ProductDetails.jsx';
import axios from 'axios';
import {ProductContext} from '../../contexts.js'


const Container = styled.div`
  width: 100%;
  height: 100vh;
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
`
const Details = styled.div`
  grid-area: three;
`

const Overview = () => {
  const product = React.useContext(ProductContext);
  const [styles, setStyles] = React.useState(sampleStyles);
  const [selectedStyle, setSelectedStyle] = React.useState(0);
  //const [product, setProduct] = React.useState(sampleProduct);
  const [selectedThumbnail, setSelectedThumbnail] = React.useState(0);
  React.useEffect(() => {
    console.log('Overview effect');
    axios.get(`http://localhost:3000/data/products/${product.id}/styles`)
    .then((res) => {
      setStyles(res.data);
    }).then(() => {
      axios.get(`http://localhost:3000/data/reviews?product_id=${product.id}`)
      .then((res) => {
        console.log('res is ', res.data.rating);
      })
    });
  }, [product]);
  return(
    <Container>
      <Gallery>
        <ImageGallery styles={styles} selectedThumbnail={selectedThumbnail} selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
        <GalleryOverlay styles={styles} setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail} selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
      </Gallery>
      <Info>
        <ProductInfo product={product} styles={styles} setSelectedStyle={setSelectedStyle} selectedStyle={selectedStyle}/>
      </Info>
      <Details>
        <ProductDetails product={product} />
      </Details>
    </Container>

  )
}

export { Overview };