import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js'



const StyledBigImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  background-repeat: no-repeat;
  z-index: 2;
  cursor: crosshair;
`

const BigImage = ({selectedThumbnail, setEnlargeImage, coords, setCoords, styles, selectedStyle}) => {
  const [relativeCoords, setRelativeCoords] = React.useState({x: 0, y: 0});
  const [reallyBig, setReallyBig] = React.useState(false);
  return(<StyledBigImage
    onClick={(e) => {setEnlargeImage(false)}}
    data-testid="bigImage"
    title="enlarged image showcasing product"
    style={
    {backgroundImage: `url(${styles.results[selectedStyle].photos[selectedThumbnail].url})`,
    backgroundPosition: `${coords.x * 100}% ${coords.y * 100}%`,
  }} onMouseLeave={(e) => {setEnlargeImage(false)}}/>);
}

export {BigImage};