import React from 'react';
import styled from 'styled-components';
import { sampleProduct, sampleStyles } from './sampleData.js';

const photos = sampleStyles.results[0].photos;

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
`
const StyledThumbnails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(227, 227, 227, 0.5);
  border-radius: 15px;
  margin: 10px;
`

const Thumbnail = styled.img`
  height: 48px;
  width: 48px;
  margin: 10px;
  object-fit: cover;
  border-radius: 5px;
`

const RenderThumbnails = ({ setSelectedThumbnail, selectedThumbnail }) => {
  var index = 0;
  return(
  <StyledThumbnails>
    {
    photos.map((photo) => {
      var thumbnailIndex = index;
      var thumbnailBorder = "1px solid white";
      if (thumbnailIndex === selectedThumbnail) {
        thumbnailBorder = "2px solid steelBlue";
      }
      index++
      return (<Thumbnail  onClick={(e) => {setSelectedThumbnail(thumbnailIndex)}} src={photo.thumbnail_url} style={{border: thumbnailBorder}} />)
    }
      )}
  </StyledThumbnails>);
}

const GalleryOverlay = ( {setSelectedThumbnail, selectedThumbnail} ) => {

  return(<StyledOverlay><RenderThumbnails setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail} /></StyledOverlay>);
}

export { GalleryOverlay };