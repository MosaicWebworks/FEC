import React from 'react';
import styled from 'styled-components';
import { sampleProduct, sampleStyles } from './sampleData.js';
import {BigImage} from './BigImage.jsx';
import {ProductContext} from '../../contexts.js';
import {theme} from '../Styles/LayoutStyles.jsx';
import {StyledImg} from '../Styles/OverviewStyles.jsx';

const ImageGallery = ({ selectedThumbnail, styles, selectedStyle, setSelectedStyle }) => {
  const product = React.useContext(ProductContext);
  const [enlargeImage, setEnlargeImage] = React.useState(false);
  const [coords, setCoords] = React.useState({x: 0, y: 0});
  React.useEffect(() => {
    //image moves based on mouse movement
    const handleWindowMouseMove = (e) => {
      setCoords({
        //set x, y coords as a percent of where the mouse is in the div
        x: (event.clientX - e.target.getBoundingClientRect().x) / e.target.getBoundingClientRect().width,
        y: (event.clientY - e.target.getBoundingClientRect().y) / e.target.getBoundingClientRect().height,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => {
      window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
      );
    };
  }, []);
  if (enlargeImage) {
    return(
      <BigImage
        styles={styles}
        selectedThumbnail={selectedThumbnail}
        setEnlargeImage={setEnlargeImage}
        coords={coords}
        setCoords={setCoords}
        selectedStyle={selectedStyle}
      />
    )
  }
  return(
    <StyledImg
      alt={`image showcasing ${product.name} in ${styles.results[selectedStyle].name}`}
      data-testid="main-image"
      onClick={(e) => {setEnlargeImage(true)}}
      src={styles.results[selectedStyle].photos[selectedThumbnail].url}
    />
  )
}

export { ImageGallery };