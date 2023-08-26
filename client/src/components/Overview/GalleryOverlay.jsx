import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';
import {theme} from '../Styles/LayoutStyles.jsx';
import {StyledOverlay, StyledThumbnails, Thumbnail, ArrowStyle, ArrowContainer} from '../Styles/OverviewStyles.jsx';

const photos = sampleStyles.results[0].photos;

const LeftArrow = ({setSelectedThumbnail, selectedThumbnail}) => {
  if (selectedThumbnail === 0) {return <div></div>};
  return(
  <ArrowStyle
    data-testid="leftArrow"
    onClick={(e) => {setSelectedThumbnail(selectedThumbnail - 1)}}
    style={{transform: "rotate(45deg)", cursor: "pointer"}}
  />)}

const RightArrow = ({setSelectedThumbnail, selectedThumbnail, styles}) => {
  if (selectedThumbnail === styles.results[0].photos.length - 1) {return <div></div>};
  return(
  <ArrowStyle
    data-testid="rightArrow"
    onClick={(e) => {setSelectedThumbnail(selectedThumbnail + 1)}}
    style={{transform: "rotate(225deg)", cursor: "pointer"}}
  />)}

const RenderThumbnails = ({setSelectedThumbnail, selectedThumbnail, styles, selectedStyle}) => {
  var index = 0;
  return(
  <StyledThumbnails>
    {
      styles.results[selectedStyle].photos.map((photo) => {
        var thumbnailIndex = index;
        var thumbnailBorder = thumbnailIndex === selectedThumbnail ? `2px solid ${theme.colors.textContrast}` : "1px solid white";
        index++
        return(
        <Thumbnail
          key={photo.thumbnail_url + index.toString()}
          alt="click to display different product image"
          onClick={(e) => {setSelectedThumbnail(thumbnailIndex)}}
          src={photo.thumbnail_url}
          style={{border: thumbnailBorder}}
        />)
      })
    }
  </StyledThumbnails>);
}

const GalleryOverlay = ( {setSelectedThumbnail, selectedThumbnail, styles, selectedStyle} ) => {
  return(
    <StyledOverlay>
      <RenderThumbnails
        styles={styles}
        setSelectedThumbnail={setSelectedThumbnail}
        selectedThumbnail={selectedThumbnail}
        selectedStyle={selectedStyle}
      />
      <ArrowContainer>
        <LeftArrow
          setSelectedThumbnail={setSelectedThumbnail}
          selectedThumbnail={selectedThumbnail}
        />
        <RightArrow
          styles={styles}
          setSelectedThumbnail={setSelectedThumbnail}
          selectedThumbnail={selectedThumbnail}
        />
      </ArrowContainer>
    </StyledOverlay>);
}

export default GalleryOverlay;