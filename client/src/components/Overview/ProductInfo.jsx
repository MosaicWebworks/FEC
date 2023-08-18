import React from 'react';
import styled from 'styled-components';
import {sampleProduct, sampleStyles} from './sampleData.js';

const StyleThumbnail = styled.img`
height: 45px;
width: 45px;
object-fit: cover;
border-radius: 45px;
`

const StyleThumbnails = styled.div`

`

const RenderStyleThumbnails = ({styles}) => {

  return(
    styles.results.map((style) => {
      console.log(style);
      return(<StyleThumbnail src={style.photos[0].thumbnail_url}/>)
    })
  );
}

const ProductInfo = ({product, styles}) => {
  return(
    <div>
    <div>{product.category}</div>
    <h1>{product.name}</h1>
    <div>${product.default_price}</div>
    <h3>{styles.results[0].name}</h3>
    <RenderStyleThumbnails styles={styles}/>
    </div>
  )
}

export { ProductInfo };