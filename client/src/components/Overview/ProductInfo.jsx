import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';
import {AddToCart} from './AddToCart.jsx'
import {ProductContext} from '../../contexts.js'
import StarRating from '../SharedComponent/StarRating.jsx';

const StyleThumbnail = styled.img`
height: 45px;
width: 45px;
object-fit: cover;
border-radius: 45px;
margin: 10px
`

const StyleThumbnails = styled.div`
  margin: 10px;
`

const RenderStyleThumbnails = ({styles, setSelectedStyle, selectedStyle}) => {
  var index = 0;
  var styleBorder = '';
  return(
    <StyleThumbnails>
      {styles.results.map((style) => {
        if (selectedStyle === index) {
          styleBorder = "2px solid steelBlue";
        } else {
          styleBorder = "";
        }
        var styleIndex = index;
        index++
        return(<StyleThumbnail key={'styleThumbnail' + index} onClick={(e) => setSelectedStyle(styleIndex)} style={{border: styleBorder}} src={style.photos[0].thumbnail_url}/>)
      })}
    </StyleThumbnails>
  );
}

const ProductInfo = ({product, styles, setSelectedStyle, selectedStyle}) => {
  const [showDropDown, setShowDropDown] = React.useState("hidden");
  return(
    <div style={{margin: "10px"}}>
    <div>{product.category}</div>
    <h1>{product.name}</h1>
    {styles.results[selectedStyle].sale_price ? <div>
      <span style={{color: "red", textDecoration: "line-through"}}>${product.default_price}</span> <span>${styles.results[selectedStyle].sale_price}</span>
      </div> : <span>${product.default_price}</span>}
    <h3>{styles.results[selectedStyle].name}</h3>
    <RenderStyleThumbnails setSelectedStyle={setSelectedStyle} selectedStyle={selectedStyle} styles={styles}/>
    <AddToCart styles={styles} selectedStyle={selectedStyle}/>
    </div>
  )
}

export { ProductInfo };