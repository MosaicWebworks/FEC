import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';
import ImageGallery from './ImageGallery.jsx';
import GalleryOverlay from './GalleryOverlay.jsx';
import ProductInfo from './ProductInfo.jsx';
import ProductDetails from './ProductDetails.jsx';
import axios from 'axios';
import {ProductContext} from '../../contexts.js';
import {theme} from '../Styles/LayoutStyles.jsx';
import {Container, Gallery, Info, Details} from '../Styles/OverviewStyles.jsx';

const Overview = () => {
  const product = React.useContext(ProductContext);
  const [styles, setStyles] = React.useState(sampleStyles);
  const [selectedStyle, setSelectedStyle] = React.useState(0);
  const [selectedThumbnail, setSelectedThumbnail] = React.useState(0);
  React.useEffect(() => {
    axios.get(`/data/products/${product.id}/styles`)
    .then((res) => {
      setStyles(res.data);
    })
    .then(() => {
      axios.get(`/data/reviews?product_id=${product.id}`)
      .catch((err) => console.log(err));
    });
  }, [product]);
  return(
    <Container>
      <Gallery>
        <ImageGallery
          styles={styles}
          selectedThumbnail={selectedThumbnail}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
        <GalleryOverlay
          styles={styles}
          setSelectedThumbnail={setSelectedThumbnail}
          selectedThumbnail={selectedThumbnail}
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />
      </Gallery>
      <Info>
        <ProductInfo
          product={product}
          styles={styles}
          setSelectedStyle={setSelectedStyle}
          selectedStyle={selectedStyle}
        />
      </Info>
      <Details>
        <ProductDetails
          product={product}
        />
      </Details>
    </Container>
  )
}

export default Overview;