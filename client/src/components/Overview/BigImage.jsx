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
`

const BigImage = ({selectedThumbnail, setEnlargeImage, coords, setCoords}) => {

  const [relativeCoords, setRelativeCoords] = React.useState({x: 0, y: 0});
  React.useEffect(() => {
    const handleWindowMouseMove = (e) => {
      setCoords({
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
  return(<StyledBigImage
    onClick={(e) => {setEnlargeImage(false)}}
    style={
    {backgroundImage: `url(${sampleStyles.results[0].photos[selectedThumbnail].url})`,
    backgroundPosition: `${coords.x * 100}% ${coords.y * 100}%`
  }} onMouseLeave={(e) => {setEnlargeImage(false)}}/>);
}

export {BigImage};