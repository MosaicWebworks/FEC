import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';
import AddToCart from './AddToCart.jsx'
import {ProductContext} from '../../contexts.js'
import RatingSummarywithStar from '../SharedComponent/RatingSummarywithStar.jsx';
import { ReviewsProvider } from '../rr/ReviewsContext.jsx';
import {theme} from '../Styles/LayoutStyles.jsx';
import {ShareLink, StyleThumbnail, StyleThumbnails} from '../Styles/OverviewStyles.jsx'
import facebook from '../../public/facebook.png';
import twitter from '../../public/twitter.png';
import pinterest from '../../public/pinterest.png';
import checkmark from '../../public/checkmark.png';

const RenderStyleThumbnails = ({styles, setSelectedStyle, selectedStyle}) => {
  var index = 0;
  var styleBorder = '';
  return(
    <StyleThumbnails>
      {styles.results.map((style) => {
        styleBorder = selectedStyle === index ? `2px solid ${theme.colors.textContrast}` : "";
        var styleIndex = index;
        index++
        return(
        <span
          key={'styleThumbnail' + index}
          style={{margin: '10px'}}>
            <StyleThumbnail
              alt={`Click to change selected style to ${style.name}`}
              onClick={(e) => setSelectedStyle(styleIndex)}
              style={{border: styleBorder}}
              src={style.photos[0].thumbnail_url}
            />
          {selectedStyle === index - 1 ? <img style={{position: 'absolute', marginLeft: '-20px'}} src={checkmark}/> : null}
        </span>)
      })}
    </StyleThumbnails>
  );
}

const ProductInfo = ({ref, product, styles, setSelectedStyle, selectedStyle}) => {
  const [showDropDown, setShowDropDown] = React.useState("hidden");
  const handleClickScroll = () => {
    const element = document.getElementById('reviews');
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  };
  return(
    <div style={{margin: "10px"}}>
      <ReviewsProvider>
        <RatingSummarywithStar />
      </ReviewsProvider>
      <div
        style={{cursor: 'pointer', marginBottom: '10px'}}
        onClick={handleClickScroll}>
        Show all Reviews
      </div>
      <div>{product.category}</div>
      <h1>{product.name}</h1>
      {styles.results[selectedStyle].sale_price ?
        <div>
          <span
            style={{color: "red", textDecoration: "line-through"}}>
            ${product.default_price}
          </span>
          <span>${styles.results[selectedStyle].sale_price}</span>
        </div>
        :
        <span>${product.default_price}</span>
      }
      <h3>{styles.results[selectedStyle].name}</h3>
      <span>Share: <ShareLink src={facebook}/> <ShareLink src={twitter}/> <ShareLink src={pinterest}/></span>
      <RenderStyleThumbnails setSelectedStyle={setSelectedStyle} selectedStyle={selectedStyle} styles={styles}/>
      <AddToCart styles={styles} selectedStyle={selectedStyle}/>
    </div>
  )
}

export default ProductInfo;