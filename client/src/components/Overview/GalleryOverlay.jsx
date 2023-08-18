import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';

const photos = sampleStyles.results[0].photos;

const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`
const StyledThumbnails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: rgba(227, 227, 227, 0.5);
  border-radius: 15px;
  margin: 10px;
  z-index: 1;
  max-height: 70%;
  overflow: scroll;
  overflow-x: hidden;
`

const Thumbnail = styled.img`
  height: 48px;
  width: 48px;
  margin: 10px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
`
const ArrowStyle = styled.div`
  border-left: 0.5rem solid steelBlue;
  border-bottom: 0.5rem solid steelBlue;
  width: 2rem;
  height: 2rem;
  margin: 15px;
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
// const photos = sampleStyles.results[0].photos;
const RightArrow = ({setSelectedThumbnail, selectedThumbnail, styles}) => {
  if (selectedThumbnail === styles.results[0].photos.length - 1) {return <div></div>};
  return <ArrowStyle onClick={(e) => {setSelectedThumbnail(selectedThumbnail + 1)}} style={{transform: "rotate(225deg)"}}/>
}

const RenderThumbnails = ({setSelectedThumbnail, selectedThumbnail, styles, selectedStyle}) => {
  var index = 0;
  return(
  <StyledThumbnails>
    {
    styles.results[selectedStyle].photos.map((photo) => {
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

const GalleryOverlay = ( {setSelectedThumbnail, selectedThumbnail, styles, selectedStyle} ) => {

  return(
    <StyledOverlay>
      <RenderThumbnails styles={styles} setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail} selectedStyle={selectedStyle}/>
      <ArrowContainer>
        <LeftArrow setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail} />
        <RightArrow styles={styles} setSelectedThumbnail={setSelectedThumbnail} selectedThumbnail={selectedThumbnail}/>
      </ArrowContainer>
    </StyledOverlay>);
}

export {GalleryOverlay};