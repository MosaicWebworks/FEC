import styled from 'styled-components';
import {theme} from './LayoutStyles.jsx'

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.textContrast};
  }
`;

//Add To Cart:

const DropDownContainer = styled.div`
  position: relative;
  width: 100%
`
const DropDownButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: .75em;
  padding-bottom: .75em;
  position: absolute;
  width: 100%;
  background-color: ${theme.colors.secondary};
  color: ${theme.colors.text
  };
`

const DropDownContent = styled.ul`
  position: absolute;
  top: 32px;
  width: inherit;
  background-color: ${theme.colors.secondary};
  list-style: none;
  padding: 0;
  cursor: pointer;
`

const DropDownItem = styled.li`
  padding: 5px;
  color: ${theme.colors.textContrast};
`

const AddToCartLayout = styled.div`
  display: grid;
  height: 5em;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "size   number"
                       "add    favorite";
  column-gap: 15px;
  row-gap: 15px;
`

//Big Image

const StyledBigImage = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  background-repeat: no-repeat;
  z-index: 2;
  cursor: crosshair;
`

//Gallery Overlay

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
  cursor: pointer;
  margin: 10px;
  object-fit: cover;
  border-radius: 5px;
  flex-shrink: 0;
`
const ArrowStyle = styled.div`
  border-left: 0.5rem solid ${theme.colors.primary};
  border-bottom: 0.5rem solid ${theme.colors.primary};
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

//Image Gallery

const StyledImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  position: absolute;
  overflow: hidden;
  cursor: zoom-in;
`

//Overview

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

//Product Info

const ShareLink = styled.img`
cursor: pointer;
`

const StyleThumbnail = styled.img`
height: 60px;
width: 60px;
object-fit: cover;
border-radius: 60px;
cursor: pointer;
margin: 10px
position: relative;
`

const StyleThumbnails = styled.div`
  margin: 10px;
`

export {
  DropDownContainer,
  DropDownButton,
  DropDownContent,
  DropDownItem,
  AddToCartLayout,
  Button,
  StyledBigImage,
  StyledOverlay,
  StyledThumbnails,
  Thumbnail,
  ArrowStyle,
  ArrowContainer,
  StyledImg,
  Container,
  Gallery,
  Info,
  Details,
  ShareLink,
  StyleThumbnail,
  StyleThumbnails
 };

