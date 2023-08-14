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
const ArrowStyle = styled.div`
  border-left: 0.5rem solid steelBlue;
  border-bottom: 0.5rem solid steelBlue;
  width: 2rem;
  height: 2rem;
  margin: 10px;
`
const ArrowContainer = styled.div`
  display: flex;
  height: 30px;
  width: 100%;
  justify-content: space-between;
`

const LeftArrow = ({setSelectedThumbnail, selectedThumbnail}) => {
  if (selectedThumbnail === 0) {return <div></div>};
  return <ArrowStyle onClick={(e) => {setSelectedThumbnail(selectedThumbnail - 1)}} style={{transform: "rotate(45deg)"}}/>
}

const RightArrow = ({setSelectedThumbnail, selectedThumbnail}) => {
  if (selectedThumbnail === photos.length - 1) {return <div></div>};
  return <ArrowStyle onClick={(e) => {setSelectedThumbnail(selectedThumbnail + 1)}} style={{transform: "rotate(225deg)"}}/>
}

const RenderThumbnails = ({setSelectedThumbnail, selectedThumbnail}) => {
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
      return (<Thumbnail onClick={(e) => {setSelectedThumbnail(thumbnailIndex)}} src={photo.thumbnail_url} style={{border: thumbnailBorder}} />)
    }
      )}
  </StyledThumbnails>);
}

const GalleryOverlay = ( {setSelectedThumbnail, selectedThumbnail} ) => {

  return(
    <StyledOverlay>
      <RenderThumbnails setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail} />
      <ArrowContainer>
        <LeftArrow setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail} />
        <RightArrow setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail}/>
      </ArrowContainer>
    </StyledOverlay>);
}

export { GalleryOverlay };